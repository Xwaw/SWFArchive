import type { ArchiveProps } from "../types/ComponentsProps";
import GameCard from "./GameCard";

export default function ArchiveList({ children }: ArchiveProps) {
  if(children === null) return <div></div>

  return (
    <div className="grid grid-cols-3 gap-5 p-5">
      {children.map((value, index) => {
        return (
          <div className="w-full h-full" key={index}>
            <GameCard
              id={value.id}
              title={value.title}
              playsCount={value.playsCount}
              ratingAverage={value.ratingAverage}
              authorName={value.authorName}
              uploaded={value.uploaded}
              thumbnailUrl={value.thumbnailUrl}
            />
          </div>
        );
      })}
    </div>
  );
}
