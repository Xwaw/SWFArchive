import { useNavigate, useParams } from "react-router-dom";
import FriendChatView from "../../features/friends/components/FriendChatView";
import useOwnership from "../../features/authorization/hooks/UseOwnership";
import FriendsList from "../../features/friends/components/FriendsList";
import FriendRequestList from "../../features/friends/components/FriendRequestList";
import { useState } from "react";

export default function Friends() {
  const { userId } = useParams();
  const { isLoading, error, isOwner } = useOwnership(userId ?? "");
  const [selectedFriend, setSelectedFriend] = useState<string | null>(null);

  if (isLoading) return <div>LOADING...</div>;

  if (error) {
    return (
      <div className="w-full h-full flex justify-center items-center text-red-600">
        {error}
      </div>
    );
  }

  if (!isOwner)
    return (
      <div className="w-full h-full flex justify-center items-center text-red-600">
        U ARE NOT OWNING THIS LIST
      </div>
    );

  return (
    <div>
      <div className="w-screen h-screen flex flex-2 justify-center">
        <div className="w-1/4 h-full bg-black text-2xl overflow-y-scroll">
          <div className="flex">
            <div className="w-1/10 aspect-square bg-green-400 flex justify-center items-center text-black">
              +
            </div>
            <div className="w-9/10 h-10 bg-amber-600 flex justify-center items-center">
              Friends List
            </div>
          </div>
          <FriendsList onFriendClick={(friend) => {setSelectedFriend(friend)}}/>
          <FriendRequestList />
        </div>

        <div className="w-full h-full bg-gray-800">
          {selectedFriend ? (
            <FriendChatView conversationId={selectedFriend} />
          ) : (
            <div className="w-full h-full flex justify-center items-center">
              Wybierz znajomego
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
