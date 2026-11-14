import { useNavigate } from "react-router-dom";

export default function HomeFooter() {
  const navigate = useNavigate();

  return (
    <footer className="w-full" style={{
      background: `
        linear-gradient(
          to top,
          #180000 0%,
          #520000 22%,
          #9b0000 55%,
          #c21818 78%,
          #7a0000 100%
        )
      `,
    }}>
      <div className="w-full h-[40px] flex justify-center items-center gap-6">
        <span className="hover:underline hover:cursor-pointer hover:text-[#0000ff]" onClick={() => navigate("/archive")}>All Games</span>
        <span className="hover:underline hover:cursor-pointer hover:text-[#0000ff]" onClick={() => navigate("/profiles")}>Profiles</span>
        <span className="hover:underline hover:cursor-pointer hover:text-[#0000ff]" onClick={() => navigate("/about")}>About</span>
      </div>

      <div className="w-full h-[30px] flex justify-center items-center select-none">
        SWFArchive
      </div>
    </footer>
  );
}
