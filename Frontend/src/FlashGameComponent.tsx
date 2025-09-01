import { useEffect, useRef } from "react";

interface FlashGameProps {
  src: string;
  width?: number;
  height?: number;
}

export default function FlashGame({ src, width = 800, height = 600 }: FlashGameProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "/ruffle/ruffle.js";
    script.onload = () => {
      const ruffle = (window as any).RufflePlayer?.newest();
      if (!ruffle) return;

      ruffle.config = { publicPath: "electricman2.swf", logLeveL: "trace" };

      const player = ruffle.createPlayer();
      if (!containerRef.current) return;

      containerRef.current.innerHTML = "";
      containerRef.current.appendChild(player);

      player.style.width = `${width}px`;
      player.style.height = `${height}px`;

      player.load(src);
    };
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, [src, width, height]);

  return (
    <div
      ref={containerRef}
      className="flex items-center justify-center bg-black rounded-xl shadow-lg"
      style={{ width, height }}
    />
  );
}
