import { Config } from "../../../../Config";
import TagItem from "../../../tags/components/TagItem";
import useGameInfo from "../../hooks/UseGameInfo";
import type { GameViewProps } from "../../types/ComponentsProps";

export default function ViewGame({ gameId }: GameViewProps) {
  const { data, error, isLoading } = useGameInfo(gameId ?? "");

  if (error) {
    return <div>{error}</div>;
  }

  console.log(Config.API_URL + data?.thumbnailUrl);

  return (
    <div className="">
      <div className="w-full flex gap-5 bg-amber-800 p-2">
        <div className="w-1/2 h-80 flex justify-center items-center bg-cover bg-center">
          {isLoading ? (
            "isLoading"
          ) : (
            <div
              className="w-full h-full"
              style={{
                backgroundImage: `url(${Config.API_URL + data?.thumbnailUrl})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />
          )}
        </div>

        <div className="w-1/2 h-80 bg-linear-to-br from-red-600 to-red-950 border-2 border-black flex p-2 flex-col justify-between">
          <div>
            <p
              style={{
                fontSize: 35,
              }}
            >
              {isLoading ? "isLoading" : data?.title}
            </p>
            <p
              style={{
                fontSize: 25,
              }}
            >
              {isLoading ? "isLoading" : data?.playsCount}
            </p>
            <p
              style={{
                fontSize: 25,
              }}
            >
              {isLoading ? "isLoading" : data?.starsRated}
            </p>
            <p
              style={{
                fontSize: 25,
              }}
            >
              {isLoading ? "isLoading" : data?.uploaded}
            </p>
          </div>

          <div className="flex justify-end mt-4">
            <button
              className="bg-green-600 text-white font-bold py-2 px-6"
              onClick={() => {
                console.log("NOT IMPLEMENTED: Add game");
              }}
            >
              Add to Library
            </button>
          </div>
        </div>
      </div>

      <div className="w-full h-30 flex gap-5 flex-col items-center p-2">
        <div className="w-4/5 h-4/5 bg-red-600 flex justify-center items-center flex-col">
          <p className="w-full h-10 flex justify-center p-2 bg-yellow-600">
            Description
          </p>
          <p className="w-full h-full break-before-all break-all flex justify-center p-2 bg-amber-800 overflow-y-scroll">
            a
          </p>
        </div>

        <p>TAGS</p>
        <div className="w-full flex justify-center items-center">
          {data?.tags.map((value, index) => {
            console.log(value);
            return (
              <div key={index} className="w-30 h-full">
                <TagItem>{value}</TagItem>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
