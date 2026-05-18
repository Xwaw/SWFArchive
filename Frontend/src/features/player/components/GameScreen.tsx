import { useEffect, useRef, useState } from "react";

export default function GamePlayer({ swfUrl }: { swfUrl: string }) {
  const ruffleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
  const setup = async () => {
    const ruffle = window.RufflePlayer.newest();
    const player = ruffle.createPlayer();

    ruffleRef.current?.appendChild(player);

    await player.load(swfUrl);
  };

  setup();
}, [swfUrl]);

  return (
    <div className="flex justify-center items-center" >
      <div ref={ruffleRef} className="w-full h-full" 
      />
    </div>
  );
}
