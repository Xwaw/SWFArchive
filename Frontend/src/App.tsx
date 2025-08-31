import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";

export default function App() {
    const navigate = useNavigate();
    const [user, setUser] = useState<string | null>(null);

    return (
      <div className="text-white">
        <header className="fixed top-0 left-0 w-full flex justify-between items-center p-4 bg-red-800 text-white">
          <div>
            <p>
              MAIN
            </p>
          </div>
          <div className="flex gap-4">
            {user ? (
              <div>
                <a onClick={() => {navigate("/profile")}}>{user}!</a>
              </div>
            ) : (
              <div className="flex gap-4">
                <button onClick={() => { navigate("/login") }}>Sign in</button>
              </div>
            )}
          </div>
        </header>
        <div>
            <button onClick={() => {window.open("/play-swf", "_blank", "noopener,noreferrer")}} className="font-sans">
              TEST SWF HERE
            </button>
        </div>
      </div>
    ); 
}
