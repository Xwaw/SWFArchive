import { http } from "../../../http";

class FriendsService {
  async sendFriendRequest(friendId: string) {
    try {
      var result = await http.post(`friends/invite/${friendId}`, {});
      return result;
    } catch (error) {
      throw error;
    }
  }

  async getUsersBySearchKey(searchKey: string) {
    try {
      var result = await http.get(`friends/users/search/${searchKey}`);
      return result;
    } catch (error) {
      throw error;
    }
  }

  async getUserRequests() {
    try {
      var result = await http.get(`friends/requests`);
      return result.data;
    } catch (error) {
      throw error;
    }
  }

  async getUserFriendships(){
    try{
        var result = await http.get(`friends`);
        return result.data;
    }catch (error){
        throw error;
    }
  }

  async acceptRequest(requestId: string) {
    try {
      const result = await http.post(`friends/${requestId}/accept`, {});
      return result.data;
    } catch (error) {
      throw error;
    }
  }

  async denyRequest(requestId: string) {
    try {
      const result = await http.post(`friends/${requestId}/deny`, {});
      return result.data;
    } catch (error) {
      throw error;
    }
  }

  async getMessages(conversationId: string){
    try{
      const result = await http.get(`friends/messages/${conversationId}`);
      return result.data;
    } catch(error){
      throw error;
    }
  }
}

export const friendsService = new FriendsService();
