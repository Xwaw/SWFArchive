import type { ViewGameLibraryProps } from "../types/props";

export default function PlayButton({ gameId }: ViewGameLibraryProps) {
  return (
    <div
      onClick={() => {
        window.open(`/play/${gameId}`, "_blank");
      }}
      className="w-full h-full rounded-full bg-gradient-to-tl from-red-900 to-red-600 border-2 hover:from-green-900 hover:to-green-600"
    ></div>
  );
}
