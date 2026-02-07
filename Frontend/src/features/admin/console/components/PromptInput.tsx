import { useState, type ChangeEvent } from "react";

interface PromptInputProps {
  className?: string;
  color?: string;
  onSubmit: (command: string[]) => void;
}

export default function PromptInput({ className, color = "#00ff00", onSubmit }: PromptInputProps) {
  const prompt = "> ";
  const [value, setValue] = useState(prompt);
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  const updatePrompt = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const input = e.target.value;

    if (!input.startsWith(prompt)) {
      setValue(prompt);
      return;
    }
    setValue(input);
  };
  const blockKeys = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    const cursor = e.currentTarget.selectionStart ?? 0;

    if (e.key === "ArrowLeft" && cursor <= prompt.length) {
      e.preventDefault();
    }

    if (e.key === "Backspace" && cursor <= prompt.length) {
      e.preventDefault();
    }

    if ((e.key === "ArrowUp" || e.key === "ArrowDown") && history.length <= 1){
      e.preventDefault();
    }
  }
  const historyKeysHandler = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "ArrowUp") {
      e.preventDefault();
      setHistoryIndex(prev => {
        const next = Math.min(prev + 1, history.length - 1);
        setValue(prompt + (history[next] ?? ""));
        return next;
      });
    }

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setHistoryIndex(prev => {
        const next = Math.max(prev - 1, -1);
        setValue(next === -1 ? prompt : prompt + history[next]);
        return next;
      });
    }
  }

  const handleEnter = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter") {
      e.preventDefault()

      const command = value
      if(!command) return;

      const result = command.replace(prompt, "").trim().split(" ");

      setHistory(prev => [...prev, command.replace(prompt, " ").trim()])
      setHistoryIndex(-1)

      onSubmit(result);
      setValue(prompt)
    }
  };

  return (
    <div className={`${className}`} style={{border: `2px solid ${color}`}}>
      <textarea
        className={`w-full h-full bg-transparent border-none focus:outline-none focus:ring-0 justify-center resize-none`}
        style={{ color }}
        value={value}
        onChange={updatePrompt}
        onKeyDown={(e) => {
          handleEnter(e);
          blockKeys(e);
          historyKeysHandler(e);
        }}
      />
    </div>
  );
}
