import { useState } from "react";
import type { TagInputProps } from "../types/props";
import TagItem from "./TagItem";
import RecommendedTags from "./RecommendedTags";

export default function TagInput({
  tags,
  onAddTag,
  onRemoveTag,
}: TagInputProps) {
  const [input, setInput] = useState("");

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();

      if (!input.trim()) return;

      const exists = tags.some(
        (tag) => tag.name.toLowerCase() === input.toLowerCase(),
      );

      if (exists) {
        setInput("");
        return;
      }
    }

    if (e.key === "Backspace" && input === "" && tags.length > 0) {
      const lastTag = tags[tags.length - 1];
      onRemoveTag(lastTag.id);
    }
  };

  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((tag) => (
        <TagItem
          key={tag.id}
          onRemove={() => {
            onRemoveTag(tag.id);
          }}
        >
          {tag.name}
        </TagItem>
      ))}

      <div className="flex flex-col w-full">
        <input
          value={input}
          placeholder="Type to search tags..."
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className="border border-white focus:outline-none focus:ring-2 focus:ring-yellow-500"
        />

        <RecommendedTags
          query={input}
          onSelectTag={(tag) => {
            const exists = tags.some((t) => t.id === tag.id);
            console.log("recA")
            if (exists) return;

            console.log("recB")
            onAddTag(tag);
            console.log(tag)
            console.log("recC")
            setInput("");
          }}
        />
      </div>
    </div>
  );
}
