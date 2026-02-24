import type { UserStatusDto } from "../../types/models";
import AvatarButton from "../Avatar";

export default function UserStatusSection({avatarUrl, userName, isOnline, userId}: UserStatusDto) {
  return (
    <div className="flex p-2 w-full h-1/3 bg-red-900">
      <div>
        <AvatarButton userId={userId} avatarUrl={avatarUrl}></AvatarButton>
      </div>

      <div className="flex flex-col min-w-0 justify-center p-5">
        <span
        className="truncate font-bold text-white"
        style={{ fontSize: 25 }}
        >
        {userName}
        </span>
        <div className="">
            {
              isOnline ? <div className="flex">
                <div className="bg-green-600 rounded-2xl border-2 border-black text-green-600">
                  O
                </div>
                <div>
                  ONLINE
                </div>
              </div> :
              <div className="flex">
                <div className="bg-red-600 rounded-2xl border-2 border-black text-red-600">
                  O
                </div>
                <div>
                  OFFLINE
                </div>
              </div>
            }
        </div>
      </div>
    </div>
  );
}
