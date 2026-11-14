import { useEffect, useState } from "react";
import { BASE, rectangles, type ArcadeRectangle } from "./arcadeMachineConfig";

type StickerPositionIndex = 1 | 2 | 3;

type ImageSize = {
  width: number;
  height: number;
};

const stickerPositions = [
  { left: "8.5%", top: "36%", width: 22, rotation: 20 },
  { left: "9%", top: "37%", width: 22, rotation: -8 },
  { left: "9.5%", top: "37.5%", width: 22, rotation: -27 },
] as const;

const ratingStickerPositions = [
  { left: "80.5%", top: "36%", width: 22, rotation: -20 },
  { left: "80%", top: "37%", width: 22, rotation: 8 },
  { left: "79.5%", top: "37.5%", width: 22, rotation: 27 },
] as const;

type StickerPlacement = (typeof stickerPositions)[number];

type ArcadeStickersProps = {
  uploadedAt: string;
  sizes: ImageSize[];
  totalHeight: number;
  stickerTimeEnabled: boolean;
  stickerPosition?: StickerPositionIndex;
  stickerScale: number;
  stickerRotation?: number;
  ratingStickerPosition?: StickerPositionIndex;
  ratingStickerScale: number;
  ratingStickerRotation?: number;
};

type StickerLayerProps = {
  type: "saved" | "rating";
  wearLevel: 1 | 2 | 3;
  placement: StickerPlacement;
  scale: number;
  rotation: number;
  section: ArcadeRectangle;
};

function getStickerWearLevel(uploadedAt: string, currentTime: number): 1 | 2 | 3 {
  const uploadedTime = Date.parse(uploadedAt);

  if (!Number.isFinite(uploadedTime)) return 1;

  const ageInWeeks = (currentTime - uploadedTime) / (1000 * 60 * 60 * 24 * 7);
  if (ageInWeeks < 1) return 1;
  if (ageInWeeks < 3) return 2;
  return 3;
}

function getRandomStickerPositions(): [StickerPositionIndex, StickerPositionIndex] {
  const positions = [1, 2, 3] as const;
  const savedPosition = positions[Math.floor(Math.random() * positions.length)];
  const ratingOptions = positions.filter((position) => position !== savedPosition);
  const ratingPosition =
    ratingOptions[Math.floor(Math.random() * ratingOptions.length)];

  return [savedPosition, ratingPosition];
}

function getStickerSection(
  placement: StickerPlacement,
  sizes: ImageSize[],
  totalHeight: number,
): ArcadeRectangle {
  let sectionStart = 0;
  const stickerTop = Number.parseFloat(placement.top);
  const sectionIndex = sizes.findIndex((size) => {
    const sectionEnd = sectionStart + (size.height / totalHeight) * 100;
    const containsSticker = stickerTop >= sectionStart && stickerTop < sectionEnd;
    sectionStart = sectionEnd;
    return containsSticker;
  });

  return rectangles[sectionIndex] ?? rectangles[0];
}

function StickerLayer({
  type,
  wearLevel,
  placement,
  scale,
  rotation,
  section,
}: StickerLayerProps) {
  const image = `${BASE}/stickers/${type}/${wearLevel}.png`;

  return (
    <div
      className="pointer-events-none absolute z-20 select-none"
      style={{
        left: placement.left,
        top: placement.top,
        width: `${placement.width * scale}%`,
        transform: `rotate(${rotation}deg)`,
        transformOrigin: "center",
      }}
    >
      <img
        src={image}
        alt=""
        aria-hidden="true"
        draggable={false}
        className="block h-auto w-full"
        style={{
          filter: `brightness(${Math.min(section.brightness * 1.15, 1.15)}) drop-shadow(0 2px 3px #000b)`,
        }}
      />
      {section.gradient !== "none" && (
        <div
          className="absolute inset-0"
          style={{
            background: section.gradient,
            maskImage: `url("${image}")`,
            maskSize: "100% 100%",
            maskRepeat: "no-repeat",
            WebkitMaskImage: `url("${image}")`,
            WebkitMaskSize: "100% 100%",
            WebkitMaskRepeat: "no-repeat",
          }}
        />
      )}
    </div>
  );
}

export default function ArcadeStickers({
  uploadedAt,
  sizes,
  totalHeight,
  stickerTimeEnabled,
  stickerPosition,
  stickerScale,
  stickerRotation,
  ratingStickerPosition,
  ratingStickerScale,
  ratingStickerRotation,
}: ArcadeStickersProps) {
  const [currentTime, setCurrentTime] = useState(() => Date.now());
  const [randomPositions] = useState(getRandomStickerPositions);
  const wearLevel = stickerTimeEnabled
    ? getStickerWearLevel(uploadedAt, currentTime)
    : 3;
  const savedPositionIndex =
    stickerPosition ??
    (ratingStickerPosition === randomPositions[0]
      ? randomPositions[1]
      : randomPositions[0]);
  const ratingPositionIndex =
    ratingStickerPosition ??
    (randomPositions[0] === savedPositionIndex
      ? randomPositions[1]
      : randomPositions[0]);
  const savedPlacement = stickerPositions[savedPositionIndex - 1];
  const ratingPlacement = ratingStickerPositions[ratingPositionIndex - 1];
  const boundedStickerScale = Number.isFinite(stickerScale)
    ? Math.min(Math.max(stickerScale, 0.5), 2)
    : 1;
  const boundedRatingStickerScale = Number.isFinite(ratingStickerScale)
    ? Math.min(Math.max(ratingStickerScale, 0.5), 2)
    : 1;
  const savedSection = getStickerSection(savedPlacement, sizes, totalHeight);
  const ratingSection = getStickerSection(ratingPlacement, sizes, totalHeight);

  useEffect(() => {
    const timer = window.setInterval(() => setCurrentTime(Date.now()), 60_000);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <>
      <StickerLayer
        type="saved"
        wearLevel={wearLevel}
        placement={savedPlacement}
        scale={boundedStickerScale}
        rotation={stickerRotation ?? savedPlacement.rotation}
        section={savedSection}
      />
      <StickerLayer
        type="rating"
        wearLevel={wearLevel}
        placement={ratingPlacement}
        scale={boundedRatingStickerScale}
        rotation={ratingStickerRotation ?? ratingPlacement.rotation}
        section={ratingSection}
      />
    </>
  );
}
