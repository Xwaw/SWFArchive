import axios from "axios";
import { httpForm } from "../../../http";

export class ArchiveService {
  async UploadNewGame(dto: FormData) {
    try {

      const response = await httpForm.post(
        `archive/upload/game`,
        dto,
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 403)
          console.log("User is not owner of this profile");

        if (error.response?.status === 500) console.log("server error");
      }
    }
  }
}

export const archiveService = new ArchiveService();
