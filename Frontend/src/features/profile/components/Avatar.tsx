import { useNavigate } from "react-router-dom";
import useOwnership from "../../authorization/hooks/UseOwnership";
import type { AvatarButtonDto } from "../types/models";
import { Config } from "../../../Config";

export default function AvatarButton({ userId, avatarUrl }: AvatarButtonDto) {
  const { isOwner } = useOwnership(userId ?? "");
  const navigate = useNavigate();

  return (
    <div
      className={`aspect-square group h-25 bg-[#444444] bg-center bg-cover cursor-pointer`}
      style={{
        backgroundImage: avatarUrl
          ? `url(${Config.API_URL + avatarUrl})`
          : undefined,
      }}
    >
      {isOwner ? (
        <div
          className="left-0 w-full h-full flex justify-center items-center opacity-0 group-hover:opacity-50 bg-black text-white p-2"
          onClick={() => {
            navigate(`/profile/edit/${userId}`);
          }}
        >
          Edit Profile
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
}
