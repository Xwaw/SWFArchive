import { useState } from "react";
import { authService } from "../services/AuthService";
import type { AuthResult } from "../types/AuthTypes";

export default function useRegister() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const register = async (formData: FormData): Promise<AuthResult<void>> => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await authService.register(formData);

      if (result.success) {
        window.location.reload();
      }

      return result;
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, error, register };
}
