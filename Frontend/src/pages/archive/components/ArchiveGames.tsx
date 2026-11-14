import LoadingIndicator from "../../../components/LoadingIndicator";
import { useSearchParams } from "react-router-dom";
import GameCard from "../../../components/Cards/GameCard";
import useArchive from "../../../features/archive/hooks/UseArchive";
import "./archive-games.css";

export default function ArchiveGames() {
  const [searchParams] = useSearchParams();

  const search = searchParams.get("search") || undefined;
  const sortBy = searchParams.get("sortBy") || undefined;
  const tagIds = searchParams.getAll("tagIds").join(",") || undefined;

  const { archive, isLoading, error } = useArchive(search, sortBy, tagIds);

  return (
    <div className="archive-games w-full h-full flex flex-col gap-2 overflow-y-auto">
      {isLoading && !archive ? (
        <div className="archive-games-list-loading w-full h-full flex justify-center items-center">
          <LoadingIndicator size={144} showLabel />
        </div>
      ) : error ? (
        <div className="archive-games-list-error w-full h-full flex justify-center items-center">
          <p>{error}</p>
        </div>
      ) : archive?.items.length === 0 ? (
        <div className="archive-games-list-empty w-full h-full flex justify-center items-center">
          <p>No games found</p>
        </div>
      ) : (
        <div className="archive-games-list w-full h-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 p-5">
          {archive?.items.map((game) => (
            <GameCard key={game.id} game={game} />
          ))}
        </div>
      )}
      {isLoading && archive && <LoadingIndicator size={144} showLabel />}
    </div>
  );
}
