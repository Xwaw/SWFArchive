export default function RankingsTabs() {
  return (
    <div
      style={{
        background: "linear-gradient(to top, darkred, black)",
      }}
    >
      <div className="w-full h-[120px] flex items-end justify-center gap-[2%] px-[1%]">
        <div
          className="h-[80px]"
          style={{
            width: "21%",
            backgroundImage: `url("/images/buttons/tabs/normal.png")`,
            backgroundSize: "100% 100%",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center bottom",
          }}
        >
          <p className="w-full h-full flex justify-center items-center" style={{
            fontFamily: "Gamez",
            color: "blak",
            fontSize: "20px"
          }}>OVERALL</p>
        </div>

        <div
          className="h-[80px]"
          style={{
            width: "21%",
            backgroundImage: `url("/images/buttons/tabs/blocked.png")`,
            backgroundSize: "100% 100%",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center bottom",
          }}
        >
          <p className="w-full h-full flex justify-center items-center" style={{
            fontFamily: "Gamez",
            color: "blak",
            fontSize: "20px"
          }}>TODAY</p>
        </div>

        <div
          className="h-[80px]"
          style={{
            width: "21%",
            backgroundImage: `url("/images/buttons/tabs/blocked.png")`,
            backgroundSize: "100% 100%",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center bottom",
          }}
        >
          <p className="w-full h-full flex justify-center items-center" style={{
            fontFamily: "Gamez",
            color: "blak",
            fontSize: "20px"
          }}>THIS MONTH</p>
        </div>

        <div
          className="h-[80px]"
          style={{
            width: "21%",
            backgroundImage: `url("/images/buttons/tabs/blocked.png")`,
            backgroundSize: "100% 100%",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center bottom",
          }}
        >
          <p className="w-full h-full flex justify-center items-center" style={{
            fontFamily: "Gamez",
            color: "blak",
            fontSize: "20px"
          }}>THIS YEAR</p>
        </div>
      </div>

      <div
        className="w-full h-[32px] flex items-center px-2"
        style={{
          background:
            "linear-gradient(to bottom, #555 0%, #353535 50%, #272727 100%)",
          borderTop: "1px solid #777",
          borderBottom: "2px solid #111",
          color: "#888",
          fontSize: 14,
        }}
      >
        Rankings based on information requests on SWFArchive
      </div>
    </div>
  );
}