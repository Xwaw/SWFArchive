import { BASE } from "./arcadeMachineConfig";

type ArcadeDisplayProps = {
  rating: number;
  downloaded: number;
};

export default function ArcadeDisplay({ rating, downloaded }: ArcadeDisplayProps) {
  const displays = [
    { value: Math.max(0, Math.trunc(downloaded)).toString().padStart(7, "0") },
    { value: rating.toFixed(5) },
  ];

  return (
    <div
      className="absolute left-1/2 top-[37%] z-20 flex w-full -translate-x-1/2 items-center justify-center gap-[4%]"
      style={{ containerType: "inline-size" }}
    >
      {displays.map(({ value }, display) => (
        <div
          key={display}
          className="max-w-full flex-none whitespace-nowrap px-[0.55em] py-[0.28em] text-[#c8d8c8] leading-none"
          style={{
            fontFamily: "Timer",
            fontSize: "clamp(14px, 5.8cqw, 80px)",
            textShadow: "0 0 4px #66ff66",
            backgroundImage: `linear-gradient(to bottom, #0003 0%, transparent 50%, #0009 100%), url("${BASE}/accessories/seven_digit_screen.png")`,
            backgroundSize: "100% 100%",
            backgroundRepeat: "no-repeat, no-repeat",
            filter: "drop-shadow(0 3px 4px #0009)",
          }}
        >
          <span
            className="relative inline-flex"
            style={{ transform: "skewX(-10deg)" }}
          >
            {Array.from(value, (character, index) => (
              <span
                key={`${display}-${index}`}
                className="relative inline-flex shrink-0 justify-center"
                style={{ width: character === "." ? "0.35ch" : "1ch" }}
              >
                <span
                  aria-hidden="true"
                  className="absolute inset-0 text-center"
                  style={{
                    color: "#26372c",
                    textShadow: "none",
                    WebkitTextStroke: "0.035em #26372c",
                  }}
                >
                  {character === "." ? "." : "8"}
                </span>
                <span
                  className="relative"
                  style={{
                    WebkitTextStroke: "0.04em #e5ece5",
                    textShadow: "0 0 4px #66ff66, 0 0 8px #22ff22",
                  }}
                >
                  {character}
                </span>
              </span>
            ))}
          </span>
        </div>
      ))}
    </div>
  );
}
