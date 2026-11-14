import { useEffect, useState } from "react";
import { archiveService } from "../services/ArchiveService";
import type { GameView } from "../types/ComponentsDto";
import { isAxiosError } from "axios";
import { profileService } from "../../profile/services/ProfileService";
import type { ProfileSummaryDto } from "../../profile/types/models";

export default function useGameInfo(gameId: string) {
    const [data, setData] = useState<GameView | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [publisherProfile, setPublisherProfile] = useState<ProfileSummaryDto | null>(null);
    const [authorProfile, setAuthorProfile] = useState<ProfileSummaryDto | null>(null);
    const [profileError, setProfileError] = useState<string | null>(null);

    useEffect(() => {
        let cancelled = false;
        setData(null);
        setIsLoading(true);
        setError(null);

        const fetchGameData = async () => {
            try {
                const gameData = await archiveService.GetGameData(gameId);
                if (!cancelled) setData(gameData);
            } catch (error) {
                if (cancelled) return;

                if (isAxiosError(error)) {
                    const status = error.response?.status;
                    if (status === 500) {
                        setError("Server Error");
                    } else if (status === 404) {
                        setError("No Game found with this ID");
                    } else {
                        setError(`${status ?? "Unknown"}: Could not load game.`);
                    }
                } else {
                    setError("Could not load game information.");
                }
            } finally {
                if (!cancelled) setIsLoading(false);
            }
        };

        void fetchGameData();

        return () => {
            cancelled = true;
        };
    }, [gameId]);

    useEffect(() => {
        if (!data) return;

        let cancelled = false;
        setPublisherProfile(null);
        setAuthorProfile(null);
        setProfileError(null);

        const authorProfileRequest = data.authorName.trim()
            ? profileService.getProfileSummaryByUserName(data.authorName)
            : Promise.resolve(null);

        void Promise.allSettled([
            profileService.getProfileSummary(data.publisherId),
            authorProfileRequest,
        ]).then(([publisherResult, authorResult]) => {
            if (cancelled) return;

            if (publisherResult.status === "fulfilled") {
                setPublisherProfile(publisherResult.value);
            }
            if (authorResult.status === "fulfilled") {
                setAuthorProfile(authorResult.value);
            }

            if (
                publisherResult.status === "rejected" ||
                authorResult.status === "rejected"
            ) {
                setProfileError("Could not load one or more profiles.");
            }
        });

        return () => {
            cancelled = true;
        };
    }, [data?.publisherId, data?.authorName]);

    return {
        data,
        error,
        isLoading,
        publisherProfile,
        authorProfile,
        profileError,
    };
}