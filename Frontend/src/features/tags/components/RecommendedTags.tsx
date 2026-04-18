import useRecommendedTags from "../hooks/UseRecommendedTag";

export default function RecommendedTags({ name }: { name: string | null }) {
  const { isLoading, error, recommendedTags } = useRecommendedTags(name);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div className="text-red-600">Error: {error}</div>;
  }

  return (
    <div className="p-2 flex flex-wrap">
      {recommendedTags.map((value, index) => {
        return(
            <div className="border-1 p-2" key={index}>
                <p>
                    {value.name}
                </p>
            </div>
        )
      })}
    </div>
  );
}
