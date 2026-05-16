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
}

export const libraryService = new LibraryService;