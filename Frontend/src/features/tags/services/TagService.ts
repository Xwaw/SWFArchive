import axios from "axios";
import { http, httpForm } from "../../../http";

export class TagService {
  async getTags(name: string | null) {
    try {
      const response = await http.get("tag", { params: {name} });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        var code = error.response?.status;

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
