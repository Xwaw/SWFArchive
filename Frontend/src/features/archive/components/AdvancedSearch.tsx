import { useState } from "react";
import useRecommendedTags from "../../tags/hooks/UseRecommendedTag";



export default function AdvancedSearch() {
  const [searchTag, setSearchTag] = useState<string>("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const { recommendedTags, isLoading, error } = useRecommendedTags(searchTag);

  const handleTagChange = (tagId: string) => {
    setSelectedTags((prevSelectedTags) => {
      if (prevSelectedTags.includes(tagId)) {
        return prevSelectedTags.filter((id) => id !== tagId);
      } else {
        return [...prevSelectedTags, tagId];
      }
    });
  };

  return (
    <div className="w-full flex flex-col gap-2 p-2">
      <div className="flex flex-col gap-1">
        <label htmlFor="sortBy" className="text-sm">
          Sort By
        </label>

        <select
          id="sortBy"
          name="sortBy"
          defaultValue=""
          className="w-full bg-white text-black border border-black rounded"
        >
          <option value="">Title</option>
          <option value="date">Date</option>
          <option value="popularity">Popularity</option>
          <option value="rating">Rating</option>
          <option value="random">Random</option>
        </select>
      </div>

      <div className="flex flex-col gap-1">
        <span className="text-sm">Tags</span>

        <div className="w-full h-full flex p-2 gap-2">
          <input
            value={searchTag}
            onChange={(e) => setSearchTag(e.target.value)}
            className="flex-1 min-w-0 text-black border border-black bg-white outline-none focus:outline-none"
            placeholder="Search By Tag"
            style={{
              borderRadius: "4px",
            }}
          />
        </div>

        {
          isLoading ? (
            <p>Loading...</p>
          ) : !isLoading && recommendedTags.length === 0 && !error ? (
            <p>No tags found</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : (
            <div className="flex flex-col gap-1">
              {recommendedTags.map((tag) => (
                <div
                  key={tag.id}
                  className="flex items-center gap-2"
                >
                  <input
                    type="checkbox"
                    name="tagIds"
                    value={tag.id}
                    id={`tag-${tag.id}`}
                    className="form-checkbox"
                    checked={selectedTags.includes(tag.id)}
                    onChange={() => handleTagChange(tag.id)}
                  />
                  <label htmlFor={`tag-${tag.id}`}>{tag.name}</label>
                </div>
              ))}
            </div>
          )
        }
      </div>
    </div>
  );
}