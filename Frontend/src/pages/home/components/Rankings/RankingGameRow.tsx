
import type { RankingGame } from "./RankingsSection";

interface RankingGameRowProps {
  game: RankingGame & {
    position: number;
  };
}

export default function RankingGameRow({ game }: RankingGameRowProps) {
  return (
    <div
      className="w-full h-full flex"
      style={{
        background: "#050505",
        borderBottom: "1px solid #555",
      }}
    >
      <div
        className="w-[4%] shrink-0 flex justify-center items-center bg-[#2c2c2c]"
        style={{
          borderRight: "1px solid #333",
          color: "#ff9d00",
          fontSize: 22,
          fontWeight: "bold",
        }}
      >
        {game.position}
      </div>

      <div className="flex-1 min-w-0 flex flex-col justify-center px-5 bg-[#000000]">
        <p
          className="truncate"
          style={{
            color: "#f39300",
            fontSize: 18,
            fontWeight: "bold",
          }}
        >
          {game.title}
        </p>

        <span
          className="truncate"
          style={{
            color: "#9c9c9c",
            fontSize: 14,
          }}
        >
          Publisher:{" "}
          <span className="text-white font-bold">
            {game.authorName}
          </span>
          {" | "}
          Plays:{" "}
          <span className="text-white font-bold">
            {game.playsCount.toLocaleString()}
          </span>
        </span>
      </div>

      <div
        className="w-[13%] shrink-0 flex flex-col justify-center items-center text-center bg-[#2c2c2c]"
        style={{
          borderLeft: "1px solid #333",
          fontSize: 14,
        }}
      >
        <span
          style={{
            color: "#8c8c8c",
            fontWeight: "bold",
          }}
        >
          Score:
        </span>

        <span
          style={{
            color: "#d8d8d8",
            fontWeight: "bold",
            fontSize: 18,
          }}
        >
          {game.ratingAverage.toFixed(1)}
        </span>
      </div>
    </div>
  );
}
