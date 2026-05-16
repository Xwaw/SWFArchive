import { http } from "../../../http";

class LibraryService{
    async AddToLibrary(id: string){
        try {
            const response = await http.put(`library/add/${id}`, {});
            return response.data;
        } catch (error) {
            throw error;
        }
    }
}

export const libraryService = new LibraryService;