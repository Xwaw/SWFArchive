import Button from "../../../../components/Buttons/Button";

export default function LoginHeader() {
  const isUser = false;

  return (
    <div
      className="relative flex-1 min-w-0 h-full overflow-hidden bg-center bg-cover bg-no-repeat"
      style={{
        backgroundImage: `url("${
          isUser
            ? "/test/images/banners/1.png"
            : "/images/bannerLoginPanel2.png"
        }")`,
      }}
    >
      <img
        src="/images/bannerLoginPanel.png"
        alt=""
        draggable={false}
        className="absolute left-0 top-0 h-full select-none pointer-events-none"
        style={{
          filter: "drop-shadow(5px 0 8px rgba(0,0,0,0.65))",
        }}
      />

      <div className="relative z-10 flex justify-end items-center w-full h-full">
        {isUser ? (
          <div className="flex justify-end items-center w-[60%] p-2 gap-5">
            <div className="flex flex-col items-end w-full text-right">
              <span
                className="text-2xl font-bold underline hover:text-3xl hover:text-red-600 cursor-pointer"
                style={{
                  fontFamily: '"Trebuchet MS", Arial, sans-serif',
                  WebkitTextStroke: "1px #111",
                  textShadow: `
                    1px 1px 0 #111,
                    2px 2px 0 #111,
                    0 0 5px rgba(0, 0, 0, 0.7)
                  `,
                }}
                onClick={() => console.log("profile")}
              >
                Xwaw
              </span>
              <span className="text-orange-400 hover:underline cursor-pointer hover:text-yellow-400">Press F13 to see title!</span>
            </div>

            <div className="relative w-[25%] aspect-square shrink-0">
              <div
                className="
                  w-full h-full
                  hover:border-red-600
                  cursor-pointer
                "
                style={{
                  backgroundImage: `url("/test/images/banners/1.png")`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  borderLeft: "5px solid #151515",
                  borderRight: "5px solid #888888",
                  borderTop: "5px solid #151515",
                  borderBottom: "5px solid #888888",
                }}
                onClick={() => console.log("profile")}
              />

              <div
                className="
                  absolute
                  -top-2
                  -left-2
                  w-7 h-7
                  border-2 border-black
                  flex items-center justify-center
                  font-bold
                  text-black
                  z-10
                "
                style={{
                  background: `
                    radial-gradient(
                      circle at center,
                      #fffca8 0%,
                      #fff200 25%,
                      #ffc400 55%,
                      #ff8a00 80%,
                      #d94b00 100%
                    )
                  `,
                  boxShadow: `
                    0 0 4px #ffea00,
                    0 0 8px rgba(255, 166, 0, 0.8)
                  `,
                }}
                title="Veteran"
              >
                <div
                  className="
                    w-full h-full
                    hover:border-red-600
                    cursor-pointer
                  "
                  style={{
                    backgroundImage: `url("/test/badges/3.gif")`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                  onClick={() => console.log("profile")}
                />
              </div>

              <div
                className="
                  absolute
                  -right-1
                  -bottom-1
                  px-1.5
                  py-[1px]
                  bg-black
                  border border-white
                  text-[10px]
                  whitespace-nowrap
                  z-10
                "
                style={{
                  fontFamily: "Tahoma, Arial, sans-serif",
                  textShadow: "1px 1px 0 #000",
                }}
              >
                <span className="text-lime-400">●</span>
                <span className="text-white">Online</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex items-center w-[60%] p-2 gap-2">
            <div className="flex flex-col w-[50%] min-w-0">
              <p
                className="p-1 overflow-hidden"
                style={{
                  fontFamily: "Pixeled",
                  fontSize: 10,
                  color: "#252525",
                }}
              >
                E-MAIL ADDRESS
              </p>

              <input
                type="email"
                placeholder="example@yahoo.com"
                className="
                w-full
                min-w-0
                text-black
                border border-black
                bg-white
                rounded-[4px]
                outline-none
                focus:outline-none
                focus:ring-0
              "
              />
            </div>

            <div className="flex flex-col flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <p
                  className="p-1 overflow-hidden"
                  style={{
                    fontFamily: "Pixeled",
                    fontSize: 10,
                    color: "#252525",
                  }}
                >
                  PASSWORD
                </p>

                <div
                  className="
                  text-[0.45rem]
                  text-[#b11d1d]
                  cursor-pointer
                  whitespace-nowrap
                  transition-all
                  hover:text-[#ff3030]
                  hover:[text-shadow:0_0_5px_#ff2020]
                "
                  style={{
                    fontFamily: "Pixeled",
                  }}
                  onClick={() => {
                    console.log("no problem :D");
                  }}
                >
                  Forgot it?
                </div>
              </div>

              <div className="flex w-full min-w-0 items-center">
                <input
                  type="password"
                  placeholder="********"
                  className="
                flex-1
                min-w-0
                text-black
                border
                border-black
                bg-white
                rounded-[4px]
                outline-none
                focus:outline-none
                focus:ring-0
                "
                />

                <Button style="login" width="3.2rem" height="1.6rem">
                  <p
                    className="text-[0.55rem] text-[#f3f598]"
                    style={{
                      textShadow: "1px 1px 0 #000",
                      fontFamily: "Pixeled",
                    }}
                  >
                    LOGIN
                  </p>
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
