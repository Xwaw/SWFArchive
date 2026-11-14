import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import CommentSection from "../../../comments/components/CommentSection";
import LoadingIndicator from "../../../../components/LoadingIndicator";

type GameRatingPortalProps = {
  gameId: string;
  isOpen: boolean;
  isAuthenticated: boolean;
  rating: number | null;
  isSubmitting: boolean;
  error: string | null;
  onRatingChange: (rating: number) => void;
  onSubmit: () => Promise<void>;
  onClose: () => void;
};

const ratingPaper =
  "/images/sections/arcade/accessories/paper_for_rating/idle.png";

export default function GameRatingPortal({
  gameId,
  isOpen,
  isAuthenticated,
  rating,
  isSubmitting,
  error,
  onRatingChange,
  onSubmit,
  onClose,
}: GameRatingPortalProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const isSubmittingRef = useRef(isSubmitting);
  const [hoveredRating, setHoveredRating] = useState<number | null>(null);
  const highlightedRating = hoveredRating ?? rating;

  useEffect(() => {
    isSubmittingRef.current = isSubmitting;
  }, [isSubmitting]);

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && !isSubmittingRef.current) onClose();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);
    closeButtonRef.current?.focus();

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return createPortal(
    <div
      className="archive-game-page fixed inset-0 z-[100] grid place-items-center overflow-y-auto p-4"
      style={{ backgroundColor: "rgb(0 0 0 / 80%)" }}
      onMouseDown={(event) => {
        if (event.currentTarget === event.target && !isSubmitting) onClose();
      }}
    >
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="game-rating-title"
        className="my-auto flex max-h-[calc(100vh-2rem)] w-full max-w-2xl flex-col items-center gap-4 overflow-y-auto text-[#f4e9e9]"
      >
        <div className="relative w-full max-w-[220px]">
          <img src={ratingPaper} alt="Rating paper" className="block h-auto w-full" />
          {rating !== null && (
            <span
              aria-live="polite"
              className="pointer-events-none absolute left-1/2 top-[52%] -translate-x-1/2 -translate-y-1/2 text-black"
              style={{ fontFamily: "Written", fontSize: "clamp(56px, 16vw, 104px)" }}
            >
              {rating}
            </span>
          )}
        </div>

        <div className="flex w-full flex-col items-center">
          <p className="sr-only">Choose a rating from 1 to 5</p>
          <div className="flex flex-wrap items-center justify-center gap-2">
            <div
              role="group"
              aria-label="Choose a rating from 1 to 5 stars"
              className="flex gap-1"
              onMouseLeave={() => setHoveredRating(null)}
            >
              {[1, 2, 3, 4, 5].map((value) => (
                <button
                  key={value}
                  type="button"
                  aria-label={`${value} ${value === 1 ? "star" : "stars"}`}
                  aria-pressed={rating === value}
                  onMouseEnter={() => setHoveredRating(value)}
                  onClick={() => onRatingChange(value)}
                  className={`text-4xl leading-none focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-300 ${
                    highlightedRating !== null && value <= highlightedRating
                      ? "text-yellow-300"
                      : "text-[#756a63] hover:text-yellow-200"
                  }`}
                >
                  ★
                </button>
              ))}
            </div>
            <button
              type="button"
              onClick={() => void onSubmit()}
              disabled={isSubmitting}
              className="flex min-h-11 items-center justify-center gap-2 border border-[#d1a96c] bg-[#624524] px-4 py-2 font-semibold text-white hover:bg-[#795a32] disabled:cursor-wait disabled:opacity-60"
            >
              {isSubmitting ? "Saving..." : "Save"}
            </button>
          </div>
          <p
            aria-live="polite"
            className="mt-2 min-h-5 text-center text-sm text-[#d0b9a7]"
          >
            {rating === null ? "No rating selected" : `Selected: ${rating} / 5`}
          </p>
          {!isAuthenticated && (
            <p className="mt-1 text-center text-sm text-[#ffc2a8]">
              Sign in to submit a rating or comment.
            </p>
          )}
          {error && (
            <p role="alert" className="mt-2 text-center text-sm text-[#ffc2a8]">
              {error}
            </p>
          )}
          {isSubmitting && (
            <div className="mt-2">
              <LoadingIndicator size={40} showLabel label="Saving rating..." />
            </div>
          )}
        </div>

        <div className="w-full border border-[#8e6e52] bg-[#171013] p-5 shadow-2xl sm:p-7">
          <div className="mb-5 flex items-start justify-between gap-4">
            <h2 id="game-rating-title" className="text-2xl font-bold">
              Comments
            </h2>
            <button
              ref={closeButtonRef}
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              aria-label="Close rating dialog"
              className="grid h-10 w-10 shrink-0 place-items-center border border-[#8e6e52] text-2xl hover:bg-white/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-300 disabled:cursor-wait disabled:opacity-50"
            >
              ×
            </button>
          </div>
          <CommentSection targetId={gameId} targetType={0} />
        </div>
      </section>
    </div>,
    document.body,
  );
}
