import { rankingGames } from "../../data/rankings";
import FeaturedRankingGame from "./FeaturedRankingGame";
import RankingGameRow from "./RankingGameRow";
import RankingsTabs from "./RankingsTabs";

export default function RankingsSection() {
  return (
    <section
      className="w-full overflow-hidden"
      style={{
        background: "#050505",
        borderLeft: "2px solid #d71920",
        borderRight: "2px solid #d71920",
        borderBottom: "2px solid #d71920",
      }}
    >
      <RankingsTabs />
      <FeaturedRankingGame />

      <div className="w-full h-[1000px] grid grid-rows-9">
        {rankingGames.map((game) => (
          <RankingGameRow key={game.position} game={game} />
        ))}
      </div>
    </section>
  );
}
