import { Config } from "../../../Config";
import LoadingIndicator from "../../../components/LoadingIndicator";
import usePlayerLoad from "../hooks/usePlayerLoad";
import GameScreen from "./GameScreen";

export default function ArchiveGamePlayer({
  gameId,
  width,
  height,
}: {
  gameId: string;
  width: number;
  height: number;
}) {
  const { isLoading, error, url } = usePlayerLoad(gameId, true);

  return (
    <div className="absolute inset-0 box-border flex items-center justify-center overflow-hidden border-5 border-black bg-black">
      {isLoading ? (
        <div className="grid h-full place-items-center"><LoadingIndicator size={144} showLabel /></div>
      ) : error || !url ? (
        <p role="alert" className="grid h-full place-items-center p-6 text-center">{error || "Game unavailable."}</p>
      ) : (
        <GameScreen
          swfUrl={new URL(
            /^https?:\/\//i.test(url)
              ? url
              : `${Config.API_URL.replace(/\/$/, "")}/${url.replace(/^\//, "")}`,
            window.location.origin,
          ).href}
          embedded
          width={width}
          height={height}
        />
      )}
    </div>
  );
}
