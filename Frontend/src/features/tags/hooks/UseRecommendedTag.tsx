import { useEffect, useState } from "react";
import { tagService } from "../services/TagService";
import axios from "axios";
import type { RecommendedTag } from "../types/props";

export default function useRecommendedTags(name: string | null) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [recommendedTags, setRecommendedTags] = useState<RecommendedTag[]>([]);

  const timeRecommendation = 300;

  const fetchRecommendedTags = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await tagService.getTags(name);

      if (!response) {
        setError("Tags not found error");
        return;
      }
      setRecommendedTags(response);
    } catch (error) {
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
    setTimeout(() => {
      fetchRecommendedTags();
    }, timeRecommendation);
  }, [name]);

  return { isLoading, error, recommendedTags };
}
