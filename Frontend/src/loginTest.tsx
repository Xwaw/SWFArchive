import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginUser() {
    const [user, setUser] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const onSubmit = (e : FormEvent<HTMLFormElement>)=>{
      e.preventDefault();

      if(!user) return;

      navigate("/hello")
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
