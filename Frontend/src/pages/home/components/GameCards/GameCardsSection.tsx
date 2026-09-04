import GameCard from "../../../../components/Cards/GameCard";

export default function GameCardsSection() {
  return (
    <section
      className="w-full flex items-stretch gap-2 p-2"
      style={{
        background: "linear-gradient(to bottom, #000000 1%, #ff0000 60%)",
        borderTop: "2px solid #330000",
        borderRight: "2px solid #aa0000",
        borderLeft: "2px solid #aa0000",
        borderBottom: "2px solid #e8b0b0",
      }}
    >
      {/* KARTY */}
      <div className="flex flex-1 items-start gap-2 min-w-0">
        {[1, 2, 3, 4].map((game) => (
          <GameCard key={game} />
        ))}
      </div>

      {/* DUŻY PRZYCISK PO PRAWEJ */}
      <button
        className="flex-none w-[70px] self-stretch"
        style={{
          background: "#222",
          border: "2px solid #555",
        }}
      >
        NEXT
      </button>
    </section>
  );
}