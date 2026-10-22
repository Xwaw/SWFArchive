import { useEffect, useState } from "react";
import Button from "../../../../components/Buttons/Button";
import GameCard from "../../../../components/Cards/GameCard";
import { archiveService } from "../../../../features/archive/services/ArchiveService";
import type { ArchiveGameDto } from "../../../../features/archive/types/ComponentsDto";

export default function GameCardsSection() {
  const [games, setGames] = useState<ArchiveGameDto[]>([]);
  const slots = 4;

  const getRandomGames = async (value: number) => {
    const response = await archiveService.GetRandomGames(value);
    setGames(response);
  }

  useEffect(() => {
    getRandomGames(slots);
  }, [])

  return (
    <section className="relative w-full h-full">
      <div
        className="
          absolute
          left-[1%]
          right-[7%]
          top-[3%]
          bottom-[3%]
          flex
          items-center
          gap-3
        "
      >
        {
          games.map((value) => {
            return(
              <div
                key={value.id}
                className="w-[calc((100%-36px)/4)] shrink-0 min-w-0 h-[88%] flex items-center justify-center"
              >
                <GameCard game={value}/>
              </div>
            )
          })
        }
      </div>

      <div
        className="
          absolute
          right-[-0.7%]
          
          h-[100%]
          w-[5.5%]
          overflow-hidden
        "
      >
        <div
          className="
            absolute
            top-1/2
            left-1/2
            w-[320px]
            h-[70px]
            -translate-x-1/2
            -translate-y-1/2
            -rotate-90
          "
        >
          <Button style="tabs" navigateOnClick="/archive">
            <p
              className="whitespace-nowrap p-2"
              style={{
                fontFamily: "Robot_Font",
                fontSize: "40px",
                color: "#FFF4DD",
              }}
            >
              SEE MORE
            </p>
          </Button>
        </div>
      </div>

    </section>
  );
}