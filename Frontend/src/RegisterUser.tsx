import { stringify } from "postcss";
import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";

export default function RegisterUser() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const response = await fetch("http://localhost:5092/account/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ Username: username, Email: email, Password: password }),
            credentials: "include"
        });
        
        if (response.ok) navigate("/login");
        else console.error("Register failed");
    }

    return (
      <div>
        <header className="fixed top-0 left-0 w-full flex justify-between items-center p-4 bg-gray-800 text-white">
          <div>
            <p>
              REGISTER
            </p>
          </div>
          <div className="flex gap-4">
            <button onClick={() => { navigate("/")}}> Main </button>
            <button onClick={() => { navigate("/login")}}> Login </button>
          </div>
        </header>
        <p className="text-red-800">Register here </p>
        <div>
          <form onSubmit={onSubmit} className="flex flex-col gap-5">
            <input 
              type="text" 
              placeholder="username"
              onChange={(e) => setUsername(e.target.value)}
            />
            <input 
              type="password" 
              placeholder="password"
              onChange={(e) => setPassword(e.target.value)}
            />
              <input 
              type="text" 
              placeholder="email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <button type="submit">Register</button>
          </form>
        </div>
      </div>
    );
}
