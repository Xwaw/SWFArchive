import { useNavigate } from "react-router-dom";

export default function FeaturedRankingGame() {
  const navigate = useNavigate();

  return (
    <div
      className="w-full h-[430px] flex"
      style={{
        background: `
          linear-gradient(
            to right,
            #080808 0%,
            #080808 58%,
            #321800 72%,
            #f19a00 100%
          )
        `,
        borderBottom: "2px solid #444",
      }}
    >
      {/* GAME INFORMATION */}

      <div className="w-[74%] h-full flex flex-col px-4">
          {/* TODAY'S #1 */}

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
            TODAY&apos;S #1 GAME
          </div>

          {/* TITLE */}

          <div
            className="w-full h-[60px] shrink-0 flex justify-center items-center"
            style={{
              fontSize: 27,
              fontWeight: "bold",
              color: "white",
              textShadow: "2px 2px 2px black",
            }}
          >
            GAME TITLE GAME TITLE
          </div>

          <div
            className="w-full shrink-0"
            style={{
              borderTop: "2px solid #744300",
            }}
          />

          {/* PUBLISHER / DEVELOPER */}

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
              <span className="text-white font-bold">EXAMPLE_NAME</span>
            </p>

            <p>
              Developer:{" "}
              <span className="text-white font-bold">
                EXAMPLE_NAME_DEV
              </span>
            </p>
          </div>

          {/* PLATFORM / GENRE */}

          <div
            className="w-full h-[48px] shrink-0 flex items-center"
            style={{
              borderBottom: "1px dotted #555",
              fontSize: 15,
              color: "#b2b2b2",
            }}
          >
            <p className="w-[43%]">
              Platform:{" "}
              <span className="text-white font-bold">Flash</span>
            </p>

            <p>
              Genre: <span className="text-white font-bold">Action</span>
            </p>
          </div>

          {/* SCORE */}

          <div
            className="w-full h-[48px] shrink-0 flex items-center"
            style={{
              borderBottom: "2px solid #744300",
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
              8.3
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
              onClick={() => navigate("/archive/view/id")}
            >
              More Info
            </span>

            <span className="cursor-pointer hover:text-white">Track</span>

            <span className="cursor-pointer hover:text-white">
              Discuss
            </span>

            <span
              className="cursor-pointer hover:text-white"
              onClick={() => navigate("/addToLibrary_lmao")}
            >
              Add
            </span>
          </div>
        </div>

        {/* GAME BOX */}

        <div className="flex-1 h-full flex items-center justify-center">
          <div
            className="w-[190px] h-[285px] bg-black flex items-center justify-center overflow-hidden"
            style={{
              border: "2px solid white",
              boxShadow: "0 0 3px black",
            }}
          >
            <img
              src="/test/images/banners/1.png"
              alt="GAME BOX"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
  );
}
