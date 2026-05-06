import useRecommendedTags from "../hooks/UseRecommendedTag";
import type { RecommendedTagsProps } from "../types/props";

export default function RecommendedTags({ query, onSelectTag }: RecommendedTagsProps) {
  const { isLoading, error, recommendedTags } = useRecommendedTags(query);

  if (!query.trim()) return null;

  if (isLoading) {
    return <div>Searching...</div>;
  }

  if (error) {
    return <div className="text-red-600">Error: {error}</div>;
  }

  return (
    <div className="p-2 flex flex-wrap gap-2">
      {recommendedTags.map((value) => (
        <div
          key={value.id}
          className="border border-yellow-600 p-2 cursor-pointer hover:bg-yellow-200"
          onClick={() => onSelectTag(value)}
        >
          <p>{value.name}</p>
        </div>
      ))}
    </div>
  );
}
