import { useEffect, useState } from "react";
import { accountService } from "../services/AccountService";
import { isAxiosError } from "axios";

export default function useOwnership(userId: string){
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [isOwner, setIsOwner] = useState<boolean | undefined>(undefined);

    const handleOwnership = async () => {
        try{
            var ownership = await accountService.confirmUserAccount(userId)
            setIsOwner(ownership.data ?? false)
        }catch(error){
            if(isAxiosError(error)){
                const status = error.response?.status;

                if(status === 500){
                    setError("SERVER ERROR");
                    return;
                }

                if(status === 403){
                    setError("NOT OWNERSHIP");
                    return;
                }

                if(status == 401){
                    setError("NOT LOGGED IN");
                    return;
                }

                setError("UNKWON ERROR")
            }
        }finally{
            setIsLoading(false);
        }
    }

    useEffect(() => {
        handleOwnership()
    }, [])

    return(
        {isOwner, isLoading, error}
    )
}