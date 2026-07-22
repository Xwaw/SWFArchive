import { useEffect, useState } from "react";
import { friendsService } from "../services/FriendsService";
import { isAxiosError } from "axios";

interface UserItemProps {
  id: string;
  avatarUrl: string;
  username: string;
}

interface PaginationItems {
    items: UserItemProps[],
    Page: number,
    PageSize: number,
    Total: number
}

export default function useSearchUsers() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [users, setUsers] = useState<PaginationItems | null>(null);

  const searchUsers = async (searchKey: string) => {
    setIsLoading(true);
        try {
            const response = await friendsService.getUsersBySearchKey(searchKey);
            setUsers(response.data);
        } catch {
            setError("Something went wrong");
        } finally {
            setIsLoading(false);
        }
    };

  return {
    searchUsers,
    users,
    error,
    isLoading,
  };
}
