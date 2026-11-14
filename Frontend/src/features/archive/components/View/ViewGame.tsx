import { useCallback, useEffect, useState } from "react";
import { isAxiosError } from "axios";
import LoadingIndicator from "../../../../components/LoadingIndicator";
import { Config } from "../../../../Config";
import useGameInfo from "../../hooks/UseGameInfo";
import { archiveService } from "../../services/ArchiveService";
import type { GameViewProps } from "../../types/ComponentsProps";
import Button from "../../../../components/Buttons/Button";
import ArcadeMachine from "./ArcadeMachine";
import ArcadeTitle from "./ArcadeMachine/ArcadeTitle";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../authorization/hooks/UseAuth";
import GameRatingPortal from "./GameRatingPortal";

export default function ViewGame({ gameId }: GameViewProps) {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [selectedRating, setSelectedRating] = useState<number | null>(null);
  const [isRatingOpen, setIsRatingOpen] = useState(false);
  const [isSubmittingRating, setIsSubmittingRating] = useState(false);
  const [ratingError, setRatingError] = useState<string | null>(null);
  const closeRatingPortal = useCallback(() => setIsRatingOpen(false), []);
  const openRatingPortal = useCallback(() => {
    if (!user) return;
    setRatingError(null);
    setIsRatingOpen(true);
  }, [user]);

  const {
    data,
    error,
    isLoading,
    publisherProfile,
    authorProfile,
    profileError,
  } = useGameInfo(gameId ?? "");

  useEffect(() => {
    if (!data) return;

    const userRating = data.userRating;
    setSelectedRating(
      typeof userRating === "number" &&
        Number.isInteger(userRating) &&
        userRating >= 1 &&
        userRating <= 5
        ? userRating
        : null,
    );
  }, [data]);

  if (error) {
    return (
      <p role="alert" className="archive-game-status p-10 text-center">
        {error}
      </p>
    );
  }
  if (isLoading) {
    return (
      <p role="status" className="archive-game-status p-10 text-center">
        <LoadingIndicator size={144} showLabel />
      </p>
    );
  }
  if (!data) {
    return (
      <p className="archive-game-status p-10 text-center">Game unavailable.</p>
    );
  }

  const submitRating = async () => {
    if (!user) {
      setRatingError("Sign in to submit a rating.");
      return;
    }

    if (!gameId) {
      setRatingError("Could not identify this game.");
      return;
    }

    if (
      selectedRating === null ||
      !Number.isInteger(selectedRating) ||
      selectedRating < 1 ||
      selectedRating > 5
    ) {
      setRatingError("Choose a rating from 1 to 5 stars.");
      return;
    }

    setIsSubmittingRating(true);
    setRatingError(null);

    try {
      await archiveService.RateGame(gameId, selectedRating);
      setIsRatingOpen(false);
    } catch (error) {
      const status = isAxiosError(error) ? error.response?.status : undefined;
      const responseMessage = isAxiosError(error)
        ? error.response?.data
        : undefined;
      setRatingError(
        status === 401 || status === 403
          ? "Sign in to submit a rating."
          : typeof responseMessage === "string"
            ? responseMessage
            : error instanceof Error
              ? error.message
              : "Could not submit your rating.",
      );
    } finally {
      setIsSubmittingRating(false);
    }
  };

  return (
    <>
      <header className="archive-game-banner relative isolate flex h-[220px] bg-[#171717] border-b-2 border-b-[#888]">
        <div
          className="
            archive-game-thumbnail relative w-1/2 h-full shrink-0 min-w-0 grid place-items-center
            overflow-hidden
          "
        >
          {data.thumbnailUrl ? (
            <img src={Config.API_URL + data.thumbnailUrl} alt={data.title} />
          ) : (
            <span>Game thumbnail</span>
          )}
        </div>
        <div
          className="
            archive-game-publisher w-1/2 min-w-0 flex items-center justify-end
            gap-[clamp(12px,1.5vw,28px)] py-[10px] pr-[clamp(14px,1.5vw,28px)]
            pl-[clamp(80px,22vw,410px)] text-white
          "
        >
          <div className="archive-game-publisher-info min-w-0 text-right">
            <button
              type="button"
              onClick={() => {
                navigate(
                  `/profile/${publisherProfile?.profileUserId ?? data.publisherId}`,
                );
              }}
              className="font-bold cursor-pointer hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              {publisherProfile?.profileTitle ?? "Publisher profile unavailable"}
            </button>
            <p>Original author: {authorProfile?.profileTitle ?? data.authorName}</p>
            <p>Uploaded {new Date(data.uploaded).toLocaleDateString()}</p>
            {profileError && (
              <p role="status" className="text-sm text-amber-200">
                {profileError}
              </p>
            )}
          </div>
          <div
            className="
            archive-game-publisher-avatar shrink-0 w-[clamp(82px,8.5vw,164px)] aspect-square grid
            place-items-center
          "
          >
            {publisherProfile?.avatarUrl ? (
              <img
                src={`${Config.API_URL}${publisherProfile.avatarUrl}`}
                alt={`${publisherProfile.profileTitle} avatar`}
                className="h-full w-full object-cover"
              />
            ) : (
              <span>
                {publisherProfile?.profileTitle?.slice(0, 1).toUpperCase() || "?"}
              </span>
            )}
          </div>
        </div>
        <img
          src="/images/login/header_divider.png"
          alt=""
          draggable={false}
          className="
            archive-game-header-divider absolute top-0 left-1/2 -translate-x-1/2 h-full
            w-[min(44%,820px)] object-fill max-w-none z-30 pointer-events-none select-none
          "
        />
        <ArcadeTitle title={data.title ?? "Arcade Machine"} />
      </header>
      <div
        className="
            archive-game-title-row grid grid-cols-[120px_minmax(0,1fr)_210px] gap-4 items-center
            min-h-[90px] py-3 px-4
          "
      >
        <div className="archive-game-back-position">
          <Button
            navigateOnClick={"/archive"}
            style={"icon"}
            width={"80px"}
            height={"80px"}
            font="Arial"
            aria-label="Back to archive"
          >
            <img
              src="/images/icons/menu_arrow.png"
              alt="Back to archive"
              className="h-6 w-6 object-contain rotate-180"
              draggable={false}
            />
          </Button>
        </div>
      </div>
      <div className="archive-game-stage flex w-full min-h-[90px]">
        <div className="w-1/5" />
        <div className="w-3/5 min-w-0">
          <ArcadeMachine
            wallpaper="/images/backgrounds/wallpaper_arcade4.png"
            title={data.title ?? "Arcade Machine"}
            gameId={gameId ?? ""}
            uploadedAt={data.uploaded}
            rating={data.starsRated}
            downloaded={data.playsCount}
            paperRating={user ? selectedRating : null}
            isAuthenticated={!!user}
            onOpenRating={openRatingPortal}
            stickerTimeEnabled={false}
          />
        </div>
        <div className="w-1/5" />
      </div>
      <GameRatingPortal
        gameId={gameId ?? ""}
        isOpen={isRatingOpen && !!user}
        isAuthenticated={!!user}
        rating={selectedRating}
        isSubmitting={isSubmittingRating}
        error={ratingError}
        onRatingChange={(value) => {
          setSelectedRating(value);
          setRatingError(null);
        }}
        onSubmit={submitRating}
        onClose={closeRatingPortal}
      />
    </>
  );
}
