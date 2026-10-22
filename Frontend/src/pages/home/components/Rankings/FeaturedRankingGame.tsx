import { useNavigate } from "react-router-dom";
import type { RankingGame } from "./RankingsSection";
import { Config } from "../../../../Config";

interface FeaturedRankingGameProps {
  game: RankingGame;
}

export default function FeaturedRankingGame({
  game,
}: FeaturedRankingGameProps) {
  const navigate = useNavigate();

  return (
    <div
      className="w-full h-[430px] flex"
      style={{
        backgroundImage: `url("/images/backgrounds/bg_n1.png")`,
        borderBottom: "2px solid #444",
        backgroundSize: "100% 100%",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="w-[74%] h-full flex flex-col px-4">
        <div
          className="w-full h-[55px] shrink-0 flex justify-center items-center"
          style={{
            fontFamily: "Gamez",
            fontSize: 23,
            color: "#ffca16",
            WebkitTextStroke: "0.6px #6a3100",
            textShadow: "0 1px 2px black",
          }}
        >
          #1 RANKED GAME
        </div>

        <div
          className="w-full h-[60px] shrink-0 flex justify-center items-center"
          style={{
            fontSize: 27,
            fontWeight: "bold",
            color: "white",
            textShadow: "2px 2px 2px black",
          }}
        >
          {game.title}
        </div>

        <div
          className="w-full shrink-0"
          style={{
            borderTop: "2px solid #744300",
          }}
        />

        <div
          className="w-full h-[48px] shrink-0 flex items-center"
          style={{
            borderBottom: "1px dotted #555",
            fontSize: 15,
            color: "#b2b2b2",
          }}
        >
          <p className="w-[43%]">
            Publisher:{" "}
            <span className="text-white font-bold">{game.authorName}</span>
          </p>

          <p>
            Developer: <span className="text-white font-bold">Unknown</span>
          </p>
        </div>

        <div
          className="w-full h-[48px] shrink-0 flex items-center"
          style={{
            borderBottom: "1px dotted #555",
            fontSize: 15,
            color: "#b2b2b2",
          }}
        >
          <p className="w-[43%]">
            Platform: <span className="text-white font-bold">Flash</span>
          </p>

          <p>
            Genre: <span className="text-white font-bold">Unknown</span>
          </p>
        </div>

        <div
          className="w-full h-[48px] shrink-0 flex items-center"
          style={{
            fontSize: 15,
            color: "#b2b2b2",
          }}
        >
          Score:
          <span
            className="ml-1 font-bold"
            style={{
              color: "#ff9d00",
              fontSize: 17,
            }}
          >
            {game.ratingAverage.toFixed(1)}
          </span>
        </div>

        {/* LINKS */}

        <div
          className="w-full h-[65px] shrink-0 flex items-center gap-6"
          style={{
            color: "#ff9d00",
            fontSize: 15,
            fontWeight: "bold",
          }}
        >
          <span
            className="cursor-pointer hover:text-white"
            onClick={() => navigate(`/archive/view/${game.id}`)}
          >
            More Info
          </span>

          <span className="cursor-pointer hover:text-white">Track</span>

          <span className="cursor-pointer hover:text-white">Discuss</span>

          <span
            className="cursor-pointer hover:text-white"
            onClick={() => navigate("/addToLibrary_lmao")}
          >
            Add
          </span>
        </div>
      </div>

      {/* 3D GAME BOX */}

      <div className="flex-1 h-full flex items-center justify-center">
        <div
          className="relative"
          style={{
            width: "220px",
            height: "275px",
            perspective: "900px",
          }}
        >
          <div
            className="relative w-full h-full"
            style={{
              transformStyle: "preserve-3d",
              transform: "rotateY(-20deg) rotateX(15deg) rotateZ(-3deg)",
            }}
          >
            <div
              className="absolute inset-0 overflow-hidden"
              style={{
                transform: "translateZ(15px)",
                backfaceVisibility: "hidden",
                border: "1px solid white",
                boxShadow: "0 5px 8px rgba(0,0,0,0.55)",
              }}
            >
              <>
                {game.thumbnailUrl ? (
                  <img
                    src={Config.API_URL + game.thumbnailUrl}
                    alt={game.title}
                    className="block w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-neutral-800" />
                )}

                <div
                  className="absolute bottom-0 left-0 w-full min-h-[55px] flex items-end justify-center px-3 pb-3"
                  style={{
                    background:
                      "linear-gradient(to top, rgba(0,0,0,0.95), rgba(0,0,0,0.65) 65%, transparent)",
                  }}
                >
                  <span
                    className="text-center text-white font-bold break-words"
                    style={{
                      fontSize: 17,
                      lineHeight: "20px",
                      textShadow: "1px 2px 3px black",
                    }}
                  >
                    {game.title}
                  </span>
                </div>
              </>
            </div>

            <div
              className="absolute top-0"
              style={{
                width: "30px",
                height: "275px",
                left: "205px",
                transform: "rotateY(90deg)",
                transformOrigin: "center",
                background: "linear-gradient(to right, #555 0%, #222 100%)",
                borderTop: "1px solid white",
                borderBottom: "1px solid #777",
              }}
            />

            <div
              className="absolute left-0"
              style={{
                width: "220px",
                height: "30px",
                top: "260px",
                transform: "rotateX(90deg)",
                transformOrigin: "center",
                background: "linear-gradient(to bottom, #555 0%, #1d1d1d 100%)",
                borderLeft: "1px solid #aaa",
                borderRight: "1px solid #777",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
