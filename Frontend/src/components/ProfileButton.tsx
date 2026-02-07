import axios from "axios";
import { useEffect, useState } from "react";
import defaultAvatar from "../assets/no_avatar.png";
import DropList from "./DropList";
import { useNavigate } from "react-router-dom";
import { Config } from "../Config";

interface userInfo {
  avatarUrl: string;
  userName: string;
}

export default function ProfileButton() {
  const navigate = useNavigate();
  const [user, setUser] = useState<userInfo | null>(null);

  const profile = async () => {
    try {
      const response = await axios.get(`${Config.API_URL}/profile/me`, {
        withCredentials: true,
      });

      const data = response.data;
      setUser(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogout = async () => {
    try {
      const response = await axios.post(
        `${Config.API_URL}/account/logout`,
        {},
        { withCredentials: true }
      );
      if (response.status === 200) {
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    profile();
  }, []);

  return (
    <div className="inline-flex items-center justify-center p-1">
      <DropList
        items={[
          { text: "Profile", onClick: () => {navigate(`/profile/${user?.userName}`)} },
          { text: "Friends", onClick: () => {navigate("/friends")} },
          { text: "Library", onClick: () => {navigate("/library")} },
          { text: "Settings", onClick: () => {navigate("/settings")} },
          { text: "Upload", onClick: () => {navigate("upload")} },
          {
            text: "Logout",
            onClick: handleLogout,
          },
        ]}
        button={
          <img
            src={Config.API_URL + user?.avatarUrl || defaultAvatar}
            alt={user?.userName || "Avatar"}
            className="h-12 w-12 object-cover cursor-pointer"
          />
        }
      />
    </div>
  );
}
