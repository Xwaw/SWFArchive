import { useState } from "react";
import ForgotPasswordBar, {
  forgotPasswordBarBackground,
} from "../../../../features/authorization/components/ForgotPasswordBar";
import LoginBar, {
  loginBarBackground,
} from "../../../../features/authorization/components/LoginBar";
import RegisterBar, {
  registerBarBackground,
} from "../../../../features/authorization/components/RegisterBar";
import UserBar from "../../../../features/authorization/components/UserBar";
import Switch from "../../../../components/Buttons/Switch";
import type { UserDto } from "../../../../features/authorization/types/AuthTypes";
import { Config } from "../../../../Config";

interface LoginHeaderProps {
  user: UserDto | undefined;
}

type BarSection = "login" | "register" | "forgot";

export default function LoginHeader({ user }: LoginHeaderProps) {
  const [section, setSection] = useState<BarSection>("login");

  const handleSection = (type: BarSection) => {
    switch (type) {
      case "login":
        return <LoginBar onForgot={() => setSection("forgot")} />;

      case "register":
        return <RegisterBar />;

      case "forgot":
        return <ForgotPasswordBar />;

      default:
        return <LoginBar onForgot={() => setSection("forgot")} />;
    }
  };

  const handleBackground = (type: BarSection) => {
    switch (type) {
      case "login":
        return loginBarBackground;

      case "register":
        return registerBarBackground;

      case "forgot":
        return forgotPasswordBarBackground;

      default:
        return loginBarBackground;
    }
  };

  return (
    <div className="relative w-[32%] shrink-0 min-w-0 h-full overflow-hidden">
      <div
        className="
          absolute
          inset-0
          z-0
          bg-center
          bg-cover
          bg-no-repeat
        "
        style={{
          backgroundImage: `url("${
            user
              ? Config.API_URL +
                (user.profile?.backgroundUrl ?? "/test/images/banners/1.png")
              : handleBackground(section)
          }")`,
        }}
      />

      <img
        src="/images/login/header_bar.png"
        alt=""
        draggable={false}
        className="
          absolute
          left-0
          top-0
          h-full
          z-10
          select-none
          pointer-events-none
        "
        style={{
          filter: "drop-shadow(5px 0 8px rgba(0,0,0,0.65))",
        }}
      />

      <div className="relative z-20 w-full h-full flex flex-col items-end">
        {user ? (
          <div className="w-full h-full flex justify-end p-1">
            <UserBar />
          </div>
        ) : (
          <>
            <div className="w-full h-[65%] flex justify-end p-1">
              {handleSection(section)}
            </div>

            <div className="w-[55%] h-[25%] flex justify-end items-start pr-1">
              <Switch
                text={[<p>LOGIN</p>, <p>REGISTER</p>]}
                forcedState={section === "forgot" ? "normal" : undefined}
                onSwitch={(state) => {
                  if (state === "left_pressed") {
                    setSection("login");
                  }

                  if (state === "right_pressed") {
                    setSection("register");
                  }
                }}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
