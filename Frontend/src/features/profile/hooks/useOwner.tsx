import { profileService } from "../services/ProfileService";
import { useEffect, useState } from "react";

export const useOwner = (userId: string) => {
  const [isOwner, setIsOwner] = useState<boolean>(false);

  useEffect(() => {
    const check = async () => {
      const result = await profileService.isOwner(userId);
      setIsOwner(result ?? false);
    };

    if (userId) {
      check();
    }
  }, [userId]);

  return ({isOwner});
};
