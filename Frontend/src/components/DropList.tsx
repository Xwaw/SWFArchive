import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";

interface ItemProps {
  text: string;
  onClick: () => Promise<void> | void;
}

interface DropListProps {
  button: React.ReactNode;
  items: ItemProps[];
}

export default function DropList({ button, items }: DropListProps) {
  const [open, setOpen] = useState(false);
  const [pos, setPos] = useState<{ top: number, right: number, width: number } | null>(null);

  const buttonRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (open && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setPos({
        top: rect.bottom + window.scrollY,
        right: window.innerWidth - rect.right,
        width: rect.width,
      });
    }
  }, [open]);

  return (
    <>
      <div
        ref={buttonRef}
        className="bg-red-300 inline-block"
        onClick={() => setOpen((prev) => !prev)}
      >
        {button}
      </div>

      {open &&
        createPortal(
          <div
            className="absolute bg-amber-400 shadow-lgp-2 flex flex-col"
            style={{
              top: pos?.top,
              right: pos?.right,
              position: "fixed",
              zIndex: 9999,
            }}
          >
            {items.map((value, index) => (
              <div
                key={index}
                className="p-2 hover:bg-amber-500 cursor-pointer w-45 flex justify-center"
                onClick={() => {
                  value.onClick();
                  setOpen(false);
                }}
              >
                {value.text}
              </div>
            ))}
          </div>,
          document.body
        )}
    </>
  );
}
