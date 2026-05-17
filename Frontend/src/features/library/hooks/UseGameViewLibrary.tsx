import { useEffect, useState } from "react";
import type { ViewGame } from "../types/types";
import { libraryService } from "../services/LibraryService";
import { isAxiosError } from "axios";

export default function useGameViewLibrary(gameId: string){
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [viewGame, setViewGame] = useState<ViewGame | null>(null);
    
    const fetchViewGame = async () => {
        try{
            setIsLoading(true);

            const response = await libraryService.ViewGameInLibrary(gameId);
            setViewGame(response);
        }catch(error){
            if(isAxiosError(error)){
                const status = error.response?.status;

                if(status === 500){
                    setError("SERVER ERROR")
                    return;
                }
                if(status === 404){
                    setError("GAME NOT FOUND")
                    return;
                }
                if(status === 401){
                    setError("USER NOT LOGGED IN")
                    return;
                }

                setError("UNKNOWN ERROR");
                return;
            }
        }finally{
            setIsLoading(false);
        }
    }

    useEffect(() => {
        fetchViewGame();
    }, [gameId])

    return{
        viewGame, error, isLoading
    }
}