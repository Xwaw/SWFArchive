import { useEffect, useState } from "react";
import { archiveService } from "../services/ArchiveService";
import type { GameView } from "../types/ComponentsDto";
import { isAxiosError } from "axios";

export default function useGameInfo(gameId: string){
    const [data, setData] = useState<GameView | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    
    const fetchGameData = async () => {
        try{
            const data = await archiveService.GetGameData(gameId);
            setData(data);
        }catch(error){
            if(isAxiosError(error)){
                const status = error.response?.status;
                if(status == 500){
                    setError("Server Error");
                    return;
                }

                if(status == 404){
                    setError("No Game found with this ID");
                    return;
                }

                setError(status + ": UKKNOWN");
            }
        }finally{
            setIsLoading(false);
        }
        
    }

    useEffect(() => {
        fetchGameData();
    }, [])

    return {
        data, error, isLoading
    }
}