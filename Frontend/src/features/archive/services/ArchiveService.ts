import { http, httpForm } from "../../../http";

export class ArchiveService {
  async GetArchive(currentPage: number){
    try {
      const response = await http.get(`archive/load/${currentPage}`);
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
