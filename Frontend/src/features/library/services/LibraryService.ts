import { http } from "../../../http";

class LibraryService{
    async AddToLibrary(gameId: string){
        try {
            const response = await http.put(`library/add/${gameId}`, {});
            return response.data;
        } catch (error) {
            throw error;
        }
    }

    async GetUserLibrary(userId: string){
        try{
            const response = await http.get(`library/${userId}`)
            return response.data;
        }catch(error){
            throw error;
        }
    }

    async ViewGameInLibrary(gameId: string){
        try{
            const response = await http.get(`library/view/${gameId}`)
            return response.data;
        }catch(error){
            throw error;
        }
    }

    async PlayGame(gameId: string){
        const response = await http.get(`library/play/${gameId}`)
        return response.data;
    }
}

export const libraryService = new LibraryService;