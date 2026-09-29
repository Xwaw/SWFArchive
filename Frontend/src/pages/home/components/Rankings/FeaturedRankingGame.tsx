import { useNavigate } from "react-router-dom";

export default function FeaturedRankingGame() {
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
          TODAY&apos;S #1 GAME
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
          GAME TITLE GAME TITLE
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
            <span className="text-white font-bold">EXAMPLE_NAME</span>
          </p>

          <p>
            Developer:{" "}
            <span className="text-white font-bold">EXAMPLE_NAME_DEV</span>
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
            Genre: <span className="text-white font-bold">Action</span>
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

          <span className="cursor-pointer hover:text-white">Discuss</span>

          <span
            className="cursor-pointer hover:text-white"
            onClick={() => navigate("/addToLibrary_lmao")}
          >
            Add
          </span>
        </div>
      </div>

      <div className="flex-1 h-full flex items-center justify-center">
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
                <img
                  src="/test/images/banners/1.png"
                  alt="GAME BOX"
                  className="block w-full h-full object-cover"
                />
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

                  background:
                    "linear-gradient(to bottom, #555 0%, #1d1d1d 100%)",

                  borderLeft: "1px solid #aaa",
                  borderRight: "1px solid #777",
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
