import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import FlashGameComponent from "../components/layout/FlashGameComponent";
import Header from "../components/layout/Header";

export default function SwfArchiveLibrary() {
  const navigate = useNavigate();
  const [user, setUser] = useState<string | null>(null);
  const [numberOfGames, setNumberOfGames] = useState(0);
  const [selectedGame, setSelectedGame] = useState<number | null>(null);

  useEffect(() => {
    fetch("http://localhost:5092/account/info", { credentials: "include" })
      .then((res) => (res.status === 401 ? null : res.json()))
      .then((data) => setUser(data?.username ?? null))
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (!user) return;

    fetch("http://localhost:5092/library/number-games", {
      credentials: "include",
    })
      .then((res) => {
        if (res.status === 401) return 0;
        return res.json();
      })
      .then((data) => setNumberOfGames(data?.count ?? 0))
      .catch(() => setNumberOfGames(0));
  }, [user]);

  return (
    <div className="h-screen bg-gradient-to-br from-neutral-900 to-neutral-800 text-white flex flex-col overflow-hidden">
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
      <main className="flex flex-1 pt-20 pb-16 overflow-hidden">
        <section className="flex-1 w-full h-full flex items-center justify-center p-8 ">
          <div className="bg-gradient-to-br from-neutral-800 to-neutral-700 w-full max-w-4xl h-[600px] rounded-2xl shadow-2xl border-2 border-red-600/20 flex items-center justify-center">
            {selectedGame ? (
              <FlashGameComponent src="electricman.swf" />
            ) : (
              <div className="text-center text-gray-400">
                <div className="text-6xl mb-4"></div>
                <h2 className="text-2xl font-bold mb-2">
                  Welcome to SWFArchive
                </h2>
                <p>Select a game from your library to start playing</p>
                {!user && (
                  <button
                    onClick={() => navigate("/profile")}
                    className="mt-4 px-6 py-2 bg-red-700 hover:bg-red-600 rounded-lg transition-colors"
                  >
                    Login to Access Games
                  </button>
                )}
              </div>
            )}
          </div>
        </section>

        <aside className="w-80 bg-neutral-800/80 backdrop-blur-md border-l border-red-600/30 overflow-y-auto">
          <div className="p-6">
            <h3 className="text-xl font-bold text-red-400 mb-6 border-b border-red-600/30 pb-3">
              Game Library
            </h3>

            {user ? (
              <div className="space-y-3">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-gray-400">
                    Your games: {numberOfGames}
                  </span>
                  <button
                    onClick={() => alert("need fetch either")}
                    className="px-3 py-1 bg-red-700 hover:bg-red-600 rounded text-sm transition-colors"
                  >
                    +
                  </button>
                </div>

                {numberOfGames > 0 ? (
                  <div className="space-y-2">
                    {Array.from({ length: numberOfGames }).map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setSelectedGame(i + 1)}
                        className={`w-full p-4 rounded-lg text-left transition-all duration-200 hover:transform hover:scale-102 ${
                          selectedGame === i + 1
                            ? "bg-red-700/50 border-2 border-red-500"
                            : "bg-neutral-700/50 hover:bg-neutral-600/50"
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-red-600 rounded flex items-center justify-center"></div>
                          <div>
                            <p className="font-semibold">Game {i + 1}</p>
                            <p className="text-xs text-gray-400">Flash Game</p>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <div className="text-4xl mb-4"></div>
                    <p className="text-gray-400 mb-4">
                      No games in your library
                    </p>
                    <button
                      onClick={() => alert("need fetch")}
                      className="px-4 py-2 bg-red-700 hover:bg-red-600 rounded-lg transition-colors"
                    >
                      Add Your First Game
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="text-4xl mb-4"></div>
                <p className="text-gray-400 mb-4">
                  Login to access your game library
                </p>
                <button
                  onClick={() => navigate("/profile/login")}
                  className="px-4 py-2 bg-red-700 hover:bg-red-600 rounded-lg transition-colors"
                >
                  Login
                </button>
              </div>
            )}
          </div>
        </aside>
      </main>

      <footer className="fixed bottom-0 left-0 w-full p-4 bg-red-800/95 backdrop-blur-sm text-center text-sm text-gray-200 border-t border-red-600/30">
        <div className="flex justify-between items-center px-8">
          <span>SWFArchive</span>

          <span> {numberOfGames} games available</span>
        </div>
      </footer>
    </div>
  );
}
