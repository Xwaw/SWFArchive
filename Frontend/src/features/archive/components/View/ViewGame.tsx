import type { GameViewProps } from "../../types/ComponentsProps";

export default function ViewGame({gameId}: GameViewProps) {
    if(!gameId) {
        return(
            <div>
                NO GAME FOUND
            </div>
        )
    }

  return (
    <div className="w-screen min-h-screen bg-gray-500">
      <div className="w-full h-full flex justify-center bg-blue-300">
        <div className="w-2/3 flex flex-col p-5 bg-black gap-5">
          <div className="w-full flex gap-5 bg-amber-800 p-5">

            <div className="w-1/2 h-80 flex justify-center items-center bg-cover bg-center">
              
            </div>

            <div className="w-1/2 h-80 bg-red-500 flex p-5 flex-col justify-between">
              <div>
                <p>ID: {gameId}</p>
              </div>

              <div className="flex justify-end mt-4">
                <button
                  className="bg-green-600 text-white font-bold py-2 px-6"
                  onClick={() => {console.log("NOT IMPLEMENTED: Add game")}}
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
                
              </p>
            </div>

            <p>TAGS</p>
            <div className="w-full bg-red-600 flex justify-center items-center">
              <div className="flex flex-wrap justify-center gap-2">
                
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
