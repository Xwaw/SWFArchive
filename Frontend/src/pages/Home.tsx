import { HubConnectionBuilder } from "@microsoft/signalr";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Config } from "../Config";

export default function Home() {
  const navigate = useNavigate();
    

  return (
    <div className="w-screen h-screen bg-gray-500 flex items-center">
      <div className="w-screen h-2/3 bg-black flex justify-center items-center gap-25">
        <div className="bg-green-400 w-80 h-30 flex justify-center items-center text-4xl" onClick={()=>{navigate("/auth/login")}}>
          Login
        </div>
        <div className="bg-green-400 w-80 h-30 flex justify-center items-center text-4xl" onClick={()=>{navigate("/archive")}}>
          Archive
        </div>

      </div>
    </div>
  );
}
