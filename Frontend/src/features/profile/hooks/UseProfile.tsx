import { useEffect, useState } from "react";
import type { ProfileDto } from "../types/models";
import { profileService } from "../services/ProfileService";
import axios from "axios";

export const useProfile = (userId?: string) => {
  const [profile, setProfile] = useState<ProfileDto | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProfile = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = userId
        ? await profileService.getProfile(userId)
        : await profileService.getMyProfile();
      if (!response) {
        setError("Profile not found");
        return;
      }
      setProfile(response);
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
    fetchProfile();
  }, [userId]);

  return { profile, isLoading, error };
};
