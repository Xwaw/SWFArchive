import { useEffect, useState } from "react"
import axios from "axios";
import { archiveService } from "../services/ArchiveService";
import type { GameCardProps } from "../types/ComponentsProps";

export default function useArchive(){
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [archive, setArchive] = useState<GameCardProps[]>([]);
    const [error, setError] = useState<string | null>(null);

    const fetchArchive = async () => {
        setIsLoading(true);
        setError(null);

        try{
            const result = await archiveService.GetArchive();
            setArchive(result ?? []);
        }catch(error){
            setIsLoading(false)
            if (axios.isAxiosError(error)) {
                const errorCode = error.response?.status;
                if (errorCode === 500) {
                setError("Server error");
                return;
                }

                setError("ERROR: " + (errorCode ?? "unknown"));
            }
        }finally{
            setIsLoading(false)
        }
    }

    useEffect(() => {
        fetchArchive();
    }, [])

    return(
        {isLoading, archive, error}
    )
}