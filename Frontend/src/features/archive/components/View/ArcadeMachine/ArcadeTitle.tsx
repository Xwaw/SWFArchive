import { useLayoutEffect, useRef, useState } from "react";

type ArcadeTitleProps = {
  title: string;
};

export default function ArcadeTitle({ title }: ArcadeTitleProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const [scaleY, setScaleY] = useState(2.75);

  useLayoutEffect(() => {
    const container = containerRef.current;
    const titleElement = titleRef.current;

    if (!container || !titleElement) return;

    const updateScale = () => {
      const padding = getComputedStyle(container);
      const availableHeight =
        container.clientHeight -
        Number.parseFloat(padding.paddingTop) -
        Number.parseFloat(padding.paddingBottom) -
        4;
      const titleHeight = titleElement.offsetHeight;

      if (titleHeight === 0) return;

      const scaleToFit =
        (availableHeight / (2 * titleHeight) + 0.15) / 0.65;
      const nextScale = Math.min(2.75, scaleToFit);
      setScaleY((currentScale) =>
        Math.abs(currentScale - nextScale) < 0.01 ? currentScale : nextScale,
      );
    };

    const observer = new ResizeObserver(updateScale);
    observer.observe(container);
    observer.observe(titleElement);
    updateScale();

    return () => observer.disconnect();
  }, [title]);

  return (
    <div
      ref={containerRef}
      className="
        pointer-events-none absolute left-1/2 top-0 z-40 flex h-full
        w-[min(44%,820px)] -translate-x-1/2 items-center justify-center p-2
        max-[640px]:w-[32%]
      "
      style={{ containerType: "size", perspective: "600px" }}
    >
      <h1
        ref={titleRef}
        className="w-[76%] max-w-full text-center font-black leading-none"
        style={{
          backgroundImage:
            "linear-gradient(90deg, #00f5d4 0%, #7bff00 50%, #f9f871 100%)",
          backgroundClip: "text",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          fontFamily: "Arial, sans-serif",
          fontSize: "clamp(18px, 7cqw, 80px)",
          letterSpacing: "0.025em",
          overflowWrap: "anywhere",
          WebkitTextStroke: "2.5px #fff",
          textShadow: "0 4px 3px #000b",
          transform: `rotateX(20deg) scaleY(${scaleY})`,
          transformOrigin: "center 65%",
        }}
      >
        {title}
      </h1>
    </div>
  );
}
