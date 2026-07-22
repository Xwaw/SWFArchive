import { useState } from "react";
import { friendsService } from "../services/FriendsService";

export default function useInviteUser() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sendInviteToUser = async (friendId: string) => {
    setIsLoading(true);
    try {
      var result = await friendsService.sendFriendRequest(friendId);
      console.log(result.data)
      return result.data;
    } catch (error) {
      setError("something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    error,
    sendInviteToUser,
  };
}
