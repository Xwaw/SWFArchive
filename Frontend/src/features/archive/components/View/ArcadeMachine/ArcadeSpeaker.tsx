import { BASE } from "./arcadeMachineConfig";

export default function ArcadeSpeaker() {
  return (
    <div
      className="absolute left-[54%] top-[15%] z-10 aspect-square w-[27%]"
      style={{ perspective: "650px" }}
    >
      <div
        className="relative h-full w-full"
        style={{
          transform: "rotateX(-25deg)",
          filter: "drop-shadow(3px 6px 4px #000b)",
        }}
      >
        <img
          src={`${BASE}/accessories/speaker.png`}
          alt=""
          draggable={false}
          className="block h-full w-full object-contain"
        />
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background: "linear-gradient(to bottom, #000E, #0003)",
            maskImage: `url("${BASE}/accessories/speaker.png")`,
            maskSize: "100% 100%",
            maskRepeat: "no-repeat",
            WebkitMaskImage: `url("${BASE}/accessories/speaker.png")`,
            WebkitMaskSize: "100% 100%",
            WebkitMaskRepeat: "no-repeat",
          }}
        />
      </div>
    </div>
  );
}
