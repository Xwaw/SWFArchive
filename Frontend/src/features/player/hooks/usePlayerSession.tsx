import { HubConnectionBuilder, type HubConnection } from "@microsoft/signalr";
import { useEffect, useRef, useState } from "react";
import { Config } from "../../../Config";

export default function usePlayerSession(gameId: string) {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<null | string>(null);
  const connection = useRef<HubConnection | null>(null);

  useEffect(() => {
    const session = new HubConnectionBuilder()
      .withUrl(`${Config.API_URL}/sessionHub?gameId=${gameId}`)
      .build();

    connection.current = session;

    const startSession = async () => {
      await session.start();
    };

    startSession();

    const timer = setInterval(() => {
      session.invoke("Heartbeat");
    }, 60000);

    return () => {
      clearInterval(timer);

      session.stop();
      connection.current = null;
    };
  }, [gameId]);

  return {
    isLoading,
    error,
  };
}
