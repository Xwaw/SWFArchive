import { useState } from "react";
import type { TagInputProps } from "../types/props";
import TagItem from "./TagItem";
import RecommendedTags from "./RecommendedTags";

export default function TagInput({ tags, setTags }: TagInputProps) {
  const [input, setInput] = useState("");

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();

      const tagsExist = tags.some((element) => {
        if (element === input) return true;

        return false;
      });

      if (tagsExist) {
        setInput("");
        return;
      }

      setTags((prev) => [...prev, input]);

      setInput("");
    }
    if (e.code === "Backspace" && input === "") {
      setTags(tags.slice(0, -1));
    }
  };

  const removeTag = (index: number) => {
    setTags(tags.filter((_, i) => i !== index));
  };

  return (
    <div>
      <div className="flex flex-wrap gap-2">
        {tags.map((value, index) => {
          return (
            <div key={index}>
              <TagItem onRemove={() => removeTag(index)}>{value}</TagItem>
            </div>
          );
        })}
        <div className="flex flex-col w-full">
          <input
            type="text"
            onChange={(e) => setInput(e.target.value)}
            value={input}
            onKeyDown={handleKeyDown}
            className="border-1 border-white"
          />
          <div className="flex w-full">
            <RecommendedTags name={input}></RecommendedTags>
          </div>
        </div>
      </div>
    </div>
  );
}
