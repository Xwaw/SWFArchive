import { useAuth } from "../../features/authorization/hooks/UseAuth";
import HomeFooter from "../home/components/Footer/HomeFooter";
import HomeHeader from "../home/components/Header/HomeHeader";
import HomeLeftSidebar from "../home/components/Sidebar/HomeLeftSidebar";
import ArchiveGames from "./components/ArchiveGames";
import ArchiveRightPanel from "./components/ArchiveRightPanel";
import ArchiveMobileSearch from "./components/ArchiveMobileSearch";
import ArchiveSearchTitle from "./components/ArchiveSearchTitle";

export default function Archive() {
  const { user } = useAuth();

  return (
      <div className="home-page w-full min-h-screen bg-black text-white flex flex-col">
        <HomeHeader user={user} />
  
        <div
          className="home-layout w-full flex items-stretch gap-1 pb-3 [&>.home-sidebar-left]:-mb-3"
          style={{
            background: "linear-gradient(to bottom, #000000 0.1%, #de3334 1%)",
          }}
        >
          <HomeLeftSidebar />

          <main className="flex-1 min-w-0 flex flex-col gap-2 pt-10">
            <ArchiveMobileSearch />
            <ArchiveSearchTitle />
            <ArchiveGames></ArchiveGames>
          </main>

          <ArchiveRightPanel />
        </div>
  
        <HomeFooter />
      </div>
    );
}
