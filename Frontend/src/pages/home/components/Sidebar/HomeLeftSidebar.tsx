import { useNavigate } from "react-router-dom";
import MenuPanel from "../../../../components/MenuTabs/MenuPanel";
import SearchGamesBar from "../../../../features/archive/components/SearchGames";

export default function HomeLeftSidebar() {
  const navigate = useNavigate();

  return (
    <aside
      className="w-[230px] shrink-0 flex flex-col gap-5 pt-2 border-1"
      style={{
        background: "linear-gradient(to right, #eb1e20 10%, #de3334 90%)",
        borderTop: "2px solid #650000",
        borderLeft: "2px solid #e8b0b0",
        borderRight: "2px solid #650000",
        borderBottom: "2px solid #3b0000",
      }}
    >
      <MenuPanel
        title={"About My Site"}
        items={[
          { label: "About SWFArchive", onClick: () => navigate("/about") },
          { label: "About Me", onClick: () => navigate("/contact") },
          { label: "Privacy Policy", onClick: () => navigate("/privacy") },
        ]}
      />

      {/* Seperate to Search component and advanced search component, finally connect them into one component */}

      {/* If he click [GO!] button then he will navigate url into that archive and this archive use hook "useEffect" on this url and create search business in backend */}
      <MenuPanel
        title={"Find SWF"}
        items={[
          {
            label: <SearchGamesBar />,
          },
          { label: "New Releases", onClick: () => navigate("/archive?sortBy=newest") },
          { label: "Top Rated", onClick: () => navigate("/archive?sortBy=rating") },
          { label: "Most Popular", onClick: () => navigate("/archive?sortBy=popularity") },
          { label: "Random", onClick: () => navigate("/archive?sortBy=random") },
        ]}
      />
    </aside>
  );
}
