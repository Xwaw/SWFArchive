import { useEffect, useState } from "react";
import axios from "axios";
import { archiveService } from "../services/ArchiveService";
import type { PaginatedArchive } from "../types/ComponentsProps";

export default function useArchive(search?: string, sortBy?: string, tagIds?: string) {
  const [isLoading, setIsLoading] = useState(true);
  const [archive, setArchive] = useState<PaginatedArchive | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    let currentPage = 0;
    let totalPages = 0;
    let isFetching = false;

    setArchive(null);

    const fetchArchive = async (page: number) => {
      if (isFetching) return;
      isFetching = true;
      setIsLoading(true);
      setError(null);
      try {
        const result: PaginatedArchive | null = await archiveService.GetArchive({
          currentPage: page, search, sortBy, tagIds,
        });
        if (!active) return;
        if (!result) {
          totalPages = 0;
          return;
        }
        currentPage = page;
        totalPages = result.items.length === 0 ? page : result.total;
        setArchive((prev) => {
          const existingIds = new Set(prev?.items.map((game) => game.id));
          return {
            ...result,
            items: [
              ...(prev?.items ?? []),
              ...result.items.filter((game) => !existingIds.has(game.id)),
            ],
          };
        });
      } catch (error) {
        if (!active) return;
        const status = axios.isAxiosError(error) ? error.response?.status : undefined;
        setError(status === 500 ? "Server error" : "ERROR: " + (status ?? "unknown"));
      } finally {
        isFetching = false;
        if (active) setIsLoading(false);
      }
    };

    const onScroll = () => {
      const atBottom = window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 5;
      if (!atBottom || isFetching || currentPage >= totalPages) return;
      void fetchArchive(currentPage + 1);
    };

    void fetchArchive(1);
    window.addEventListener("scroll", onScroll);
    return () => {
      active = false;
      window.removeEventListener("scroll", onScroll);
    };
  }, [search, sortBy, tagIds]);

  return { isLoading, archive, error };
}
