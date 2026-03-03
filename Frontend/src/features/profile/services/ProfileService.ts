import axios from "axios";
import { http, httpForm } from "../../../http";
import type { ProfileDto } from "../types/models";

export class ProfileService {
  async getProfile(userId: string): Promise<ProfileDto | undefined>{
    try{
      const response = await http.get(`profile/${userId}`);
      return response.data;
    } catch( error ){
      if(axios.isAxiosError(error)){
        if(error.response?.status === 500)
          console.log("server error");
      }
    }
  }

  async uploadAvatar(userId: string, file: File): Promise<string | undefined> {
    try{
      const formData = new FormData();
      formData.append("file", file);

      const response = await httpForm.post(`profile/upload/avatar/${userId}`, formData);
      return response.data;
    } catch( error ){
      if(axios.isAxiosError(error)){
        if(error.response?.status === 403)
          console.log("User is not owner of this profile");

        if(error.response?.status === 500)
          console.log("server error");
      }
    }
  }

  async uploadBanner(userId: string, file: File): Promise<string | undefined> {
    try{
      const formData = new FormData();
      formData.append("file", file);

      const response = await httpForm.post(`profile/upload/banner/${userId}`, formData);
      return response.data;
    } catch( error ){
      if(axios.isAxiosError(error)){
        if(error.response?.status === 403)
          console.log("User is not owner of this profile");

        if(error.response?.status === 500)
          console.log("server error");
      }
    }
  }

  async uploadBackground(userId: string, file: File): Promise<string | undefined> {
    try{
      const formData = new FormData();
      formData.append("file", file);

      const response = await httpForm.post(`profile/upload/background/${userId}`, formData);
      return response.data;
    } catch( error ){
      if(axios.isAxiosError(error)){
        if(error.response?.status === 403)
          console.log("User is not owner of this profile");

        if(error.response?.status === 500)
          console.log("server error");
      }
    }
  }

  async updateDescription(userId: string, content: string): Promise<string | undefined> {
    try{
      const formData = new FormData();
      formData.append("description", content);

      const response = await httpForm.patch(`profile/upload/description/${userId}`, formData);
      return response.data;
    } catch( error ){
      if(axios.isAxiosError(error)){
        if(error.response?.status === 403)
          console.log("User is not owner of this profile");

        if(error.response?.status === 500)
          console.log("server error");
      }
    }
  }
}

export const profileService = new ProfileService();
