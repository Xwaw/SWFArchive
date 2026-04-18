import type { TagItemProps } from "../types/props";

export default function TagItem({ onRemove, children }: TagItemProps) {
  return (
    <div className="border-1 flex">
      <div
        className="bg-red-600 h-full aspect-square flex justify-center items-center p-1 pl-2 pr-2 cursor-pointer select-none"
        onClick={onRemove}
      >
        <p>X</p>
      </div>
      <div className="w-50 min-w-5 flex justify-start items-center p-1">
        <p className="truncate">{children}</p>
      </div>
    </div>
  );
}
