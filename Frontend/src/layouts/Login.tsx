import { useEffect, useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../components/layout/Header";

export default function Login() {
  const [user, setUser] = useState<string | null>(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!username || !password) return;

    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:5092/account/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ Username: username, Password: password }),
        credentials: "include",
      });

      if (!response.ok) {
        if (response.status === 401) {
          alert("Invalid username or password.");
        } else {
          alert("Login failed. Please try again.");
        }
      } else {
        navigate("/");
      }
    } catch (error) {
      console.error("Request failed", error);
      alert("Network error. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetch("http://localhost:5092/account/info", { credentials: "include" })
      .then((res) => {
        if (!res.ok) throw new Error("Not logged in");
        return res.json();
      })
      .then((data) => setUser(data.username))
      .catch(() => setUser(null));
  }, []);

  if (user) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="bg-red-800 p-8 rounded-lg shadow-lg text-center text-white">
          <p className="text-xl mb-4">You are already logged in as {user}</p>
          <button
            onClick={() => navigate("/")}
            className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-700"
          >
            Go to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center h-screen">
      <Header
        title="SWFArchive"
        numberSlots={2}
        slot={{
          1: (
            <Link
              className="text-white text-2xl cursor-pointer no-underline hover:text-red-400"
              to={"/"}
            >
              SWFArchive
            </Link>
          ),
          2: <button onClick={() => navigate("/profile")}>Profile</button>,
        }}
      />
      <div className="bg-red-800 p-8 rounded-lg shadow-lg w-96">
        <form onSubmit={onSubmit} className="flex flex-col gap-4">
          <h2 className="text-2xl font-bold text-white text-center">Login</h2>

          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />

          <button
            type="submit"
            disabled={isLoading}
            className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-700 disabled:bg-gray-400 text-white font-bold"
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}
