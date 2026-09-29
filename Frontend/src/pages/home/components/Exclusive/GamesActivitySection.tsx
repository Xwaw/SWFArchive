import GameCardsSection from "../GameCards/GameCardsSection";
import QuickActionsSection from "../QuickActions/QuickActionsSection";

export default function GamesActivitySection() {
  return (
    <section
      className="relative w-full"
      style={{
        aspectRatio: "1399 / 493",
        backgroundImage: `url("/images/sections/game_activity.png")`,
        backgroundSize: "100% 100%",
        backgroundRepeat: "no-repeat",
      }}
    >
      {/* GAME CARDS */}
      <div
        className="absolute"
        style={{
          left: "1.6%",
          top: "5.5%",
          width: "96.8%",
          height: "63%",
        }}
      >
        <GameCardsSection />
      </div>

      {/* QUICK ACTIONS */}
      <div
        className="absolute"
        style={{
          left: "2.2%",
          top: "76%",
          width: "66%",
          height: "18%",
        }}
      >
        <QuickActionsSection />
      </div>

      {/* EVENTS */}
      <div
        className="absolute flex items-center justify-center"
        style={{
          left: "70.5%",
          top: "73.5%",
          width: "28%",
          height: "24%",
        }}
      >
        <span
          className="whitespace-nowrap"
          style={{
            fontFamily: "Gamez",
            fontSize: "clamp(16px, 2.2vw, 36px)",
            color: "#ffffff",
          }}
        >
          &lt; EVENTS
        </span>
      </div>
    </section>
  );
}