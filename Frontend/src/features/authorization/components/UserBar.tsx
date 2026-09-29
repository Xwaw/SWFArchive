import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/UseAuth";
import { Config } from "../../../Config";
import DropList from "../../../components/DropList";

export default function UserBar() {
  const navigate = useNavigate();
  const { isLoading, user, logout } = useAuth();

  const userPanelRef = useRef<HTMLDivElement>(null);

  const [mousePosition, setMousePosition] = useState<{
    x: number;
    y: number;
  } | null>(null);

  const showUserPanel = (event: React.MouseEvent) => {
    setMousePosition({
      x: event.clientX,
      y: event.clientY,
    });
  };

  const closeUserPanel = () => {
    setMousePosition(null);
  };

  useEffect(() => {
    if (!mousePosition) return;

    const handleMouseDown = (event: MouseEvent) => {
      if (
        userPanelRef.current &&
        !userPanelRef.current.contains(event.target as Node)
      ) {
        closeUserPanel();
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeUserPanel();
      }
    };

    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [mousePosition]);

  if (isLoading) {
    return (
      <div className="flex justify-end items-center w-[60%] p-2 gap-5">
        <span
          className="text-white select-none"
          style={{
            fontFamily: "Tahoma, Arial, sans-serif",
            textShadow: "1px 1px 0 #000",
          }}
        >
          Loading...
        </span>
      </div>
    );
  }

  const renderUserPanel = () => {
    if (!mousePosition) return null;

    return (
      <div
        ref={userPanelRef}
        className="fixed z-[9999]"
        style={{
          left: mousePosition.x,
          top: mousePosition.y,
          transform: "translateX(-100%)",
        }}
      >
        <DropList>
          <DropList.Item
            onClick={() => {
              if (user) {
                navigate(`/profile/${user.id}`);
              }

              closeUserPanel();
            }}
          >
            View Profile
          </DropList.Item>

          <DropList.Item
            onClick={() => {
              if (user) {
                navigate(`/profile/edit/${user.id}`);
              }

              closeUserPanel();
            }}
          >
            Edit Profile
          </DropList.Item>

          <DropList.Separator />

          <DropList.Item
            onClick={() => {
              navigate("/friends");
              closeUserPanel();
            }}
          >
            Friends
          </DropList.Item>

          <DropList.Item
            onClick={() => {
              navigate("/friends/messages");
              closeUserPanel();
            }}
          >
            Messages
          </DropList.Item>

          <DropList.Separator />

          <DropList.Item
            onClick={() => {
              navigate("/account/settings");
              closeUserPanel();
            }}
          >
            Account Settings
          </DropList.Item>

          <DropList.Separator />

          <DropList.Item
            onClick={() => {
              logout()
              closeUserPanel();
            }}
          >
            Log Out
          </DropList.Item>
        </DropList>
      </div>
    );
  };

  return (
    <div className="flex justify-end items-center w-[60%] p-2 gap-5">
      <div className="flex flex-col items-end w-full text-right">
        <div className="flex items-center gap-2">
          <div
            className="
              h-7 aspect-square
              border-2 border-black
              flex items-center justify-center
              font-bold
              text-black
            "
            style={{
              background: `
                radial-gradient(
                  circle at center,
                  #fffca8 0%,
                  #fff200 25%,
                  #ffc400 55%,
                  #ff8a00 80%,
                  #d94b00 100%
                )
              `,
              boxShadow: `
                0 0 4px #ffea00,
                0 0 8px rgba(255, 166, 0, 0.8)
              `,
            }}
            title="Veteran"
          >
            <div
              className="
                w-full h-full
                hover:border-red-600
                cursor-pointer
              "
              style={{
                backgroundImage: `url(${Config.API_URL}${user?.profile?.badgeViewUrl})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />
          </div>

          <span
            className="
              text-2xl
              font-bold
              underline
              hover:text-3xl
              hover:text-red-600
              cursor-pointer
            "
            style={{
              fontFamily: '"Trebuchet MS", Arial, sans-serif',
              WebkitTextStroke: "1px #111",
              textShadow: `
                1px 1px 0 #111,
                2px 2px 0 #111,
                0 0 5px rgba(0, 0, 0, 0.7)
              `,
            }}
            onClick={() => {
              if (user) {
                navigate(`/profile/${user.id}`);
              }
            }}
          >
            {user?.profile?.profileTitle}
          </span>
        </div>

        <span
          className="
            text-orange-400
            hover:underline
            cursor-pointer
            hover:text-yellow-400
          "
          onClick={() => {
            if (user) 
              navigate(`/profile/edit/${user.id}`);
          }}
        >
          {user?.profile?.description}
        </span>
      </div>

      <div className="relative w-[25%] aspect-square shrink-0">
        <div
          className="
            w-full h-full
            hover:border-red-600
            cursor-pointer
          "
          style={{
            backgroundImage: `url(${
              Config.API_URL +
              (user?.profile?.avatarUrl ?? "/test/images/banners/1.png")
            })`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            borderLeft: "5px solid #151515",
            borderRight: "5px solid #888888",
            borderTop: "5px solid #151515",
            borderBottom: "5px solid #888888",
          }}
          onClick={showUserPanel}
        />

        <div
          className="
            absolute
            -right-1
            -bottom-1
            px-1.5
            py-[1px]
            bg-black
            border
            border-white
            text-[10px]
            whitespace-nowrap
            z-10
          "
          style={{
            fontFamily: "Tahoma, Arial, sans-serif",
            textShadow: "1px 1px 0 #000",
          }}
        >
          <span className="text-lime-400">●</span>
          <span className="text-white">
            {user?.profile?.profileStatus}
          </span>
        </div>
      </div>

      {renderUserPanel()}
    </div>
  );
}