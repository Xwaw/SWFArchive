export default function BannerHeader() {
  return (
    <div
      className="
        relative
        w-[70%]
        h-full
        overflow-hidden
        bg-no-repeat
        bg-left
      "
      style={{
        backgroundImage: `url("/images/banners/SwfArchive.png")`,
        backgroundSize: "100% 100%",
      }}
    >
    </div>
  );
}