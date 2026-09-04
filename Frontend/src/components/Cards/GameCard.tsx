export default function GameCard() {

  return (
    <div
      className="flex-1 min-w-0 aspect-square flex flex-col"
      style={{
        backgroundImage: `url("/images/gamecards/red.png")`,
        backgroundPosition: "center",
        backgroundSize: "100% 100%",
        backgroundRepeat: "no-repeat"
      }}
    >
      <div className="h-[19%] p-1 shrink-0 text-center whitespace-nowrap overflow-hidden text-ellipsis" style={{
        fontSize: "28px",
        fontFamily: "Verdana"
      }}>
        ZombiefireRod3
      </div>

      <div className="flex-1 min-h-0 flex justify-center items-center overflow-hidden">
        <img
          className="max-w-[92%] max-h-[100%] object-contain"
          src="/test/images/banners/1.png"
          alt=""
        />
      </div>

      <div className="h-[25%] w-[100%] shrink-0 text-center p-3" style={{
        fontSize: "17px",
        fontFamily: "Verdana"
      }}>
        Super Crazy Guitar Maniac Deluxe 3
      </div>
    </div>
  );
}