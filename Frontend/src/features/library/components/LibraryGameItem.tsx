import { Config } from "../../../Config";
import type { LibraryItemProps } from "../types/props";

export default function LibraryGameItem({
  id,
  title,
  thumbnail,
  onSelect
}: LibraryItemProps) {
  return (
    <div
      className="w-full h-full flex p-1 hover:brightness-80 cursor-pointer"
      onClick={() => {
        onSelect(id);
      }}
      style={{
        backgroundImage: `url(${thumbnail ?? "/test/Sample_banner.png"})`,
        color: "black"
      }}
    >
      <div
        className="w-6 h-full aspect-square flex"
        style={{
          backgroundImage: `url(${Config.API_URL + thumbnail})`,
          backgroundPosition: "center",
          backgroundSize: "cover"
        }}
      />

      <div className="w-full flex items-center pl-2">
        <p>{title}</p>
      </div>
    </div>
  );
}
