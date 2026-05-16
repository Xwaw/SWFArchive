import { useEffect, useState } from "react";
import type { LibraryItemProps, PaginationItemProps } from "../types/props";
import { isAxiosError } from "axios";
import { libraryService } from "../services/LibraryService";

export default function useUserLibrary(userId: string){
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [library, setLibrary] = useState<PaginationItemProps<LibraryItemProps> | null >(null);

    const fetchLibrary = async () => {
        try{
            const response = await libraryService.GetUserLibrary(userId);
            console.log(response)
            setLibrary(response);
        }catch(error){
            if(isAxiosError(error)){
                const status = error.response?.status;

                if(status === 500) {
                    setError("SERVER ERROR");
                    return;
                }
                if(status === 401){
                    setError("USER NOT LOGGED IN");
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
        fetchLibrary();
    }, [])

    return {
        isLoading, error, library
    }
}