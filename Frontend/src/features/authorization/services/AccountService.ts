import axios from "axios";
import type { AccountResult, UserDto } from "../types/AuthTypes";
import { http } from "../../../http";

export class AccountService {
  async getUser(): Promise<AccountResult<UserDto | null>> {
    try {
      var result = await http.get(`account/me`);
      return { success: true, data: result.data };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const status = error.response?.status;

        if (status === 400)
          return { success: false, error: "Error with getting user." };

        if (status === 403 || status === 401)
          return {
            success: false,
            data: null,
            error: "User is not logging in.",
          };
      }

      return { success: false, error: "Server error" };
    }
  }

  async confirmUserAccount(userId: string): Promise<AccountResult<boolean>> {
    try {
      var result = await http.get(`account/is-yours/${userId}`);
      return { success: true, data: result.data };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const status = error.response?.status;

        if (status === 400)
          return { success: false, error: "Error with confirming user." };

        if (status === 403 || status === 401)
          return {
            success: false,
            data: false,
            error: "User is not logging in.",
          };
      }

      return { success: false, error: "Server error" };
    }
  }
}

export const accountService = new AccountService();
