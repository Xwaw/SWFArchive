import { isAxiosError } from "axios";
import { useEffect, useState } from "react";
import { playerService } from "../services/playerService";

export default function usePlayerLoad(gameId: string, isArchiveGame = false) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [url, setUrl] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setIsLoading(true);
    setError(null);
    setUrl(null);
    const load = async () => {
      try {
        if (!gameId) throw new Error("Missing game ID");
        const response = isArchiveGame
          ? await playerService.getArchiveGameUrl(gameId)
          : await playerService.getUrlGame(gameId);
        if (typeof response !== "string" || !response.trim()) throw new Error("Invalid game URL");
        if (!cancelled) setUrl(response);
      } catch (error) {
        if (cancelled) return;
        const status = isAxiosError(error) ? error.response?.status : undefined;
        setError(status === 401 ? "Log in to play this game." : status === 404 ? "Game not found." : "Could not load the game.");
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    };
    void load();
    return () => { cancelled = true; };
  }, [gameId, isArchiveGame]);

  return { isLoading, error, url };
}
