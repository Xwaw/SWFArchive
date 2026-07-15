import { useNavigate } from "react-router-dom";
import ListItems from "../../components/ListItems";
import { useState } from "react";
import FriendChatView from "../../features/friends/components/FriendChatView";

export default function Friends() {
  const navigate = useNavigate();
  // hook useFriendsList - giving list every friend
  const [selectedFriend, setSelectedFriend] = useState<string | null>(null);

  const [users, setUsers] = useState([
    { id: 1, name: "Widzet" },
    { id: 2, name: "Jebać poe" },
    { id: 3, name: "Poe 2 w sumie też" },
    { id: 1, name: "Widzet" },
    { id: 2, name: "Jebać poe" },
    { id: 3, name: "Poe 2 w sumie też" },
    { id: 1, name: "Widzet" },
    { id: 2, name: "Jebać poe" },
    { id: 3, name: "Poe 2 w sumie też" },
    { id: 1, name: "Widzet" },
    { id: 2, name: "Jebać poe" },
    { id: 3, name: "Poe 2 w sumie też" },
    { id: 1, name: "Widzet" },
    { id: 2, name: "Jebać poe" },
    { id: 3, name: "Poe 2 w sumie też" },
    { id: 1, name: "Widzet" },
    { id: 2, name: "Jebać poe" },
    { id: 3, name: "Poe 2 w sumie też" },
    { id: 1, name: "Widzet" },
    { id: 2, name: "Jebać poe" },
    { id: 3, name: "Poe 2 w sumie też" },
    { id: 1, name: "Widzet" },
    { id: 2, name: "Jebać poe" },
    { id: 3, name: "Poe 2 w sumie też" },
    { id: 1, name: "Widzet" },
    { id: 2, name: "Jebać poe" },
    { id: 3, name: "Poe 2 w sumie też" },
    { id: 1, name: "Widzet" },
    { id: 2, name: "Jebać poe" },
    { id: 3, name: "Poe 2 w sumie też" },
    { id: 1, name: "Widzet" },
    { id: 2, name: "Jebać poe" },
    { id: 3, name: "Poe 2 w sumie też" },
    { id: 1, name: "Widzet" },
    { id: 2, name: "Jebać poe" },
    { id: 3, name: "Poe 2 w sumie też" },
  ]);

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
          <ListItems noItemsMessage="U have no friends :C">
            {users.map((user) => {
              return (
                <div className="w-full h-20 bg-red-900 hover:bg-red-600 flex p-2 gap-4 cursor-pointer">
                  <div className="h-full aspect-square bg-green-500">
                    {user.id}
                  </div>
                  <div
                    className="flex items-center w-full h-full"
                    onClick={() => {
                      setSelectedFriend(user.name); // plan: ID of friend when backend will be connected with system
                    }}
                  >
                    {user.name}
                  </div>
                </div>
              );
            })}
          </ListItems>
        </div>

        <div className="w-full h-full bg-gray-800">
          <FriendChatView id={selectedFriend}></FriendChatView>
        </div>
      </div>
    </div>
  );
}
