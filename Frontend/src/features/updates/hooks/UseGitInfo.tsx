
import { useEffect, useState } from "react";

interface GitInfo {
  sha: string;
  date: string;
  message: string;
  author: string;
}

interface GitHubCommit {
  sha: string;
  commit: {
    author: {
      name: string;
      date: string;
    };
    message: string;
  };
}

const git =
  "https://api.github.com/repos/Xwaw/SWFArchive/commits?per_page=20";

export default function useGitInfo() {
  const [updates, setUpdates] = useState<GitInfo[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchGitInfo = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(git);

      if (!response.ok) {
        throw new Error(`Failed to fetch git info: ${response.status}`);
      }

      const data: GitHubCommit[] = await response.json();

      const newUpdates = data.map((git) => ({
        sha: git.sha,
        date: git.commit.author.date,
        message: git.commit.message,
        author: git.commit.author.name,
      }));

      setUpdates(newUpdates);
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "An unknown error occurred"
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchGitInfo();
  }, []);

  return { updates, isLoading, error, fetchGitInfo };
}
