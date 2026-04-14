import { http, httpForm } from "../../../http";
import type { QuerySearch } from "../types/ComponentsDto";

export class ArchiveService {
  async GetArchive(dto: QuerySearch){
    try {
      const response = await http.get(`archive?`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async UploadNewGame(dto: FormData) {
    try {
      const response = await httpForm.post(
        `archive/upload/game`,
        dto,
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}

export const archiveService = new ArchiveService();
