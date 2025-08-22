import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const [currentUser, setCurrentUser] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        fetch("http://localhost:5092/account/get-account", { credentials: "include" })
            .then(res => res.json())
            .then(data => setCurrentUser(data.userName))
            .catch(() => console.error("Not logged in"));
    }, []);

    const logout = async () => {
        await fetch("http://localhost:5092/account/logout", { method: "POST", credentials: "include" });
        navigate("/login");
    };

  return (
    <div className="text-red-600 shadow-amber-800">
      <p>Hello {currentUser}</p>
      <button onClick={logout}>Logout</button>
    </div>
  );
}
