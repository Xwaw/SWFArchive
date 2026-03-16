import type { ArchiveProps } from "../types/ComponentsProps";
import GameCard from "./GameCard";

export default function ArchiveList({ children }: ArchiveProps) {
  return (
    <div className="grid grid-cols-3 gap-5 p-5">
      {children.map((value, index) => {
        return (
          <div className="w-full h-full" key={index}>
            <GameCard
              id={value.id}
              title={value.title}
              playsCount={value.playsCount}
              starsRated={value.starsRated}
              authorName={value.authorName}
              uploadedAt={value.uploadedAt}
            ></GameCard>
          </div>
        );
      })}
    </div>
  );
}
