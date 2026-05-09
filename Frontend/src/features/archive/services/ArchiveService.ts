import { http, httpForm } from "../../../http";
import type { QuerySearch } from "../types/ComponentsDto";

export class ArchiveService {
  async GetArchive(queryDto: QuerySearch) {
    try {
      const params = new URLSearchParams();

      if (queryDto.search) {
        params.append("search", queryDto.search);
      }

      if (queryDto.sortBy) {
        params.append("sortBy", queryDto.sortBy);
      }

      if (queryDto.tagIds) {
        queryDto.tagIds.split(",").forEach((id) => {
          params.append("tagIds", id);
        });
      }

      const response = await http.get(`archive?${params.toString()}`);

      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async UploadNewGame(formDto: FormData) {
    try {
      const response = await httpForm.post(`archive/upload/game`, formDto);
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}

export const archiveService = new ArchiveService();
