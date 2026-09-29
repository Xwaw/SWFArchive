import type { UserDto } from "../../../../features/authorization/types/AuthTypes";
import BannerHeader from "./BannerHeader";
import LoginHeader from "./LoginHeader";
import NavigationHome from "./NavigationHome";

interface HomeHeaderProps {
  user: UserDto | undefined;
}

export default function HomeHeader({ user }: HomeHeaderProps) {
  return (
    <div>
      <NavigationHome isLogged={!!user} />

      <div className="relative w-full h-[110px] flex">
        <BannerHeader />
        <LoginHeader user={user} />

        <img
          src="/images/login/header_divider.png"
          alt=""
          draggable={false}
          className="
            absolute
            top-0
            left-[68%]
            -translate-x-1/2
            h-full
            w-auto
            z-30
            pointer-events-none
          "
        />
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
