import { useEffect, useRef, useState } from "react";
import LoadingIndicator from "../../../components/LoadingIndicator";

export default function GameScreen({
  swfUrl,
  embedded = false,
  width,
  height,
}: {
  swfUrl: string;
  embedded?: boolean;
  width?: number;
  height?: number;
}) {
  const ruffleRef = useRef<HTMLDivElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let disposed = false;
    const container = ruffleRef.current;
    let player: HTMLElement | undefined;
    setIsLoading(true);
    setError(null);

    const setup = async () => {
      try {
        if (!window.RufflePlayer) throw new Error("Ruffle unavailable");
        player = window.RufflePlayer.newest().createPlayer();
        if (!player || !container) return;
        if (embedded) {
          player.style.width = "100%";
          player.style.height = "100%";
        }
        container.appendChild(player);

        const runtime = player as HTMLElement & {
          ruffle: () => {
            load: (options: {
              url: string;
              autoplay: string;
              unmuteOverlay: string;
              scale?: string;
              forceScale?: boolean;
            }) => Promise<void>;
          };
        };
        await runtime
          .ruffle()
          .load({
            url: swfUrl,
            autoplay: "on",
            unmuteOverlay: "visible",
            ...(embedded ? { scale: "showAll", forceScale: true } : {}),
          });
      } catch {
        if (!disposed)
          setError("Could not load the game. Please refresh and try again.");
      } finally {
        if (!disposed) setIsLoading(false);
      }
    };
    void setup();
    return () => {
      disposed = true;
      player?.remove();
    };
  }, [swfUrl, embedded]);

  return (
    <div
      className={
        embedded
          ? "relative h-full w-full min-h-0 min-w-0"
          : "relative flex justify-center items-center"
      }
      style={
        embedded
          ? { maxWidth: width, maxHeight: height }
          : undefined
      }
    >
      <div ref={ruffleRef} className="w-full h-full" />
      {isLoading && (
        <div className="absolute inset-0 grid place-items-center bg-[#100d0f]">
          <LoadingIndicator size={144} showLabel />
        </div>
      )}
      {error && (
        <p
          role="alert"
          className="absolute inset-0 grid place-items-center bg-[#100d0f] p-6 text-center text-white"
        >
          {error}
        </p>
      )}
    </div>
  );
}
