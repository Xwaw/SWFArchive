import BannerHeader from "./BannerHeader";
import LoginHeader from "./LoginHeader";
import NavigationHome from "./NavigationHome";

export default function HomeHeader() {
  return (
    <div>
      <NavigationHome />

      <div className="w-full h-[110px] flex shrink-0">
        <BannerHeader />

        <LoginHeader />
      </div>
      <div
        className="w-full h-0.5"
        style={{
          background:
            "linear-gradient(to right, #242424 0%, #a8a8a8 50%, #242424 100%)",
        }}
      />
    </div>
  );
}
