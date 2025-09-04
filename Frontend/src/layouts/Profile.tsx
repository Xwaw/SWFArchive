import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../components/layout/Header";

export default function Profile() {
  const navigate = useNavigate();
  const [username, setUsername] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5092/account/info", { credentials: "include" })
      .then((res) => {
        if (!res.ok) throw new Error("Not logged in");
        return res.json();
      })
      .then((data) => setUsername(data.username))
      .catch(() => setUsername(null))
      .finally(() => setIsLoading(false));
  }, []);

  const handleLogout = async () => {
    try {
      const res = await fetch("http://localhost:5092/account/logout", {
        method: "POST",
        credentials: "include",
      });

      if (res.ok) {
        setUsername(null);
      }
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="bg-red-800 p-8 rounded-lg shadow-lg text-center">
          <div className="text-white text-xl">Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen overflow-hidden">
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
      <div className="flex-grow flex items-center justify-center h-screen p-4">
        <div className="bg-red-800 p-8 rounded-2xl shadow-2xl w-full max-w-md">
          <div className="text-center space-y-6">
            <h1 className="text-3xl font-bold text-white">
              {username ? `Welcome, ${username}!` : "Account"}
            </h1>

            <div className="space-y-4">
              {username ? (
                <div className="space-y-3">
                  <button
                    onClick={handleLogout}
                    className="w-full px-6 py-3 bg-white text-red-800 rounded-lg font-semibold hover:bg-gray-100 
                             transition-colors duration-200 transform hover:scale-105"
                  >
                    Log out
                  </button>

                  <button
                    onClick={() => navigate("/")}
                    className="w-full px-6 py-3 bg-gray-600 text-white rounded-lg font-semibold hover:bg-gray-700 
                             transition-colors duration-200"
                  >
                    Go to Home
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  <button
                    onClick={() => navigate("/profile/login")}
                    className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 
                             transition-colors duration-200 transform hover:scale-105"
                  >
                    Login
                  </button>

                  <button
                    onClick={() => navigate("/profile/register")}
                    className="w-full px-6 py-3 bg-green-600 text-white rounded-lg font-semibold hover:bg-green-700 
                             transition-colors duration-200 transform hover:scale-105"
                  >
                    Register
                  </button>

                  <button
                    onClick={() => navigate("/")}
                    className="w-full px-6 py-3 bg-gray-600 text-white rounded-lg font-semibold hover:bg-gray-700 
                             transition-colors duration-200"
                  >
                    Back to Home
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
