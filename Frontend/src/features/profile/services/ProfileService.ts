import axios from "axios";
import { http, httpForm } from "../../../http";

export class ProfileService {
  async getProfile(userId: string){
    try{
      const response = await http.post(`profile/${userId}`);
      return response.data;
    } catch( error ){
      if(axios.isAxiosError(error)){
        if(error.status === 500)
          console.log("server error");
      }
    }
  }

  async ioOwner(userId: string){
    try{
      const response = await http.post(`profile/owner/${userId}`);
      return response.data;
    } catch( error ){
      if(axios.isAxiosError(error)){
        if(error.status === 500)
          console.log("server error");
      }
    }
  }

  async uploadAvatar(userId: string, file: File) {
    try{
      const response = await httpForm.post(`profile/upload/avatar/${userId}`, file);
      return response.data;
    } catch( error ){
      if(axios.isAxiosError(error)){
        if(error.status === 403)
          console.log("User is not owner of this profile");

        if(error.status === 500)
          console.log("server error");
      }
    }
  }

  async uploadBanner(userId: string, file: File) {
    try{
      const response = await httpForm.post(`profile/upload/banner/${userId}`, file);
      return response.data;
    } catch( error ){
      if(axios.isAxiosError(error)){
        if(error.status === 403)
          console.log("User is not owner of this profile");

        if(error.status === 500)
          console.log("server error");
      }
    }
  }

  async uploadBackground(userId: string, file: File) {
    try{
      const response = await httpForm.post(`profile/upload/background/${userId}`, file);
      return response.data;
    } catch( error ){
      if(axios.isAxiosError(error)){
        if(error.status === 403)
          console.log("User is not owner of this profile");

        if(error.status === 500)
          console.log("server error");
      }
    }
  }

  async updateDescription(userId: string, content: string) {
    try{
      const response = await httpForm.post(`profile/upload/description/${userId}`, content);
      return response.data;
    } catch( error ){
      if(axios.isAxiosError(error)){
        if(error.status === 403)
          console.log("User is not owner of this profile");

        if(error.status === 500)
          console.log("server error");
      }
    }
  }
}

export const profileService = new ProfileService();
