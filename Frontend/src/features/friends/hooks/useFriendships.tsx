import { useEffect, useState } from "react";
import { friendsService } from "../services/FriendsService";

interface FriendshipProps {
  conversationId: string;
  friendId: string;
  friendUsername: string;
}

export default function useFriendships(){
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [friendships, setFriendships] = useState<FriendshipProps[]>([]);

    const loadFriendships = async () => {
        try{
            const response = await friendsService.getUserFriendships();
            setFriendships(response);
        }catch(error){
            setError("Something went worng")
            setIsLoading(false)
        }finally{
            setIsLoading(false)
        }
    }

    useEffect(() => {
        loadFriendships()
    }, [])

    return{
        isLoading, error, friendships
    }
}