

export default function MobileGamePlayer() {
  return (
    <div className="w-screen h-screen bg-black flex justify-center"> {/*Background of game for example screenshots or something*/}
      <div className="w-4/5 h-full bg-gray-900 flex flex-col justify-end">
        <div className="h-full w-full bg-gray-600">

        </div>
        <div className="w-full h-10 bg-amber-400 flex flex-row justify-center">
          <div className="w-1/3 h-full flex items-center bg-red-800 gap-4 pl-4">
            <p>VOLUME: </p>
            <input
                type="range"
                min={0}
                max={100}
                value=""
                //onChange={}
                className="w-64 h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer
                          accent-amber-400"
              />
          </div>
          <div className="w-1/3 h-full bg-red-600 text-center text-2xl">
            <p>STICK ARENA BLLISTICK</p>
          </div>
          <div className="w-1/3 h-full flex items-center bg-red-800 gap-4 pl-4 justify-end pr-4">
            <p>Fullscreen: </p>
            <button className="w-10 h-full bg-amber-400">F</button>
          </div>
        </div>
      </div>
    </div>
  );
}
