import { httpForm } from "../../../http";

export class ProfileService {
  async uploadAvatar(userId: string, file: File) {
    return httpForm.post(
      `/profile/avatar/${userId}`, {file},
      { withCredentials: true },
    );
  }
}

export const profileService = new ProfileService();
