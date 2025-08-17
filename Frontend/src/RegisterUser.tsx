import { stringify } from "postcss";
import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";

export default function RegisterUser() {
    const [user, setUser] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const onSubmit = async (e : FormEvent<HTMLFormElement>)=>{
      e.preventDefault();

      if(!user || !password) return;

      try {
        const response = await fetch("http://localhost:5092/User/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ Username: user, Password: password })
        });

        const data = await response.json();
        
        console.log("Response text:", data);

        if(response.ok){
            console.log("Success:", data);
            navigate("/login");
        } else {
            console.log("Error:", data);
        }
        } catch (err) {
            console.error("Fetch failed:", err);
        }
    }

    return (
      <div>
        <p className="text-red-800">Register here </p>
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
            <button type="submit">register</button>
          </form>
        </div>
      </div>
    );
}
