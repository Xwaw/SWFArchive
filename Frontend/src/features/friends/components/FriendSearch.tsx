import { useState } from "react";
import ListItems from "../../../components/ListItems";
import useSearchUsers from "../hooks/useSearchUsers";
import { useNavigate } from "react-router-dom";

export default function FriendSearch() {
  const [input, setInput] = useState<string>("");
  const {users, searchUsers} = useSearchUsers();

  const navigate = useNavigate();

  const handleInput = async () => {
    await searchUsers(input)
  }

  return (
    <div className="w-150 h-200 bg-gray-600 flex flex-col">
      <div className="w-full h-15 p-2 bg-amber-500 flex gap-5">
        <input
          placeholder="Search your future friend..."
          type="text"
          className="bg-amber-900 w-full field-sizing-fixed h-full text-2xl"
          onChange={(e) => {
            setInput(e.currentTarget.value)
          }}
          value={input}
        />
        <div className="h-full aspect-square bg-amber-900" onClick={handleInput}>Search</div>
      </div>
      <div className="w-full h-full p-2 bg-amber-950 overflow-y-scroll">
        <ListItems>
          {users ? (
            users.items.map((value) => {
              return (
                <div className="w-full h-25 bg-amber-800 p-2 flex gap-2 items-center">
                  <div
                    className="h-full aspect-square bg-amber-300"
                    style={{ backgroundImage: `url(${value.avatarUrl})` }}
                  />
                  <p className="w-full" onClick={() => navigate(`/profile/${value.id}`)}>{value.username}</p>
                  <button className="bg-red-900 h-8 w-30 hover:bg-red-600">
                    Add friend
                  </button>
                </div>
              );
            })
          ) : (
            <div>No friends found</div>
          )}
        </ListItems>
      </div>
    </div>
  );
}