import { useNavigate } from "react-router-dom";
import type { GameCardProps } from "../types/ComponentsProps";

export default function GameCard({
  id,
  title,
  thumbnailUrl,
  authorName,
  playsCount,
  starsRated,
  uploaded,
}: GameCardProps) {
  const navigate = useNavigate();

  return (
    <div className="w-full h-75 bg-gray-600 hover:opacity-75">
      <div
        className="w-full h-8/10 bg-green-600 relative"
        style={{
          backgroundImage: `url(${thumbnailUrl ?? ""})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
        onClick={() => {
          navigate(`game/${id}`);
        }}
      >
        <div className="absolute bottom-1 left-1 flex bg-black/60 text-white px-2 py-1 rounded text-sm">
            <div>{uploaded}</div>
        </div>
        <div className="absolute bottom-1 right-1 flex flex-col gap-2 bg-black/60 text-white px-2 py-1 rounded text-sm">
          <span>{"*"} {starsRated}</span>
          <span>{">"} {playsCount}</span>
        </div>
      </div>
      <div className="flex">
        <div className="h-15 aspect-square bg-amber-300"></div>
        <div className="flex flex-col justify-center pl-2">
            <div style={{fontWeight: "bold"}}>{title}</div>
            <div>{authorName}</div>
        </div>
      </div>
    </div>
  );
}
