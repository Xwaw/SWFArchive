
import { HubConnectionBuilder } from "@microsoft/signalr";
import { authService } from "../features/authorization/services/AuthService";
import { Config } from "../Config";
import { useEffect, useState } from "react";

export default function Test() {
  const [connection, setConnection] = useState<any>(null);

   const test = async() => {
      const connection = new HubConnectionBuilder().withUrl(Config.API_URL + "/session").build();

      connection.on("ReceiveMessage", message => {
        console.log(message);
      })

      await connection.start();

      setConnection(connection)
    }
  
    useEffect(() => {
      test();
    }, [])

  return (
    <div className="w-screen h-screen flex justify-center items-center gap-20">
      <button className="cursor-pointer bg-amber-600 hover:bg-red-600" onClick={() => authService.logout()}>
        Sign Out
      </button>
      <button className="cursor-pointer bg-amber-600 hover:bg-red-600" onClick={async () => {
        await connection.invoke("SendMessage", "YES")
      }}>
        Get YES FROM SERVER!
      </button>
    </div>
  );
}
