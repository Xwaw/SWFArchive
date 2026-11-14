export type ArcadeRectangle = {
  id: number;
  brightness: number;
  scale: number;
  gradient: string;
  wallpaperTransform?: Partial<WallpaperTransform>;
};

export type WallpaperTransform = {
  perspectivePx: number;
  rotateXDeg: number;
  rotateYDeg: number;
  offsetXPercent: number;
  offsetYPercent: number;
};

export const BASE = "/images/sections/arcade";

export const defaultWallpaperTransform: WallpaperTransform = {
  perspectivePx: 900,
  rotateXDeg: 0,
  rotateYDeg: 0,
  offsetXPercent: 0,
  offsetYPercent: 0,
};

export const rectangles: ArcadeRectangle[] = [
  { id: 1, brightness: 1, scale: 1, gradient: "none" },
  {
    id: 2,
    brightness: 1,
    scale: 1,
    gradient: "linear-gradient(to bottom, #0002, #0006)",
  },
  {
    id: 3,
    brightness: 0.8,
    scale: 1,
    gradient: "linear-gradient(to bottom, #0004, #0007)",
  },
  {
    id: 4,
    brightness: 1,
    scale: 1,
    gradient: "linear-gradient(to bottom, #0009, #0004)",
  },
  {
    id: 5,
    brightness: 0.65,
    scale: 1,
    gradient: "linear-gradient(to bottom, transparent, #0002)",
  },
  {
    id: 6,
    brightness: 0.9,
    scale: 0.85,
    gradient: "linear-gradient(to bottom, #000E, transparent)",
  },
];
