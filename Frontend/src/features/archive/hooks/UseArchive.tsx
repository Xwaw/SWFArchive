import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { archiveService } from "../services/ArchiveService";
import type { PaginatedArchive } from "../types/ComponentsProps";
import type { QuerySearch } from "../types/ComponentsDto";

export default function useArchive(
  search?: string,
  sortBy?: string,
  tagIds?: string,
) {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [archive, setArchive] = useState<PaginatedArchive | null>();
  const [error, setError] = useState<string | null>(null);

  const currentPage = useRef<number>(0);
  const totalPages = useRef<number>(0);
  const isFetchingRef = useRef(false);

  const fetchScrollingArchive = async () => {
    const atBottom =
      window.scrollY + window.innerHeight >=
      document.documentElement.scrollHeight - 5;
    if (!atBottom) return;
    if (isFetchingRef.current) return;
    if (currentPage.current >= totalPages.current) return;

    isFetchingRef.current = true;

    currentPage.current += 1;

    await fetchArchive({
      currentPage: currentPage.current,
      search: search,
      tagIds: tagIds,
      sortBy: sortBy,
    });
    isFetchingRef.current = false;
  };

  const fetchArchive = async (querySearch: QuerySearch) => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await archiveService.GetArchive(querySearch);

      if (!result) {
        setArchive(null);
        return;
      }

      totalPages.current = result.total;
      setArchive((prev) => ({
        ...result,
        items: [...(prev?.items ?? []), ...result.items],
      }));
    } catch (error) {
      setIsLoading(false);
      if (axios.isAxiosError(error)) {
        const errorCode = error.response?.status;
        if (errorCode === 500) {
          setError("Server error");
          return;
        }

        setError("ERROR: " + (errorCode ?? "unknown"));
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    currentPage.current = 0;
    totalPages.current = 0;
    setArchive(null);

    fetchArchive({
      currentPage: currentPage.current,
      search: search,
      tagIds: tagIds,
      sortBy: sortBy,
    });
  }, [search, tagIds, sortBy]);

  useEffect(() => {
    window.addEventListener("scroll", fetchScrollingArchive);

    return () => {
      window.removeEventListener("scroll", fetchScrollingArchive);
    };
  }, [search, sortBy, tagIds]);

  return { isLoading, archive, error };
}
