import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import FlashGameComponent from "./FlashGameComponent";
export default function SwfArchiveLibrary() {
  const navigate = useNavigate();
  const [user, setUser] = useState<string | null>(null);

  const [numberOfGames, setNumberOfGames] = useState(0);

  useEffect(() => {
    fetch("http://localhost:5092/account/info", { credentials: "include" })
      .then(res => res.status === 401 ? null : res.json())
      .then(data => setUser(data?.username ?? null))
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (!user) return;

    fetch("http://localhost:5092/library/number-games", { credentials: "include" })
      .then(res => {
        if (res.status === 401) return 0;
        return res.json();
      })
      .then(data => setNumberOfGames(data?.count ?? 0))
      .catch(() => setNumberOfGames(0));
  }, [user])

  return (
    <div className="h-screen bg-neutral-900 text-white flex flex-col overflow-hidden">
      <header className="fixed top-0 left-0 w-full flex justify-between items-center p-4 bg-red-800 z-10">
        <h1 className="text-xl font-bold">SWFArchive</h1>
        <div>
          {user ? (
            <button onClick={() => navigate("/profile")} className="hover:underline">
              {user}
            </button>
          ) : (
            <button onClick={() => navigate("/login")} className="hover:underline">
              Sign in
            </button>
          )}
        </div>
      </header>

      <main className="flex flex-1 pt-16 pb-12 overflow-hidden">
        <aside className="w-72 bg-neutral-800 border-r border-red-700 overflow-y-auto">
          <h3 className="p-4 font-bold text-red-400">Library</h3>
          <div className="flex flex-col space-y-2 p-2">
            {user ? (
              <div>
                {numberOfGames > 0 ? (
                  Array.from({ length: numberOfGames }).map((_, i) => (
                    <button
                      key={i}
                      className="p-2 bg-neutral-700 hover:bg-neutral-600 rounded text-left"
                    >
                      Game {i + 1}
                    </button>
                  ))
                ) : (
                  <button onClick={() => alert("Add games here")}>
                    Add games here
                  </button>
                )}
              </div>
            ) : (
              <p>You aren't signed in</p>
            )}
          </div>
        </aside>

        <section className="flex-1 flex items-center justify-center bg-neutral-900">
          <div className="bg-neutral-700 w-[800px] h-[600px] flex items-center justify-center rounded-lg shadow-lg">
            <FlashGameComponent src="./public/games/electricman.swf"/>
          </div>
        </section>
      </main>

      <footer className="fixed bottom-0 left-0 w-full p-4 bg-red-800 text-center text-sm text-gray-200">
        SWFArchive
      </footer>
    </div>
  );
}



