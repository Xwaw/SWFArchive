import { useEffect, useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";

export default function HelloPage() {
    const [currentUser, setCurrentUser] = useState("");
    const navigate = useNavigate();

    const getUser = async () => {
      const res = await fetch("http://localhost:5092/user/get-user");

      if (!res.ok) {
        console.log("User not found or not logged");
        return;
      }

      const data = await res.json();
      setCurrentUser(data.username); 
    };

    useEffect(() => {
      getUser();
    }, []);

    const loggedOutButton = async () => {
        try {
        const res = await fetch("http://localhost:5092/user/logout", {
          method: "POST",
          headers: { "Content-Type": "application/json" }
        });

        const data = await res.json().catch(() => ({}));

        if (!res.ok) {
          console.log(data.message ?? "Logout failed");
          return;
        }

        console.log("Logout response:", data.message);

        localStorage.removeItem("username");
        navigate("/login");
      } catch (err) {
        console.error("Logout failed:", err);
      }
    };

    return (
      <div className="text-red-600 shadow-amber-800">
        <p>Hello {currentUser}</p>

        <button onSubmit={loggedOutButton}></button>
      </div>
    );
}