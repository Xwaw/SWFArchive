import { http, httpForm } from "../../../http";
import type { QuerySearch } from "../types/ComponentsDto";

export class ArchiveService {
  async GetArchive(queryDto: QuerySearch){
    try {
      const response = await http.get("archive", {
        params: queryDto
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async UploadNewGame(formDto: FormData) {
    try {
      const response = await httpForm.post(
        `archive/upload/game`,
        formDto,
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}

export const archiveService = new ArchiveService();
