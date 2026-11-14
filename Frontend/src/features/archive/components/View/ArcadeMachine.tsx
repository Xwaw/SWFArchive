import { useEffect, useState } from "react";
import ArcadeControls from "./ArcadeMachine/ArcadeControls";
import ArcadeDisplay from "./ArcadeMachine/ArcadeDisplay";
import ArcadeGameScreen from "./ArcadeMachine/ArcadeGameScreen";
import ArcadeRatingPaper from "./ArcadeMachine/ArcadeRatingPaper";
import ArcadeSpeaker from "./ArcadeMachine/ArcadeSpeaker";
import ArcadeStickers from "./ArcadeMachine/ArcadeStickers";
import {
  BASE,
  defaultWallpaperTransform,
  rectangles,
} from "./ArcadeMachine/arcadeMachineConfig";

type ArcadeMachineProps = {
  wallpaper: string;
  title?: string;
  gameId: string;
  uploadedAt: string;
  rating: number;
  downloaded: number;
  paperRating: number | null;
  isAuthenticated: boolean;
  onOpenRating: () => void;
  stickerTimeEnabled?: boolean;
  stickerPosition?: 1 | 2 | 3;
  stickerScale?: number;
  stickerRotation?: number;
  ratingStickerPosition?: 1 | 2 | 3;
  ratingStickerScale?: number;
  ratingStickerRotation?: number;
};

type ImageSize = {
  width: number;
  height: number;
};

export default function ArcadeMachine({
  wallpaper,
  title = "Arcade Machine",
  gameId,
  uploadedAt,
  rating,
  downloaded,
  paperRating,
  isAuthenticated,
  onOpenRating,
  stickerTimeEnabled = true,
  stickerPosition,
  stickerScale = 0.55,
  stickerRotation,
  ratingStickerPosition,
  ratingStickerScale = stickerScale,
  ratingStickerRotation,
}: ArcadeMachineProps) {
  const [sizes, setSizes] = useState<ImageSize[]>([]);
  const totalHeight = sizes.reduce((sum, size) => sum + size.height, 0);

  useEffect(() => {
    let cancelled = false;

    Promise.all(
      rectangles.map(
        (rect) =>
          new Promise<ImageSize>((resolve, reject) => {
            const img = new Image();

            img.onload = () =>
              resolve({
                width: img.naturalWidth,
                height: img.naturalHeight,
              });

            img.onerror = reject;

            img.src = `${BASE}/rectangles/rect_${rect.id}.png`;
          }),
      ),
    )
      .then((result) => {
        if (!cancelled) {
          setSizes(result);
        }
      })
      .catch(console.error);

    return () => {
      cancelled = true;
    };
  }, []);

  let currentY = 0;

  return (
    <div className="relative w-full select-none">
      <img
        src={`${BASE}/images/full.png`}
        className="
          absolute inset-0 z-0 block h-auto w-full pointer-events-none
          drop-shadow-[0_10px_24px_rgba(0,0,0,0.85)]
        "
        alt={title}
        draggable={false}
      />

      <div className="relative z-10 flex w-full flex-col">
        {rectangles.map((rect, index) => {
          const size = sizes[index];

          if (!size || totalHeight === 0) {
            return null;
          }

          const startY = currentY;
          currentY += size.height;

          const mask = `${BASE}/rectangles/rect_${rect.id}.png`;
          const wallpaperTransform = {
            ...defaultWallpaperTransform,
            ...rect.wallpaperTransform,
          };

          return (
            <div
              key={rect.id}
              className="relative w-full shrink-0"
              style={{
                aspectRatio: `${size.width} / ${size.height}`,
              }}
            >
              <div
                className="absolute inset-0"
                style={{
                  maskImage: `url("${mask}")`,
                  maskSize: "100% 100%",
                  maskRepeat: "no-repeat",
                  WebkitMaskImage: `url("${mask}")`,
                  WebkitMaskSize: "100% 100%",
                  WebkitMaskRepeat: "no-repeat",
                }}
              >
                <div
                  className="absolute inset-0"
                  style={{
                    backgroundImage: `url("${wallpaper}")`,
                    backgroundSize: `${rect.scale * 100}% ${
                      (totalHeight / size.height) * rect.scale * 100
                    }%`,
                    backgroundPosition: `center ${
                      totalHeight === size.height
                        ? 0
                        : (startY / (totalHeight - size.height)) * 100
                    }%`,
                    backgroundRepeat: "no-repeat",
                    filter: `brightness(${rect.brightness})`,
                    transformOrigin: "center",
                    transform: [
                      `translate(${wallpaperTransform.offsetXPercent}%, ${wallpaperTransform.offsetYPercent}%)`,
                      `perspective(${wallpaperTransform.perspectivePx}px)`,
                      `rotateX(${wallpaperTransform.rotateXDeg}deg)`,
                      `rotateY(${wallpaperTransform.rotateYDeg}deg)`,
                    ].join(" "),
                  }}
                />
              </div>

              {rect.gradient !== "none" && (
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: rect.gradient,
                    maskImage: `url("${mask}")`,
                    maskSize: "100% 100%",
                    maskRepeat: "no-repeat",
                    WebkitMaskImage: `url("${mask}")`,
                    WebkitMaskSize: "100% 100%",
                    WebkitMaskRepeat: "no-repeat",
                  }}
                />
              )}

              {rect.id === 6 && <ArcadeSpeaker />}

              {rect.id === 4 && <ArcadeControls />}

              {rect.id === 5 && (
                <ArcadeRatingPaper
                  title={title}
                  isAuthenticated={isAuthenticated}
                  paperRating={paperRating}
                  onOpenRating={onOpenRating}
                />
              )}
            </div>
          );
        })}
        <ArcadeDisplay rating={rating} downloaded={downloaded} />
      </div>

      <ArcadeStickers
        uploadedAt={uploadedAt}
        sizes={sizes}
        totalHeight={totalHeight}
        stickerTimeEnabled={stickerTimeEnabled}
        stickerPosition={stickerPosition}
        stickerScale={stickerScale}
        stickerRotation={stickerRotation}
        ratingStickerPosition={ratingStickerPosition}
        ratingStickerScale={ratingStickerScale}
        ratingStickerRotation={ratingStickerRotation}
      />
      <ArcadeGameScreen gameId={gameId} />
    </div>
  );
}
