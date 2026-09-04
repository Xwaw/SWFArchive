import HomeHeader from "./components/Header/HomeHeader";
import HomeLeftSidebar from "./components/Sidebar/HomeLeftSidebar";
import HomeRightSidebar from "./components/Sidebar/HomeRightSidebar";
import FeaturedSection from "./components/Featured/FeaturedSection";
import GameCardsSection from "./components/GameCards/GameCardsSection";
import QuickActionsSection from "./components/QuickActions/QuickActionsSection";
import ExclusiveSection from "./components/Exclusive/ExclusiveSection";
import ContentBannerSection from "./components/Content/ContentBannerSection";
import RankingsSection from "./components/Rankings/RankingsSection";
import HomeFooter from "./components/Footer/HomeFooter";

export default function Home() {
  return (
    <div className="w-full min-h-screen bg-black text-white flex flex-col">
      <HomeHeader />

      <div
        className="w-full flex items-stretch gap-1"
        style={{
          background: "linear-gradient(to bottom, #000000 0.1%, #de3334 1%)",
        }}
      >
        <HomeLeftSidebar />

        <main className="flex-1 min-w-0 flex flex-col gap-2 pt-10">
          <FeaturedSection />
          <GameCardsSection />
          <QuickActionsSection />
          <ExclusiveSection />
          <ContentBannerSection />
          <ContentBannerSection />
          <RankingsSection />
        </main>

        <HomeRightSidebar />
      </div>

      <HomeFooter />
    </div>
  );
}
