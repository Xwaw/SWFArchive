import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { archiveService } from "../services/ArchiveService";
import type { PaginatedArchive } from "../types/ComponentsProps";

export default function useArchive() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [archive, setArchive] = useState<PaginatedArchive>();
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
    if(currentPage.current >= totalPages.current) return

    isFetchingRef.current = true;

    currentPage.current += 1;
    await fetchArchive(currentPage.current);
    isFetchingRef.current = false;
  };

  const fetchArchive = async (currentPage: number) => {
    setIsLoading(true);
    setError(null);

    try {
      const result = await archiveService.GetArchive(currentPage);
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
    fetchArchive(currentPage.current);
  }, []);

  useEffect(() => {
    addEventListener("scroll", fetchScrollingArchive);
  }, []);

  return { isLoading, archive, error };
}
