import SearchGames from "../../../features/archive/components/SearchGames";
import "./archive-mobile-search.css";

export default function ArchiveMobileSearch() {
  return (
    <section
      aria-labelledby="archive-mobile-search-title"
      className="archive-mobile-search mx-2 border-2 border-black bg-[#252525] text-[#e6e19d] lg:hidden"
      style={{ fontFamily: "Tahoma, Arial, sans-serif" }}
    >
      <h2
        id="archive-mobile-search-title"
        className="border-2 border-t-[#aaaaaa] border-r-[#555555] border-b-[#555555] border-l-[#aaaaaa] bg-gradient-to-b from-[#777777] to-[#252525] px-3 py-2 text-center text-lg text-white"
        style={{ fontFamily: '"Robot_Font", Tahoma, sans-serif', textShadow: "1px 1px 0 #000" }}
      >
        Find SWF
      </h2>
      <div className="border-2 border-t-[#050505] border-r-[#999999] border-b-[#999999] border-l-[#050505] p-2">
        <SearchGames />
      </div>
    </section>
  );
}
