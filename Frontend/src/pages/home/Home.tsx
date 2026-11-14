import "./home-responsive.css";
import HomeHeader from "./components/Header/HomeHeader";
import HomeLeftSidebar from "./components/Sidebar/HomeLeftSidebar";
import HomeRightSidebar from "./components/Sidebar/HomeRightSidebar";
import ExclusiveSection from "./components/Exclusive/ExclusiveSection";
import ContentBannerSection from "./components/Content/ContentBannerSection";
import RankingsSection from "./components/Rankings/RankingsSection";
import HomeFooter from "./components/Footer/HomeFooter";
import GamesActivitySection from "./components/Exclusive/GamesActivitySection";
import { useAuth } from "../../features/authorization/hooks/UseAuth";

export default function Home() {
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
          <GamesActivitySection />

          <ExclusiveSection />

          <ContentBannerSection />

          <RankingsSection />
        </main>

        <HomeRightSidebar />
      </div>

      <HomeFooter />
    </div>
  );
}
