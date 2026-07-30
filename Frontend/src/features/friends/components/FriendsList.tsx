import { useState } from "react";
import ListItems from "../../../components/ListItems";
import useFriendships from "../hooks/useFriendships";
import { useNavigate } from "react-router-dom";

interface FriendListProps{
  onFriendClick: (friendshipId: string) => void
}

export default function FriendsList({onFriendClick}: FriendListProps) {
  const {isLoading, error, friendships} = useFriendships();

  const navigate = useNavigate();
  
  if(isLoading){
    return(
      <div>
        ISLOADING...
      </div>
    )
  }

  if(error){
    return(
      <div>
        {error}
      </div>
    )
  }

  return (
    <div>
      {
        friendships ? <ListItems noItemsMessage="U have no friends :C">
        {friendships.map((user) => {
          return (
            <div className="w-full h-20 bg-red-900 hover:bg-red-600 flex p-2 gap-4 cursor-pointer">
              <div className="h-full aspect-square bg-green-500" onClick={() => {navigate(`/profile/${user.friendId}`)}}>{}</div>
              <div
                className="flex items-center w-full h-full"
                onClick={() => {
                  onFriendClick(user.conversationId)
                  console.log(user.conversationId)
                }}
              >
                {user.friendUsername}
              </div>
            </div>
          );
        })}
      </ListItems> : <div>
        No friends
      </div>
      }
    </div>
  );
}
