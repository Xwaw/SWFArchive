import { useEffect, useState } from "react";
import type { GameSession } from "../types/types";
import { isAxiosError } from "axios";
import { libraryService } from "../services/LibraryService";

export default function usePlayGame(gameId: string){
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [sessionGame, setSessionGame] = useState<GameSession | null>(null);

    const fetchGameSession = async () => {
        try{
            const response = await libraryService.PlayGame(gameId);
            setSessionGame(response);
        }catch(error){
            if(isAxiosError(error)){
                const status = error?.response?.status;

                if(status === 500){
                    setError("SERVER ERROR");
                    return;
                }

                if(status === 403){
                    setError("ITS NOT YOUR GAME")
                    return;
                }

                setError("UKNOWN ERROR")
            }
        }finally{
            setIsLoading(false);
        }
    }

    useEffect(() => {
        fetchGameSession();
    }, [])

    return {isLoading, error, sessionGame}
}