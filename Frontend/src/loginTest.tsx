import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginUser() {
    const [user, setUser] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!user || !password) return;

        const response = await fetch("http://localhost:5092/account/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ Username: user, Password: password }),
            credentials: "include"
        });

        if (response.ok) navigate("/dashboard");
        else console.error("Login failed");
    }

    return (
      <div>
        <header className="fixed top-0 left-0 w-full flex justify-between items-center p-4 bg-gray-800 text-white">
          <div>
            <p>
              LOGIN
            </p>
          </div>
          <div className="flex gap-4">
            <button onClick={() => { navigate("/")}}> Main </button>
            <button onClick={() => { navigate("/register")}}> Register </button>
          </div>
        </header>
        <div>
          <form onSubmit={onSubmit} className="flex flex-col gap-5">
            <p className="text-red-600">Login here</p>
            <input
              type="text" 
              placeholder="login"
              value={user}
              onChange={(e) => setUser(e.target.value)}
            />
            <input 
              type="password" 
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit">login</button>
          </form>
        </div>
      </div>
    );
}
