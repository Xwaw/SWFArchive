import { useEffect, useState } from "react";
import { accountService } from "../services/AccountService";

export default function useOwnership(userId: string){
    const [isOwner, setIsOwner] = useState<boolean | undefined>(undefined);

    const handleOwnership = async () => {
        try{
            var ownership = await accountService.confirmUserAccount(userId)
            setIsOwner(ownership.data ?? false)
        }catch(error){
            console.log(error)
        }
    }

    useEffect(() => {
        handleOwnership()
    }, [])

    return(
        {isOwner}
    )
}