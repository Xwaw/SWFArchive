import { authService } from "../../authorization/services/AuthService";
import { useNavigate } from "react-router-dom";
import { useProfile } from "../hooks/UseProfile";
import DropList from "../../../components/DropList";
import { Config } from "../../../Config";

export default function ProfileButton() {
  const navigate = useNavigate();

  const { profile } = useProfile();

  return (
    <div className="inline-flex items-center justify-center p-1">
      <DropList
        items={[
          {
            text: "Profile",
            onClick: () => {
              navigate(`/profile/${profile?.userId}`);
            },
          },
          {
            text: "Library",
            onClick: () => {
              navigate("/library");
            },
          },
          {
            text: "Friends",
            onClick: () => {
              navigate("/friends");
            },
          },
          {
            text: "Settings",
            onClick: () => {
              navigate("/settings");
            },
          },
          {
            text: "Upload",
            onClick: () => {
              navigate("upload");
            },
          },
          {
            text: "Logout",
            onClick: async () => {
              var response = await authService.logout();
              if (response) window.location.reload();
            },
          },
        ]}
        button={
          <img
            src={
              profile?.avatarUrl
                ? Config.API_URL + profile.avatarUrl
                : undefined
            }
            alt={profile?.userName || "Avatar"}
            className="h-12 w-12 object-cover cursor-pointer hover:opacity-80"
          />
        }
      />
    </div>
  );
}
