import { useNavigate } from "react-router-dom";
import { Config } from "../../Config";
import type { ArchiveGameDto } from "../../features/archive/types/ComponentsDto";

interface GameCardProps {
  game: ArchiveGameDto;
}

export default function GameCard({ game }: GameCardProps) {
  const navigate = useNavigate();
  
  const handleOnClick = (gameId: string) => {
    navigate(`/archive/game/${gameId}`)
  }

  return (
    <div
      className="
        group
        relative flex-1 min-w-0 aspect-square flex flex-col
        cursor-pointer
        select-none
        z-0

        hover:z-30
        hover:scale-[1.06]
        hover:brightness-125

        active:scale-[0.98]
        active:brightness-75
      "
      onClick={() => handleOnClick(game.id)}
    >
      <div className="relative w-full h-full flex flex-col overflow-hidden">
        <div
          className="
            relative z-20
            h-[19%]
            px-3
            flex items-center justify-center
            shrink-0
            text-center
            whitespace-nowrap
            overflow-hidden
            text-ellipsis
          "
          style={{
            fontSize: "28px",
            fontFamily: "Verdana",
          }}
        >
          {game.authorName}
        </div>

        <div className="relative z-0 flex-1 min-h-0 px-[4%] overflow-hidden">
          <img
            src={
              game.thumbnailUrl
                ? Config.API_URL + game.thumbnailUrl
                : "/test/images/banners/1.png"
            }
            alt="NO IMAGE FOUND"
            draggable={false}
            className="
              w-full h-full object-fill
              transition-[filter] duration-100
              group-hover:brightness-125
              bg-gradient-to-b from-[#383838] via-[#202020] to-[#111111]
            "
          />
        </div>

        <div
          className="
            relative z-20
            h-[25%]
            shrink-0
            px-3
            flex items-center justify-center
            text-center
          "
          style={{
            fontSize: "17px",
            fontFamily: "Verdana",
          }}
        >
          {game.title}
        </div>

        <img
          src="/images/gamecards/red.png"
          alt=""
          draggable={false}
          className="
            absolute inset-0 w-full h-full z-10 pointer-events-none
            group-hover:brightness-150
          "
        />
      </div>
    </div>
  );
}
