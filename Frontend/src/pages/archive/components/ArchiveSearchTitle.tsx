import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { tagService } from "../../../features/tags/services/TagService";
import type { RecommendedTag } from "../../../features/tags/types/props";

const sortLabels: Record<string, string> = {
  date: "Date",
  newest: "Newest",
  popularity: "Popularity",
  rating: "Rating",
  random: "Random",
};

export default function ArchiveSearchTitle() {
  const [params] = useSearchParams();
  const [tags, setTags] = useState<RecommendedTag[]>([]);
  const selectedTagIds = params.getAll("tagIds").filter(Boolean);
  const hasTags = selectedTagIds.length > 0;

  useEffect(() => {
    if (!hasTags) return;
    let active = true;
    void tagService.getAllTags(null).then((result) => {
      if (active) setTags(result ?? []);
    }).catch(() => {
      if (active) setTags([]);
    });
    return () => { active = false; };
  }, [hasTags]);

  const details: string[] = [];
  const search = params.get("search")?.trim();
  const sortBy = params.get("sortBy");
  if (search) details.push(`Search: “${search}”`);
  if (hasTags) {
    const names = selectedTagIds.map((id) => tags.find((tag) => tag.id === id)?.name);
    details.push(names.every(Boolean)
      ? `Tags: ${names.join(", ")}`
      : `Tags: ${selectedTagIds.length} selected`);
  }
  if (sortBy && sortLabels[sortBy]) details.push(`Sort by: ${sortLabels[sortBy]}`);

  return (
    <h1 className="archive-section-title">
      <span>
        <span className="archive-title-label">All Games</span>
        {details.length > 0 && (
          <span className="archive-search-summary">{details.join(" · ")}</span>
        )}
      </span>
    </h1>
  );
}
