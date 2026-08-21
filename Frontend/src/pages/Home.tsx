import { useNavigate } from "react-router-dom";
import SimpleButton from "../components/Buttons/SimpleButton";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="w-screen min-h-screen bg-black text-white flex flex-col">
      {/* ========================================================= */}
      {/* TOP NAVIGATION                                            */}
      {/* ========================================================= */}

      <div className="w-full h-[35px] flex shrink-0">
        <SimpleButton navigateOnClick="">Home</SimpleButton>
        <SimpleButton navigateOnClick="/archive">Archive</SimpleButton>
        <SimpleButton navigateOnClick="/profile/id">Profile</SimpleButton>
        <SimpleButton navigateOnClick="/library/id">Your Library</SimpleButton>
        <SimpleButton navigateOnClick="/friends/id">Your Friends</SimpleButton>

        <SimpleButton navigateOnClick="/archive/date_leatest" disabled>
          New Releases
        </SimpleButton>

        <SimpleButton navigateOnClick="/page/updates" disabled>
          Page Updates
        </SimpleButton>

        <SimpleButton navigateOnClick="/page/qna" disabled>
          QnA
        </SimpleButton>

        <SimpleButton navigateOnClick="" disabled>
          About
        </SimpleButton>
      </div>

      {/* ========================================================= */}
      {/* HEADER                                                    */}
      {/* ========================================================= */}

      <div className="w-full h-[110px] flex shrink-0">
        {/* LOGO */}

        <div
          className="w-[70%] h-full flex items-center"
          style={{
            background: `linear-gradient(to bottom, #888888 10%, #cccccc 30%, #282828 100%)`,

            borderTop: "2px solid #3b3b3b",
            borderLeft: "2px solid #dddddd",
            borderRight: "2px solid #aaaaaa",
            borderBottom: "2px solid #3b3b3b",
          }}
        >
          <div
            onClick={() => navigate("/about")}
            className="pl-35 pb-2"
            style={{
              fontSize: 40,
              fontFamily: "Robot_Font",
              WebkitTextStroke: "1px black",
            }}
          >
            SWFARCHIVE
          </div>
        </div>

        {/* LOGIN */}

        <div
          className="flex-1 min-w-0 h-full"
          style={{
            background:
              "linear-gradient(to bottom, #ffcccc 5%, #ffffff 25%, #ff0000 70%, #aa0000 90%)",
            borderTop: "2px solid #3b0000",
            borderLeft: "2px solid #ff7777",
            borderRight: "2px solid #ff7777",
            borderBottom: "2px solid #3b0000",
          }}
        >
          <div className="h-full flex justify-center items-center gap-4">
            <div className="flex flex-col gap-0.5">
              <label
                style={{
                  textAlign: "center",
                  fontFamily: "Pixeled",
                  fontSize: 10,
                  color: "black",
                }}
              >
                EMAIL ADDRESS
              </label>
              <input
                  type="text"
                  className="w-[200px] h-[32px] bg-[#858585]
                text-[#000000]
                  border-t-2 border-l-2
                  border-r-2 border-b-2

                border-t-[#444]
                border-l-[#444]
                border-r-[#aaa]
                border-b-[#aaa]

                focus:border-t-[#8b2707]
                focus:border-l-[#8b2707]
                focus:border-r-[#ffd36a]
                focus:border-b-[#ffd36a]

                  focus:bg-[linear-gradient(to_bottom,#ffd36a_0%,#ffb83d_12%,#e98a1c_48%,#c55a0b_70%,#8b2707_100%)]

                  focus:outline-none
                  px-1
                  font-black
                  outline-none"
                  style={{
                    borderRadius: 3,
                  }}
                />
            </div>

            <div className="flex flex-col gap-0.5">
              <label
                className="flex gap-4"
                style={{
                  textAlign: "center",
                  fontFamily: "Pixeled",
                  fontSize: 10,
                  color: "black",
                }}
              >
                PASSWORD{" "}
                <span
                  className="text-[#e61010] hover:[text-shadow:0_0_4px_#ff0000,0_0_10px_#ff0000,0_0_20px_#ff0000] hover:text-[#ff0000]
                  cursor-pointer"
                >
                  FORGOT IT?
                </span>
              </label>
              <div className="flex">
                <input
                  type="text"
                  className="w-[150px] h-[32px] bg-[#858585]
                text-[#000000]
                  border-t-2 border-l-2
                  border-r-2 border-b-2

                border-t-[#444]
                border-l-[#444]
                border-r-[#aaa]
                border-b-[#aaa]

                focus:border-t-[#8b2707]
                focus:border-l-[#8b2707]
                focus:border-r-[#ffd36a]
                focus:border-b-[#ffd36a]

                  focus:bg-[linear-gradient(to_bottom,#ffd36a_0%,#ffb83d_12%,#e98a1c_48%,#c55a0b_70%,#8b2707_100%)]

                  focus:outline-none
                  px-1
                  font-black
                  outline-none"
                  style={{
                    borderRadius: 3,
                  }}
                />
                <button
                  className="
                    h-[32px]
                    px-3
                    cursor-pointer
                    hover:brightness-110
                    active:brightness-90
                  "
                  style={{
                    borderRadius: 5,
                    fontFamily: "Pixeled",
                    fontSize: 10,
                    fontWeight: 700,
                    color: "#fff1b0",

                    background: `
                      linear-gradient(
                        to bottom,
                        #ffd36a 0%,
                        #ffb83d 12%,
                        #e98a1c 48%,
                        #c55a0b 70%,
                        #8b2707 100%
                      )
                    `,

                    borderTop: "2px solid #ffe39a",
                    borderLeft: "2px solid #c56a16",
                    borderRight: "2px solid #6e1b08",
                    borderBottom: "3px solid #641507",

                    WebkitTextStroke: "0.3px #9b4b0b",
                    textShadow: "0 1px 1px #7a2600",
                  }}
                >
                  LOGIN
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================= */}
      {/* MAIN 3 COLUMN LAYOUT                                      */}
      {/* ========================================================= */}

      <div
        className="w-full flex items-stretch gap-1"
        style={{
          background: `linear-gradient(to bottom, #000000 0.1%, #de3334 1%)`,
        }}
      >
        {/* ======================================================= */}
        {/* LEFT SIDEBAR                                            */}
        {/* ======================================================= */}

        <aside
          className="w-[230px] shrink-0 flex flex-col gap-1 border-1"
          style={{
            background: "linear-gradient(to right, #eb1e20 10%, #de3334 90%)",
            borderTop: "2px solid #650000",
            borderLeft: "2px solid #e8b0b0",
            borderRight: "2px solid #650000",
            borderBottom: "2px solid #3b0000",
          }}
        >
          {/* ABOUT */}

          <div className="w-full border border-white">
            <div className="border border-red-500">ABOUT</div>

            <div className="flex flex-col border border-blue-500">
              <p>{">"} Example</p>
              <p>{">"} Example</p>
              <p>{">"} Example</p>
              <p>{">"} Example</p>
            </div>
          </div>

          {/* FIND GAMES */}

          <div className="w-full border border-white">
            <div className="border border-red-500">FIND GAMES</div>

            <div className="flex flex-col border border-blue-500">
              <p>{">"} New Releases</p>
              <p>{">"} Top Rated</p>
              <p>{">"} Most Popular</p>
              <p>{">"} Search</p>
            </div>
          </div>

          {/* GENRES */}

          <div className="w-full border border-white">
            <div className="border border-red-500">GENRES</div>

            <div className="flex flex-col border border-blue-500">
              <p>{">"} Action</p>
              <p>{">"} Adventure</p>
              <p>{">"} Shooter</p>
              <p>{">"} Puzzle</p>
              <p>{">"} Strategy</p>
            </div>
          </div>

          {/* USER */}

          <div className="w-full border border-white">
            <div className="border border-red-500">YOUR ACCOUNT</div>

            <div className="flex flex-col border border-blue-500">
              <p>{">"} Profile</p>
              <p>{">"} Library</p>
              <p>{">"} Friends</p>
              <p>{">"} Badges</p>
            </div>
          </div>

          {/* SEARCH */}

          <div className="w-full border border-white p-1">
            <p>SEARCH</p>

            <div className="w-full flex border border-green-500">
              <input
                className="flex-1 min-w-0 text-black"
                placeholder="Search..."
              />

              <button className="shrink-0 border border-white">GO</button>
            </div>
          </div>
        </aside>

        {/* ======================================================= */}
        {/* CENTER                                                  */}
        {/* ======================================================= */}

        <main className="flex-1 min-w-0 flex flex-col gap-2 pt-10 border-1">
          {/* ===================================================== */}
          {/* FEATURED GAME                                         */}
          {/* ===================================================== */}

          <section className="w-full h-[300px] flex border border-white">
            {/* GAME BANNER */}

            <div className="w-[75%] h-full flex flex-col border border-red-500">
              <div className="flex-1 min-h-0 border border-blue-500">
                GAME BANNER
              </div>

              <div className="h-[45px] shrink-0 border border-yellow-500">
                GAME BANNER INFO
              </div>
            </div>

            {/* NEWS / ABOUT */}

            <div className="flex-1 min-w-[180px] h-full flex flex-col border border-green-500">
              <div className="h-[30px] shrink-0 border border-red-500">
                ABOUT / NEWS
              </div>

              <div className="flex-1 min-h-0 border border-blue-500">
                <p>{">"} Example</p>
                <p>{">"} Example</p>
                <p>{">"} Example</p>
                <p>{">"} Example</p>
              </div>
            </div>
          </section>

          {/* ===================================================== */}
          {/* GAME CARDS                                            */}
          {/* ===================================================== */}

          <section
            className="w-full h-[300px] flex gap-2 p-2"
            style={{
              background: "linear-gradient(to bottom, #000000 1%, #ff0000 60%)",
              border: 1,
              borderTop: "2px solid #330000",
              borderRight: "2px solid #aa0000",
              borderLeft: "2px solid #aa0000",
              borderBottom: "2px solid #e8b0b0",
            }}
          >
            {[1, 2, 3, 4].map((game) => (
              <div
                key={game}
                className="flex-1 min-w-0 h-full flex flex-col"
                style={{
                  backgroundImage: `url("/test/images/banners/test1.png")`,
                  backgroundPosition: "center",
                  backgroundSize: "cover",
                  WebkitTextStroke: "0.5px black",
                }}
              >
                <div
                  className="h-[15%] shrink-0"
                  style={{ textAlign: "center" }}
                >
                  Flash
                </div>

                <div className="flex-1 min-h-0" style={{ textAlign: "center" }}>
                  IMAGE
                </div>

                <div
                  className="h-[20%] shrink-0"
                  style={{ textAlign: "center" }}
                >
                  GAME INFO
                </div>
              </div>
            ))}
          </section>

          {/* ===================================================== */}
          {/* QUICK EVENTS                                          */}
          {/* ===================================================== */}

          <section
            className="w-full"
            style={{
              background: "linear-gradient(to bottom, #000000 1%, #AA0000 80%)",
              border: 1,
              borderTop: "2px solid #450000",
              borderLeft: "2px solid #450000",
              borderRight: "2px solid #450000",
              borderBottom: "2px solid #e8b0b0",
            }}
          >
            <div className="w-full text-center">
              <span
                style={{
                  fontFamily: "Gamez",
                  color: "#FF0000",
                  WebkitTextStroke: "1px black",
                }}
              >
                JUMP BACK INTO YOUR ACTIONS
              </span>
            </div>

            <div className="w-full h-[80px] flex justify-evenly items-center">
              {[1, 2, 3, 4, 5].map((event) => (
                <div
                  key={event}
                  className="h-full aspect-square flex items-center justify-center"
                  style={{
                    backgroundImage: `url("/test/images/3d/iconcube.png")`,
                    backgroundSize: "contain",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                  }}
                />
              ))}
            </div>
          </section>

          {/* ===================================================== */}
          {/* EXCLUSIVE                                             */}
          {/* ===================================================== */}

          <section className="w-full h-[350px] flex bg-black" style={{
            border: 1,
            borderTop: "2px solid #770000",
            borderLeft: "2px solid #770000",
            borderRight: "2px solid #AA9999",
            borderBottom: "2px solid #770000",
          }}>
            <div className="w-[45%] h-full flex">
              <div className="flex-1 min-w-0 h-full" style={{
                backgroundImage: "url('/test/images/banners/test1.png')"
              }}>
                <div className="w-[3%] h-full flex items-center justify-center overflow-hidden">
                  <p className="-rotate-90 whitespace-nowrap" style={{
                    fontFamily: "Robot_Font",
                    WebkitTextStroke: "0.7px black"
                  }}>
                    SEE MORE ON <span style={{fontFamily: "Gamez", color: "red", WebkitTextStrokeColor: "orange"}}>SWFARCHIVE</span>
                  </p>
                </div>
              </div>
            </div>

            <div className="flex-1 min-w-0 h-full p-2">
              ARTICLE / TEXT
            </div>
          </section>

          {/* ===================================================== */}
          {/* SECOND CONTENT BLOCK                                  */}
          {/* ===================================================== */}

          <section className="w-full h-[250px] flex border border-white">
            <div className="w-[20%] h-full border border-red-500">IMAGE</div>

            <div className="w-[55%] h-full border border-blue-500">CONTENT</div>

            <div className="flex-1 min-w-0 h-full border border-yellow-500">
              IMAGE / EXTRA
            </div>
          </section>

          {/* ===================================================== */}
          {/* THIRD CONTENT BLOCK                                   */}
          {/* ===================================================== */}

          <section className="w-full h-[250px] flex border border-white">
            <div className="w-[40%] h-full border border-red-500 p-2">
              CONTENT LEFT
            </div>

            <div className="flex-1 min-w-0 h-full border border-blue-500 p-2">
              CONTENT RIGHT
            </div>
          </section>

          {/* ===================================================== */}
          {/* TOP 10                                                */}
          {/* ===================================================== */}

          <section className="w-full border border-white">
            {/* TABS */}

            <div className="w-full h-[120px] border border-red-500">TABS</div>

            {/* INFO TITLE */}

            <div className="w-full h-[30px] border border-blue-500">
              INFO TITLE
            </div>

            {/* =================================================== */}
            {/* #1 GAME — YOUR ORIGINAL LAYOUT                      */}
            {/* =================================================== */}

            <div className="w-full h-[350px] flex border border-yellow-500">
              {/* GAME INFORMATION */}

              <div className="w-[70%] h-full flex flex-col items-center justify-center border border-red-500">
                <p className="w-full h-[10%] flex justify-center items-center">
                  TODAY'S GAME #1
                </p>

                <div className="w-full h-[15%] flex flex-col justify-center items-center p-2 border border-blue-500">
                  <p>GAME TITLE GAME TITLE</p>
                </div>

                <div className="w-[87%] h-[1px] bg-white" />

                <div className="flex flex-col w-full">
                  <div className="flex justify-start pl-15 p-3">
                    <p className="w-1/2">Publisher: EXAMPLE_NAME</p>

                    <p className="flex-1">Developer: EXAMPLE_NAME_DEV</p>
                  </div>

                  <div className="w-[87%] border-t border-dashed border-white self-center" />

                  <div className="flex justify-start pl-15 p-3">
                    <p className="w-1/2">Release: 00/00/0000</p>

                    <p className="flex-1">Genre: EXAMPLE_GENRE</p>
                  </div>

                  <div className="w-[87%] border-t border-dashed border-white self-center" />

                  <div className="flex justify-start pl-15 p-3 font-bold">
                    <p>
                      Score: <span>8.3</span>
                    </p>
                  </div>
                </div>

                <div className="w-[87%] h-[1px] bg-white" />

                <div className="w-full h-[7%] flex gap-5 pl-15 pt-3">
                  <p
                    onClick={() => {
                      navigate("/archive/view/id");
                    }}
                  >
                    View Game
                  </p>

                  <p
                    onClick={() => {
                      navigate("/profile/view/id");
                    }}
                  >
                    View Publisher Profile
                  </p>

                  <p
                    onClick={() => {
                      navigate("/addToLibrary_lmao");
                    }}
                  >
                    Add To Library
                  </p>
                </div>
              </div>

              {/* GAME BOX */}

              <div className="flex-1 h-full flex items-center justify-center border border-blue-500">
                <div className="w-[200px] h-[280px] border border-white">
                  GAME BOX
                </div>
              </div>
            </div>

            {/* =================================================== */}
            {/* #2 - #10 — YOUR ORIGINAL TABLE                      */}
            {/* =================================================== */}

            <div className="w-full h-[800px] grid grid-rows-9 border border-green-500">
              {[2, 3, 4, 5, 6, 7, 8, 9, 10].map((position) => (
                <div key={position} className="w-full flex border border-white">
                  {/* POSITION */}

                  <div className="w-[4%] flex justify-center items-center border border-red-500">
                    <p>{position}</p>
                  </div>

                  {/* GAME */}

                  <div className="flex-1 min-w-0 flex flex-col p-3 pl-5 border border-blue-500">
                    <p>TITLE GAME: SPAAAAAAAAAAAAN</p>

                    <span>Publisher: Xwaw | 6.9 Score | Action Game</span>
                  </div>

                  {/* RELEASE */}

                  <div className="w-[13%] shrink-0 flex flex-col justify-center items-center text-center border border-yellow-500">
                    <span>release:</span>

                    <span>08/05/2020</span>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </main>

        {/* ======================================================= */}
        {/* RIGHT SIDEBAR                                           */}
        {/* ======================================================= */}

        <aside className="w-[300px] shrink-0 flex flex-col gap-1 border border-purple-500">
          {/* PANEL */}

          <div className="w-full border border-white">
            <div className="border border-red-500">RECENT UPDATES</div>

            <div className="border border-blue-500">
              <p>{">"} Update</p>
              <p>{">"} Update</p>
              <p>{">"} Update</p>
              <p>{">"} Update</p>
            </div>
          </div>

          {/* PANEL */}

          <div className="w-full border border-white">
            <div className="border border-red-500">MOST PLAYED</div>

            <div className="border border-blue-500">
              <p>{">"} Game</p>
              <p>{">"} Game</p>
              <p>{">"} Game</p>
              <p>{">"} Game</p>
            </div>
          </div>

          {/* BIG PLACEHOLDER */}

          <div className="w-full h-[400px] border border-yellow-500">
            PROMO / IMAGE / SOMETHING
          </div>

          {/* PANEL */}

          <div className="w-full border border-white">
            <div className="border border-red-500">NEW GAMES</div>

            <div className="border border-blue-500">
              <p>{">"} Game</p>
              <p>{">"} Game</p>
              <p>{">"} Game</p>
              <p>{">"} Game</p>
            </div>
          </div>
        </aside>
      </div>

      {/* ========================================================= */}
      {/* FOOTER                                                    */}
      {/* ========================================================= */}

      <footer className="w-full border border-white">
        <div className="w-full h-[40px] flex justify-center items-center gap-6 border border-red-500">
          <span>News</span>
          <span>All Games</span>
          <span>Archive</span>
          <span>Community</span>
          <span>Profiles</span>
          <span>Forums</span>
          <span>About</span>
        </div>

        <div className="w-full h-[30px] flex justify-center items-center border border-blue-500">
          SWFArchive
        </div>
      </footer>
    </div>
  );
}
