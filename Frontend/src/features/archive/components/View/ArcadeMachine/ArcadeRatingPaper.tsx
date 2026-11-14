import { BASE } from "./arcadeMachineConfig";

type ArcadeRatingPaperProps = {
  title: string;
  isAuthenticated: boolean;
  paperRating: number | null;
  onOpenRating: () => void;
};

export default function ArcadeRatingPaper({
  title,
  isAuthenticated,
  paperRating,
  onOpenRating,
}: ArcadeRatingPaperProps) {
  if (!isAuthenticated) {
    return (
      <img
        src={`${BASE}/accessories/paper_for_rating/nolog.png`}
        alt="Sign in to rate this game"
        draggable={false}
        className="absolute left-[4%] top-[42%] z-30 h-[92%] w-[26%] -rotate-3 object-contain drop-shadow-[2px_4px_4px_#000b]"
      />
    );
  }

  return (
    <button
      type="button"
      onClick={onOpenRating}
      aria-label={`Rate ${title}`}
      className="group absolute left-[4%] top-[42%] z-30 h-[92%] w-[26%] origin-top -rotate-3 cursor-pointer border-0 bg-transparent p-0 drop-shadow-[2px_4px_4px_#000b] transition duration-200 ease-out hover:-translate-y-1 hover:-rotate-1 hover:scale-[1.04] hover:drop-shadow-[4px_8px_8px_#000d] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-300"
      style={{ containerType: "inline-size" }}
    >
      <img
        src={`${BASE}/accessories/paper_for_rating/idle.png`}
        alt=""
        draggable={false}
        className="block h-full w-full object-contain transition-opacity duration-200 group-hover:opacity-0 group-focus-visible:opacity-0"
      />
      <img
        src={`${BASE}/accessories/paper_for_rating/hover.png`}
        alt=""
        draggable={false}
        className="absolute inset-0 block h-full w-full object-contain opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100"
      />
      {paperRating !== null && (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-[52%] -translate-x-1/2 -translate-y-1/2 text-black"
          style={{
            fontFamily: "Written",
            fontSize: "clamp(36px, 44cqw, 112px)",
          }}
        >
          {paperRating}
        </span>
      )}
    </button>
  );
}
