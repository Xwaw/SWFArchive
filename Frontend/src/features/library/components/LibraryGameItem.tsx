import type { LibraryItemProps } from "../types/props";

export default function LibraryGameItem({
  id,
  title,
  iconUrl,
  backgroundUrl,
}: LibraryItemProps) {
  return (
    <div
      className="w-full h-full flex pl-2 hover:brightness-80 cursor-pointer"
      onClick={() => {
        console.log("ID: " + id);
      }}
      style={{
        backgroundImage: `url(${backgroundUrl ?? "/test/Sample_banner.png"})`,
        color: "black"
      }}
    >
      <div
        className="h-full aspect-square flex"
        style={{
          backgroundImage: `url(${iconUrl ?? "/test/Test_Badge.gif"})`,
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
