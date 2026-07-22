import { useEffect, useState } from "react";
import { friendsService } from "../services/FriendsService";

interface RequestProps{
    id: string,
    receiverId: string,
    senderId: string,
    senderUsername: string
}

export default function useUserRequest(){
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [requests, setRequests] = useState<RequestProps[]>([]);

    const loadUserRequests = async () => {
        setIsLoading(true);
        setError(null)

        try{
            const response = await friendsService.getUserRequests()
            setRequests(response)
        }catch(error){
            setError("Something went wrong")
            setIsLoading(false)
        }finally{
            setIsLoading(false)
        }
    }

    const accept = async (requestId: string) => {
        const response = await friendsService.acceptRequest(requestId)
        console.log(response)
    }

    const deny = async (requestId: string) => {
        const response = await friendsService.denyRequest(requestId)
        console.log(response)
    }

    useEffect(() => {
        loadUserRequests();
    }, [])

    return {
        isLoading, error, requests, accept, deny
    }
}