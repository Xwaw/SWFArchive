import { useEffect, useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [user, setUser] = useState<string | null>(null);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    if (!username || !email || !password) {
      setError("Please fill in all fields");
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch("http://localhost:5092/account/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          Username: username,
          Email: email,
          Password: password,
        }),
        credentials: "include",
      });

      if (response.ok) {
        navigate("/login");
      } else {
        const errorData = await response.json();
        setError(errorData.message || "Registration failed. Please try again.");
      }
    } catch (error) {
      setError("Network error. Please try again.");
      console.error("Register error:", error);
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
    <div className="flex items-center justify-center min-h-screen p-4">
      <div className="bg-red-800 p-8 rounded-lg shadow-lg w-full max-w-md">
        <form onSubmit={onSubmit} className="flex flex-col gap-4">
          <h2 className="text-2xl font-bold text-white text-center">
            Register
          </h2>

          {error && (
            <div className="bg-red-600 text-white px-4 py-2 rounded text-center">
              {error}
            </div>
          )}

          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
            {isLoading ? "Creating Account..." : "Register"}
          </button>

          <div className="text-center mt-4">
            <p className="text-white">
              Already have an account?{" "}
              <a
                type="button"
                onClick={() => navigate("/profile/login")}
                className="text-blue-300 hover:text-blue-200 no-underline cursor-pointer"
              >
                Login here
              </a>
            </p>
          </div>

          <div className="text-center">
            <button
              type="button"
              onClick={() => navigate("/")}
              className="text-gray-300 hover:text-white text-sm"
            >
              ← Back to Home
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
