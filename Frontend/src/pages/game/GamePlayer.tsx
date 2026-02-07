import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_URL;

export default function GamePlayer() {
  const gameRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<any>(null);
  const { state } = useLocation();

  const game = state?.game;
  const [volume, setVolume] = useState<number>(100);

  const appendRuffleToDiv = () => {
    if (!window.RufflePlayer) return;

    const ruffle = window.RufflePlayer.newest();
    const player = ruffle.createPlayer();

    playerRef.current = player;

    player.style.width = "1535px";
    player.style.height = "910px";

    const container = gameRef.current!;
    container.innerHTML = "";
    container.appendChild(player);

    player.load(`${API_URL}${game.swfUrl}`);
  };

  const setFullscreen = () => {
    playerRef.current?.requestFullscreen();
  };

  const setVolumeOfGame = () => {
    playerRef.current.volume = volume / 100;
  };

  useEffect(() => {
    appendRuffleToDiv();
  }, []);

  useEffect(() => {
    setVolumeOfGame();
  }, [volume]);

  return (
    <div className="w-screen h-screen bg-black flex justify-center">
      {/*Background of game for example screenshots or something*/}
      <div className="w-4/5 h-full bg-gray-900 flex flex-col justify-end">
        <div className="h-full w-full bg-gray-600" ref={gameRef}></div> {/*Game Player*/}
        <div className="w-full h-10 bg-amber-400 flex flex-row justify-center">
          <div className="w-1/3 h-full flex items-center bg-red-800 gap-4 pl-4">
            <p>VOLUME:</p>
            <input
              type="range"
              min={0}
              max={100}
              value={volume}
              onChange={(e) => setVolume(Number(e.target.value))}
              className="w-64 h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer
                          accent-amber-400"
            />
            <p>{volume}%</p>
          </div>
          <div className="w-1/3 h-full bg-red-600 text-center text-2xl">
            <p>{game.title}</p>
          </div>
          <div className="w-1/3 h-full flex items-center bg-red-800 gap-4 pl-4 justify-end pr-4">
            <p>Fullscreen: </p>
            <button className="w-10 h-full bg-blue-600" onClick={setFullscreen}>
              F
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
