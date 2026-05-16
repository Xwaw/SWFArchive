import { isAxiosError } from "axios";
import { useState } from "react";
import { libraryService } from "../services/LibraryService";

export default function useLibrary(gameId: string) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const addGameToLibrary = async () => {
    try {
      setIsLoading(true);

      setError(null);
      setMessage(null);

      const response = await libraryService.AddToLibrary(gameId);

      setMessage(response);
    } catch (error) {
      if (isAxiosError(error)) {
        const errorCode = error.response?.status;

        if (errorCode === 500) {
          setError("Server Error");
          return;
        }

        if (errorCode === 401) {
          setError("User not logged in");
          return;
        }
      }

      setError("Error on trying add game to library");
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    message,
    error,
    addGameToLibrary,
  };
}