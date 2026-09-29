import { useNavigate } from "react-router-dom";

export default function BannerHeader() {
  const navigate = useNavigate()

  return (
    <div
      className="
        relative
        w-[70%]
        h-full
        overflow-hidden
        bg-no-repeat
        bg-left
        hover:cursor-pointer
      "
      style={{
        backgroundImage: `url("/images/banners/SwfArchive.png")`,
        backgroundSize: "100% 100%",
      }}

      onClick={() => navigate("/archive")}
    >
    </div>
  );
}