import { isAxiosError } from "axios";
import { http } from "../../../http";

class FriendsService{
    async getUsersBySearchKey(searchKey: string){
        try{
            var result = await http.get(`friends/users/search/${searchKey}`)
            return result
        }catch(error){
            throw error
        }
    }
}

export const friendsService = new FriendsService();