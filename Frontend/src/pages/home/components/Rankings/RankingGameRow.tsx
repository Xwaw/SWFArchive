import type { RankingGame } from "../../data/rankings";

interface RankingGameRowProps {
  game: RankingGame;
}

export default function RankingGameRow({ game }: RankingGameRowProps) {
  return (
  <div
    key={game.position}
    className="w-full h-full flex"
    style={{
      background: "#050505",
      borderBottom: "1px solid #555",
    }}
  >
    {/* POSITION */}

    <div
      className="w-[4%] shrink-0 flex justify-center items-center"
      style={{
        borderRight: "1px solid #333",
        color: "#ff9d00",
        fontSize: 22,
        fontWeight: "bold",
      }}
    >
      {game.position}
    </div>

    {/* GAME */}

    <div className="flex-1 min-w-0 flex flex-col justify-center px-5">
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
          {game.publisher}
        </span>
        {" | "}
        <span className="text-white font-bold">
          {game.platform}
        </span>
        {" | "}
        {game.genre}
      </span>
    </div>

    {/* RELEASE / SCORE */}

    <div
      className="w-[13%] shrink-0 flex flex-col justify-center items-center text-center"
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
        {game.rightLabel}
      </span>

      <span
        style={{
          color:
            game.rightLabel === "score:" ? "#d8d8d8" : "#ff9d00",
          fontWeight: "bold",
          fontSize: game.rightLabel === "score:" ? 18 : 14,
        }}
      >
        {game.rightValue}
      </span>
    </div>
  </div>
  );
}
