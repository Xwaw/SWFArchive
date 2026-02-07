import axios from "axios";
import { useEffect, useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";

interface gameUploadData {
  title: string;
  description?: string | null;
  tags: string[];
  thumbnail?: File | null;
  game: File;
}

export default function UploadGameToArchive() {
  const API_URL = import.meta.env.VITE_API_URL;

  const [uploadData, setUploadData] = useState<gameUploadData>({
    title: "",
    description: "",
    tags: [],
    thumbnail: null,
    game: null as any,
  });

  const uploadGame = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);

    const game = formData.get("SwfGame") as File | null;
    if (!game || game.size === 0) {
      alert("Nie wybrałeś pliku gry!");
      return;
    }

    formData.append("tags", JSON.stringify(uploadData.tags));

    try {
      const res = await axios.post(`${API_URL}/archive/upload/game`, formData, {
        withCredentials: true,
      });

      console.log("Uploaded!", res.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="w-screen h-screen bg-gray-500">
      {/* background */}
      <div className="w-full h-full flex items-center bg-blue-300">
        <form
          className="w-full h-4/5 p-5 bg-black gap-5 flex items-center justify-center flex-col"
          onSubmit={uploadGame}
        >
          <div className="flex flex-row gap-5">
            <div className="w-100 h-60 bg-amber-500 flex flex-col justify-center items-center p-2 gap-2 ">
              <p>Thumbnail</p>
              <input
                className="w-full h-1/2 bg-amber-800"
                type="file"
                name="thumbnail"
                accept="image/*"
              />
              <p>Game</p>
              <input
                className="w-full h-1/2 bg-amber-200"
                type="file"
                name="SwfGame"
                accept=".swf"
              />
            </div>
            <div className="w-100 h-60 bg-amber-500 flex flex-col justify-center items-center p-2 gap-2 ">
              <p>TAGS</p>
              <div className="flex flex-wrap justify-center gap-2">
                <p className="w-20 h-5 bg-amber-950 text-center">Popular</p>
              </div>
            </div>
          </div>
          <div className="flex flex-row gap-5 w-full justify-center text-right align-top">
            <div className="w-1/3 h-100 bg-amber-500 flex flex-col justify-center items-center p-2 gap-2">
              <p>TITLE</p>
              <input
                className="bg-red-600 w-full"
                type="text"
                name="title"
                required
              />

              <p>Description</p>
              <textarea
                className="w-full h-full bg-red-500 text-left align-top p-2 resize-none"
                name="description"
              ></textarea>
            </div>
          </div>
          <div>
            <button className="bg-amber-400 w-40 h-10" type="submit">
              Upload
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
