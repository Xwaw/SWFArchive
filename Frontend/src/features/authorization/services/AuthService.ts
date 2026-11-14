import axios from "axios";
import { http, httpForm } from "../../../http";
import type { AuthResult, UserDto } from "../types/AuthTypes";

const controller = "/" + "account";

export class AuthService {
  async login(
    form: FormData
  ): Promise<AuthResult<void>> {
    try {
      await httpForm.post(`${controller}/login`, form);

      return { success: true };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const status = error.response?.status;

        if (status === 401)
          return {
            success: false,
            error: "Invalid email or password. Try again.",
          };

        if (status === 409)
          return { success: false, error: "User is already logged in." };
      }

      return { success: false, error: "Server error" };
    }
  }

  async register(
    form: FormData
  ): Promise<AuthResult<void>> {
    try {
      await httpForm.put(`${controller}/register`, form);

      return { success: true };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const status = error.response?.status;

        if (status === 409)
          return { success: false, error: "User is already logged in." };

        if (status === 400)
          return { success: false, error: "Error with created user." };
      }

      return { success: false, error: "Server error" };
    }
  }

  async logout(): Promise<AuthResult<void>> {
    try {
      await http.post(`${controller}/logout`, {});
      return { success: true };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const status = error.response?.status;

        if (status === 400)
          return { success: false, error: "Error with signing out." };

        if (status === 403)
          return { success: false, error: "User is already logged out." };
      }

      return { success: false, error: "Server error" };
    }
  }

  async getMe(): Promise<AuthResult<UserDto>> {
    try {
      var result = await http.get(`${controller}/me`);
      return { success: true, data: result.data };
    } catch (error) {
      return { success: false, error: "Server error" };
    }
  }

  async sendEmailWithResetLink(email: string): Promise<AuthResult<undefined>> {
    try {
      await http.post(`${controller}/forgot-password`, { Email: email });
      return { success: true, data: undefined };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const status = error.response!.status;

        if (status >= 500)
          return { success: false, error: "Server unavailable" };
      }

      return { success: false, error: "Network error" };
    }
  }

  async resetPassword(
    email: string,
    token: string,
    newPassword: string,
  ): Promise<AuthResult<undefined>> {
    try {
      await http.put(
        `${controller}/reset-password?token=${encodeURIComponent(token)}&email=${encodeURIComponent(email)}`,
        {
          NewPassword: newPassword,
        },
      );
      return { success: true, data: undefined };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const status = error.response!.status;

        if (status >= 500)
          return { success: false, error: "Server unavailable" };
      }

      return { success: false, error: "Network error" };
    }
  }

  async changePassword(
    oldPassword: string,
    newPassword: string,
  ): Promise<AuthResult<void>> {
    try {
      var result = await http.put(`${controller}/change-password`, {
        OldPassword: oldPassword,
        NewPassword: newPassword,
      });
      return { success: true, data: result.data };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const status = error.response?.status;
        if (status === 400) return { success: false, error: "Invalid data." };
      }

      return { success: false, error: "Server error" };
    }
  }

  async sendEmailWithConfirmLink(email: string): Promise<AuthResult<void>>{
    try {
      await http.post(`${controller}/confirm/send`, { Email: email });
      return { success: true, data: undefined };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const status = error.response!.status;

        if (status >= 500)
          return { success: false, error: "Server unavailable" };
      }

      return { success: false, error: "Network error" };
    }
  }

  async confirmEmail(email: string, token: string): Promise<AuthResult<void>>{
    try {
      await http.post(`${controller}/confirm/email?token=${encodeURIComponent(token)}&email=${email}`, { });
      return { success: true, data: undefined };
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const status = error.response!.status;

        if (status >= 500)
          return { success: false, error: "Server unavailable" };
      }

      return { success: false, error: "Network error" };
    }
  }
}

export const authService = new AuthService();
