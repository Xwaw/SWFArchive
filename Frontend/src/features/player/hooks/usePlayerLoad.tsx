import { isAxiosError } from "axios";
import { useEffect, useState } from "react";
import { playerService } from "../services/playerService";

export default function usePlayerLoad(gameId: string){
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [url, setUrl] = useState<string | null>();

    const fetachLoadGame = async () => {
        try{
            const response = await playerService.getUrlGame(gameId);
            setUrl(response);
        }catch(error){
            if(isAxiosError(error)){
                const status = error.response?.status;

                if(status === 500){
                    setError("SERVER ERROR");
                    return;
                }
                if(status === 404){
                    setError("GAME NOT FOUND");
                    return;
                }
                if(status === 401){
                    setError("NOT AUTHORIZED");
                    return;
                }

                setError("UKNOWN ERROR");
                return;
            }
        }finally{
            setIsLoading(false);
        }
    }

    useEffect(() => {
        fetachLoadGame();
    }, [url])

    return{
        isLoading, error, url
    }
}