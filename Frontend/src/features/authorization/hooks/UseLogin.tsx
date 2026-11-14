import { useState } from "react";
import { authService } from "../services/AuthService";
import type { AuthResult } from "../types/AuthTypes";

export default function useLogin() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = async (formData: FormData): Promise<AuthResult<void>> => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await authService.login(formData);

      if (result.success) {
        window.location.reload();
      }

      return result;
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, error, login };
}
