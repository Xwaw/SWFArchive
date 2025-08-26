import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SwfArchiveLibrary() {
  const navigate = useNavigate();
  const [user, setUser] = useState<string | null>(null);
  const [selectedGame, setSelectedGame] = useState<number | null>(null);

  useEffect(() => {
    fetch("http://localhost:5092/account/info", { credentials: "include" })
      .then(res => res.status === 401 ? null : res.json())
      .then(data => setUser(data?.username ?? null))
      .catch(() => {});
  }, []);

  const games = [
    { id: 1, title: "Game1", cover: "https://placehold.co/600x300", description: "Description of game u are actually clicked 1", installed: true },
    { id: 2, title: "Game2", cover: "https://placehold.co/600x300", description: "Description of game u are actually clicked 2", installed: false },
    { id: 3, title: "Game3", cover: "https://placehold.co/600x300", description: "Description of game u are actually clicked 3", installed: true },
  ];

  const currentGame = games.find(g => g.id === selectedGame);

  return (
    <div className="min-h-screen bg-neutral-900 text-white flex flex-col">
      <header className="flex justify-between items-center p-4 bg-red-800">
        <h1 className="text-xl font-bold">SWFArchive</h1>
        <div>
          {user ? (
            <button onClick={() => navigate("/profile")} className="hover:underline">
              {user}
            </button>
          ) : (
            <div className="flex gap-4">
              <button onClick={() => navigate("/login")} className="hover:underline">Sign in</button>
            </div>
          )}
        </div>
      </header>

      <main className="flex-1 flex">
        <div className="flex-1 p-6 flex items-center justify-center">
          {currentGame ? (
            <div className="max-w-2xl text-center">
              <img src={currentGame.cover} alt={currentGame.title} className="rounded mb-4 mx-auto" />
              <h2 className="text-2xl font-bold mb-2">{currentGame.title}</h2>
              <p className="mb-4 text-gray-300">{currentGame.description}</p>
              <button className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded">
                {currentGame.installed ? "Play" : "Install"}
              </button>
            </div>
          ) : (
            <p className="text-gray-400"></p>
          )}
        </div>

        <aside className="w-72 bg-neutral-800 border-l border-red-700 overflow-y-auto">
          <h3 className="p-4 font-bold text-red-400">Library of games</h3>
          <div className="flex flex-col">
            {games.map(game => (
              <button
                key={game.id}
                onClick={() => setSelectedGame(game.id)}
                className={`flex items-center gap-3 p-3 border-b bg-neutral-700 hover:bg-red-700 transition ${selectedGame === game.id ? "bg-red-600" : ""}`}
              >
                <img src={game.cover} alt={game.title} className="w-12 h-12 object-cover rounded" />
                <span>{game.title}</span>
              </button>
            ))}
          </div>
        </aside>
      </main>

      <footer className="p-4 bg-red-800 text-center text-sm text-gray-200">
        SWFArchive
      </footer>
    </div>
  );
}
