import axios from "axios";
import { http } from "../../../http";

export class TagService {
  async getAllTags(name: string | null) {
    try {
      const response = await http.get("tag", { params: {name} });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const code = error.response?.status;

        if ((code === 500)) {
          console.log("server error");
          return [];
        }

        console.log("error")

        return [];
      }
    }
  }
}

export const tagService = new TagService();
