import { Link } from "react-router-dom";
import useRecommendedTags from "../../../tags/hooks/UseRecommendedTag";

export default function GameTagLinks({ tags }: { tags: string[] }) {
  const { recommendedTags } = useRecommendedTags(null);

  return (
    <div className="archive-game-tags flex flex-wrap gap-2 mt-3">
      {tags.map((name) => {
        const tag = recommendedTags.find((item) => item.name === name);
        return tag ? (
          <Link key={name} to={`/archive?${new URLSearchParams({ tagIds: tag.id })}`}>
            {name}
          </Link>
        ) : <span key={name}>{name}</span>;
      })}
    </div>
  );
}
