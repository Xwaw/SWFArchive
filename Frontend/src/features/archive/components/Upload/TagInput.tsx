import { useState, type Dispatch, type SetStateAction } from "react";

interface TagInputProps {
  tags: string[],
  setTags: Dispatch<SetStateAction<string[]>>
}

export default function TagInput({tags, setTags}: TagInputProps) {
  const [input, setInput] = useState("");

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();

      const tagsExist = tags.some((element) => {

        if(element === input)return true;

        return false;
      })

      if(tagsExist){
        setInput("")
        return;
      };

      setTags(prev => [...prev, input]);

      setInput("");
    }
    if(e.code === "Backspace" && input === ""){
        setTags(tags.slice(0, -1))
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
            <div key={index} className="border-1 flex">
              <div
                className="bg-red-600 h-full aspect-square flex justify-center items-center"
                onClick={() => removeTag(index)}
              >
                <p>X</p>
              </div>
              <div className="w-50 min-w-5">
                <p className="truncate">{value}</p>
              </div>
            </div>
          );
        })}
        <input
          type="text"
          onChange={(e) => setInput(e.target.value)}
          value={input}
          onKeyDown={handleKeyDown}
          className="border-1 border-white"
        />
      </div>
    </div>
  );
}
