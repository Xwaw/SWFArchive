import { useEffect, useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginUser() {
  const [user, setUser] = useState<string | null>(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!username || !password) return;

    try {
      const response = await fetch("http://localhost:5092/account/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ Username: username, Password: password }),
          credentials: "include"
      });

      if (!response.ok) {
        if (response.status === 401) {
            console.error("Unauthorized - Invalid credentials");
            alert("Invalid username or password.");
        } else {
            console.error("Login failed with status:", response.status);
        }
      } else {
          navigate("/");
      }
    } catch (error) {
        console.error("Request failed", error);
    }
  };

  useEffect(() => {
      fetch("http://localhost:5092/account/info", { credentials: "include" })
          .then(res => res.json())
          .then(data => setUser(data.username))
          .catch(() => console.error("Not logged in"));
  }, []);

  return (
    <div>
      <header className="fixed top-0 left-0 w-full flex justify-between items-center p-4 bg-red-800 text-white">
        <div>
          <p>
            LOGIN
          </p>
        </div>
        <div>
          {user ? (
            <div>
              <a onClick={() => {navigate("/profile")}}>{user}!</a>
            </div>
          ) : (
            <div className="flex gap-4">
              <button onClick={() => { navigate("/register") }}>Sign on</button>
            </div>
          )}
        </div>
      </header>
      <div>
        <form onSubmit={onSubmit} className="flex flex-col gap-5">
          <p className="text-red-600">Login here</p>
          <input
            type="text" 
            placeholder="login"
            onChange={(e) => setUsername(e.target.value)}
          />
          <input 
            type="password" 
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">login</button>
        </form>
      </div>
    </div>
  );
}
