import axios from "axios";
import { useEffect, useState, type FormEvent } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Config } from "../../Config";
import CommentSection from "../../features/comments/components/CommentSection";

interface gameViewData {
  id: string;
  title: string;
  authorName: string;
  thumbnailUrl: string;
  description: string;
  starsRated: number;
  playsCount: number;
  uploaded: string;
  modified: string;
  tags: string[];
}

export default function ArchiveGameView() {
  const [game, setGame] = useState<gameViewData | null>();

  const { id } = useParams();

  const getInfoGame = async () => {
    try {
      const response = await axios.get<gameViewData | any>(
        `${Config.API_URL}/archive/game/${id}`,
        { withCredentials: true }
      );
      setGame(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const addGameToLibrary = async () => {
    try {
      const response = await axios.post(
        `${Config.API_URL}/library/add/${id}`,
        {},
        { withCredentials: true }
      );
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!id) return;
    getInfoGame();
  }, [id]);

  return (
    <div className="w-screen min-h-screen bg-gray-500">
      {/* background */}

      <div className="w-full h-full flex justify-center bg-blue-300">
        <div className="w-2/3 flex flex-col p-5 bg-black gap-5">
          {/* === MAIN SECTION GAME === */}
          <div className="w-full flex gap-5 bg-amber-800 p-5">
            {/* IMG */}
            <div className="w-1/2 h-80 flex justify-center items-center bg-cover bg-center">
              {game?.thumbnailUrl && (
                <img
                  className="w-full h-full object-cover p-1"
                  src={`${Config.API_URL}/${game?.thumbnailUrl}`}
                  alt={game?.title}
                />
              )}
            </div>

            {/* Info obout game */}
            <div className="w-1/2 h-80 bg-red-500 flex p-5 flex-col justify-between">
              <div>
                <p className="text-6xl m-2">{game?.title}</p>
                <p className="text-3xl m-2">Author: {game?.authorName}</p>
                <p className="text-2xl m-2">Rating: {game?.starsRated}</p>
                <p className="text-2xl m-2">Plays: {game?.playsCount}</p>
                <p className="text-2xl m-2">Uploaded: {game?.uploaded}</p>
              </div>

              {/* Button „Add to Library” */}
              <div className="flex justify-end mt-4">
                <button
                  className="bg-green-600 text-white font-bold py-2 px-6"
                  onClick={addGameToLibrary}
                >
                  Add to Library
                </button>
              </div>
            </div>
          </div>

          {/* === DESC === */}
          <div className="w-full h-full flex gap-5 flex-col items-center">
            <div className="w-4/5 h-4/5 bg-red-600 flex justify-center items-center flex-col">
              <p className="w-full h-10 flex justify-center p-2 bg-amber-200">
                Description
              </p>
              <p className="w-full h-full break-before-all break-all flex justify-center p-2 bg-amber-400 overflow-y-scroll">
                {game?.description}
              </p>
            </div>

            <p>TAGS</p>
            <div className="w-full bg-red-600 flex justify-center items-center">
              <div className="flex flex-wrap justify-center gap-2">
                {game?.tags.map((value, index) => {
                  return (
                    <div key={index}>
                      <p className="w-20 h-5 bg-amber-950 text-center text-white">
                        {value}
                      </p>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div>
            <CommentSection targetId={id!} targetType={0}></CommentSection>
          </div>
        </div>
      </div>
    </div>
  );
}
