import { useState } from "react";
import Button from "../../../../components/Buttons/Button";

const games = [
  {
    id: 0,
    name: "Stick Empires",
    description:
      "A real-time multiplayer strategy game set in the Stick War universe. Build your economy, train an army and command different unit types in battles against other players.",
    image: "/images/sections/favorite_banners/stickempires.jpg",
    tutorial_desc:
      "Stick Empires is still playable today. Visit the game's website and follow the provided setup guide to install everything required to play.",
    video: "https://www.youtube.com/embed/x7hN-yOqvKw?autoplay=1&mute=1",
    link: "https://www.stickempires.com/tutorial.php",
  },
  {
    id: 1,
    name: "Stick Arena",
    description:
      "A fast-paced multiplayer arena game where stick figures fight using weapons scattered around small maps. Simple controls and chaotic battles make every match quick and unpredictable.",
    image: "/images/sections/favorite_banners/stickarena.jpg",
    tutorial_desc:
      "Stick Arena is still playable through PlayStickArena. Since the remaining community is relatively small, it is best to play during active hours when more players are online.",
    video: "https://www.youtube.com/embed/mOwSnApk35g?autoplay=1&mute=1",
    link: "https://www.playstickarena.com/",
  },
  {
    id: 2,
    name: "Curve Fever 2",
    description:
      "A competitive multiplayer game where every player controls a constantly moving curve. Survive, collect power-ups and force your opponents to crash while the arena becomes increasingly chaotic.",
    image: "/images/sections/favorite_banners/curvefever.jpg",
    tutorial_desc:
      "Curve Fever 2 was replaced by the newer Curve Fever / Curve Fever Pro, which significantly changed the original experience. For something closer to the classic Curve Fever 2 gameplay, Curve Crash is a great alternative.",
    video: "https://www.youtube.com/embed/wHL3B65LAcM?autoplay=1&mute=1",
    link: "https://www.curvecrash.com/",
  },
];

export default function ExclusiveSection() {
  const [page, setPage] = useState(0);

  const game = games[page];

  const nextPage = () => {
    setPage((page) => (page + 1) % games.length);
  };

  const previousPage = () => {
    setPage((page) => (page - 1 + games.length) % games.length);
  };

  return (
    <section
      className="w-full h-[350px] flex bg-black overflow-hidden"
      style={{
        borderTop: "2px solid #770000",
        borderLeft: "2px solid #770000",
        borderRight: "2px solid #AA9999",
        borderBottom: "2px solid #770000",
      }}
    >
      {/* LEFT BANNER */}
      <div className="w-[45%] h-full flex shrink-0">
        <div
          className="relative flex-1 min-w-0 h-full"
          style={{
            backgroundImage: `url("${game.image}")`,
            backgroundSize: "100% 100%",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
          }}
        >
          <div
            className="
              absolute
              left-0
              top-0
              w-[6%]
              h-full
              flex
              items-center
              justify-center
              overflow-hidden
              bg-black/30
            "
          >
            <p
              className="-rotate-90 whitespace-nowrap select-none"
              style={{
                fontFamily: "Robot_Font",
                WebkitTextStroke: "0.7px black",
              }}
            >
              THE SITE CREATOR'S FAVORITE{" "}
              <span
                style={{
                  fontFamily: "Gamez",
                  color: "red",
                  WebkitTextStrokeColor: "orange",
                }}
              >
                GAMES
              </span>
            </p>
          </div>
        </div>
      </div>

      {/* RIGHT CONTENT */}
      <div
        className="
          flex-1
          min-w-0
          h-full
          flex
          flex-col
          px-5
          py-3
        "
      >
        {/* TITLE */}
        <div className="shrink-0">
          <div
            className="
              flex
              items-center
              justify-between
              gap-4
            "
          >
            <span
              className="whitespace-nowrap"
              style={{
                fontFamily: "Gamez",
                color: "orange",
                fontSize: "35px",
              }}
            >
              {game.name}
            </span>

            <span
              className="
                text-[#777]
                text-[12px]
                whitespace-nowrap
              "
              style={{
                fontFamily: "Arial",
              }}
            >
              {page + 1} / {games.length}
            </span>
          </div>

          <p
            className="
              text-[#999]
              text-[13px]
              leading-[1.35]
              max-w-[95%]
            "
            style={{
              fontFamily: "Arial",
            }}
          >
            {game.description}
          </p>
        </div>

        {/* SEPARATOR */}
        <div
          className="
            w-full
            h-px
            my-3
            shrink-0
            bg-gradient-to-r
            from-[#770000]
            via-[#aa0000]
            to-transparent
          "
        />

        {/* BOTTOM CONTENT */}
        <div
          className="
            flex-1
            min-h-0
            flex
            gap-5
          "
        >
          {/* VIDEO */}
          <div
            className="
              w-[50%]
              h-full
              flex
              flex-col
              min-w-0
            "
          >
            <div
              className="
                flex-1
                min-h-0
                relative
                flex
                items-center
                justify-center
                bg-[#101010]
                border-t-2
                border-l-2
                border-[#555]
                border-r-2
                border-b-2
                border-r-[#111]
                border-b-[#111]
                overflow-hidden
              "
            >
              {game.video ? (
                <iframe
                  src={game.video}
                  title={`${game.name} gameplay`}
                  className="w-full h-full"
                  allowFullScreen
                />
              ) : (
                <div
                  className="
                    flex
                    flex-col
                    items-center
                    justify-center
                    text-[#555]
                    select-none
                  "
                >
                  <span
                    className="text-[10px] mt-2"
                    style={{
                      fontFamily: "Arial",
                    }}
                  >
                    NO VIDEO FOUND
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* TUTORIAL */}
          <div
            className="
              flex-1
              min-w-0
              h-full
              flex
              flex-col
            "
          >
            <span
              className="
                text-[#dd3333]
                text-[11px]
                mb-2
                tracking-[1px]
              "
              style={{
                fontFamily: "Robot_Font",
              }}
            >
              HOW TO PLAY TODAY
            </span>

            <p
              className="
                text-[#aaa]
                text-[12px]
                leading-[1.4]
              "
              style={{
                fontFamily: "Arial",
              }}
            >
              {game.tutorial_desc}
            </p>

            {/* BOTTOM CONTROLS */}
            <div
              className="
    mt-auto
    flex
    items-end
    justify-between
    w-full
    select-none
  "
            >
              {/* GO PLAY */}
              <Button
                style="bar"
                width="160px"
                height="32px"
                onClick={() =>
                  window.open(game.link, "_blank", "noopener,noreferrer")
                }
              >
                <span
                  className="text-[14px] font-bold"
                  style={{
                    fontFamily: "Verdana",
                    color: "#fff3a0",
                    textShadow:
                      "-1px -1px 0 #8a2200, 1px -1px 0 #8a2200, -1px 1px 0 #8a2200, 1px 1px 0 #8a2200, 0 2px 2px #3a0000",
                  }}
                >
                  GO PLAY {">"}
                </span>
              </Button>

              {/* PAGE NAVIGATION */}
              <div className="flex items-center gap-2">
                <Button
                  style="icon"
                  width="36px"
                  height="30px"
                  onClick={previousPage}
                >
                  <span
                    className="text-[14px] font-bold"
                    style={{
                      fontFamily: "Verdana",
                      color: "#fff3a0",
                      textShadow:
                        "-1px -1px 0 #8a2200, 1px -1px 0 #8a2200, -1px 1px 0 #8a2200, 1px 1px 0 #8a2200, 0 2px 2px #3a0000",
                    }}
                  >
                    &lt;
                  </span>
                </Button>

                <div className="flex items-center gap-[2px] px-1">
                  {games.map((item, index) =>
                    page === index ? (
                      <Button
                        key={item.id}
                        style="hexagon"
                        width="9px"
                        height="9px"
                      >
                        {""}
                      </Button>
                    ) : (
                      <Button
                        key={item.id}
                        style="hexagon"
                        width="9px"
                        height="9px"
                        disabled
                      >
                        {""}
                      </Button>
                    ),
                  )}
                </div>

                <Button
                  style="icon"
                  width="36px"
                  height="30px"
                  onClick={nextPage}
                >
                  <span
                    className="text-[14px] font-bold"
                    style={{
                      fontFamily: "Verdana",
                      color: "#fff3a0",
                      textShadow:
                        "-1px -1px 0 #8a2200, 1px -1px 0 #8a2200, -1px 1px 0 #8a2200, 1px 1px 0 #8a2200, 0 2px 2px #3a0000",
                    }}
                  >
                    &gt;
                  </span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
