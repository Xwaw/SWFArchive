import { useState } from "react";
import { useNavigate } from "react-router-dom";

import SearchGamesBar from "./SearchGamesBar";
import AdvancedSearch from "./AdvancedSearch";

export default function SearchGames() {
  const [showAdvanced, setShowAdvanced] = useState(false);
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const params = new URLSearchParams();

    const search = formData.get("search");
    const sortBy = formData.get("sortBy");
    const tagIds = formData.getAll("tagIds");

    if (typeof search === "string" && search.trim()) {
      params.set("search", search.trim());
    }

    if (typeof sortBy === "string" && sortBy) {
      params.set("sortBy", sortBy);
    }

    tagIds.forEach((id) => {
      if (typeof id === "string") {
        params.append("tagIds", id);
      }
    });

    params.set("currentPage", "1");

    navigate(`/archive?${params.toString()}`);
  };

  return (
    <form onSubmit={handleSearch} className="w-full">
      <SearchGamesBar />

      <button
        type="button"
        onClick={() => setShowAdvanced((prev) => !prev)}
        aria-expanded={showAdvanced}
        className="
          w-full flex items-center gap-1
          text-left cursor-pointer p-0.5
          hover:underline
        "
      >
        <img
          src="/images/icons/menu_arrow.png"
          alt=""
          className={`
            h-[15px] aspect-square object-contain shrink-0
            transition-transform duration-200
            ${showAdvanced ? "rotate-90" : "rotate-0"}
          `}
        />

        Advanced Search
      </button>

      {showAdvanced && <AdvancedSearch />}
    </form>
  );
}