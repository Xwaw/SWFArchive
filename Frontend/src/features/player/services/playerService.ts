import { http } from "../../../http";

class PlayerService{
    async getUrlGame(gameId: string){
        const response = await http.get<string>(`player/get-${gameId}`);
        return response.data;
    }

    async getArchiveGameUrl(gameId: string){
        const response = await http.get<string>(`archive/play/${gameId}`);
        return response.data;
    }
}

export const playerService = new PlayerService();
