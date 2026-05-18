import { http } from "../../../http";

class PlayerService{
    async getUrlGame(gameId: string){
        try{
            const response = await http.get(`player/get-${gameId}`);
            return response.data;
        }catch(error){
            return error;
        }
    }
}

export const playerService = new PlayerService();