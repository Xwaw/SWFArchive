import { useEffect, useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";

export default function App() {
    const navigate = useNavigate();
    const [currentUsername, setCurrentUsername] = useState("");
    
    useEffect(() => {
        fetch("http://localhost:5092/account/info", { credentials: "include" })
            .then(res => res.json())
            .then(data => setCurrentUsername(data.username))
            .catch(() => setCurrentUsername("The user has logged out"));
    }, []);
    
    const logout = async () => {
      const res = await fetch("http://localhost:5092/account/logout", { method: "POST", credentials: "include" })
      if(!res.ok) return "The user has logged out";
      navigate("/");
    };

    return (
        <div>
            <p>{currentUsername}</p>
            <button onClick={logout}>Logout</button>
        </div>
    ); 
}
