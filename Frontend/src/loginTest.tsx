import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginUser() {
    const [user, setUser] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const onSubmit = async (e : FormEvent<HTMLFormElement>)=>{
      e.preventDefault();

        if (!user || !password) return;

        try {
            const response = await fetch("http://localhost:5092/user/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username: user, password: password })
            });

            const data = await response.text();
            console.log("Status:", response.status);
            console.log("Response:", data);

            if (response.ok) {
                localStorage.setItem("username", user);
                navigate("/dashboard");
            } else {
                console.error("Login failed:", data);
            }
        } catch (err) {
            console.error("Fetch failed:", err);
        }
    }

    return (
      <div>
        <div>
          <form onSubmit={onSubmit}>
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
