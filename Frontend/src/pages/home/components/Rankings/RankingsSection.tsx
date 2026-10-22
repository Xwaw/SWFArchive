
import { useEffect, useState } from "react"; // Dostosuj ścieżkę
import FeaturedRankingGame from "./FeaturedRankingGame";
import RankingGameRow from "./RankingGameRow";
import RankingsTabs from "./RankingsTabs";
import { archiveService } from "../../../../features/archive/services/ArchiveService";

export interface RankingGame {
  id: string;
  title: string;
  authorName: string;
  playsCount: number;
  ratingAverage: number;
  thumbnailUrl: string | null;
  uploaded: string;
}

export type RankingType = "overall" | "today" | "month" | "year";

export default function RankingsSection() {
  const [type, setType] = useState<RankingType>("overall");
  const [games, setGames] = useState<RankingGame[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    const fetchTopGames = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const data: RankingGame[] =
          await archiveService.GetTopGames(type);

        if (!cancelled) {
          setGames(data);
        }
      } catch (error) {
        if (!cancelled) {
          console.error(error);
          setError("Failed to load rankings.");
        }
      } finally {
        if (!cancelled) {
          setIsLoading(false);
        }
      }
    };

    fetchTopGames();

    return () => {
      cancelled = true;
    };
  }, [type]);

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
      <RankingsTabs
        selectedType={type}
        onTypeChange={setType}
      />

      {isLoading ? (
        <div className="h-[700px] flex items-center justify-center">
          Loading rankings...
        </div>
      ) : error ? (
        <div className="h-[700px] flex items-center justify-center text-red-500">
          {error}
        </div>
      ) : games.length === 0 ? (
        <div className="h-[700px] flex items-center justify-center">
          No games found.
        </div>
      ) : (
        <>
          <FeaturedRankingGame game={games[0]} />

          <div className="w-full h-[700px] grid grid-rows-9">
            {games.slice(1, 10).map((game, index) => (
              <RankingGameRow
                key={game.id}
                game={{ ...game, position: index + 2 }}
              />
            ))}
          </div>
        </>
      )}
    </section>
  );
}
