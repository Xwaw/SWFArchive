import { useNavigate } from "react-router-dom";

interface SimpleButtonProps {
  navigateOnClick?: string;
  children: React.ReactNode;
  disabled?: boolean;
  color?: "red" | "green" | "blue" | "orange" | "gray";
  font?: string;
}

export default function SimpleButton({
  children,
  navigateOnClick,
  disabled = false,
  color = "red",
  font,
}: SimpleButtonProps) {
  const navigate = useNavigate();

  const gradients = {
    red: `
      linear-gradient(
        to bottom,
        #ff4a4a 0%,
        #ff3038 10%,
        #ed1621 38%,
        #dc0712 65%,
        #bd0009 86%,
        #970006 100%
      )
    `,

    green: `
      linear-gradient(
        to bottom,
        #6ee86e 0%,
        #42d842 10%,
        #24bd24 38%,
        #159d15 65%,
        #087c08 86%,
        #056005 100%
      )
    `,

    blue: `
      linear-gradient(
        to bottom,
        #5b9cff 0%,
        #367fff 10%,
        #1764e8 38%,
        #0950c7 65%,
        #003c9e 86%,
        #002c78 100%
      )
    `,

    orange: `
      linear-gradient(
        to bottom,
        #ffb347 0%,
        #ff9f2f 10%,
        #f58216 38%,
        #df6808 65%,
        #bd4e00 86%,
        #8f3500 100%
      )
    `,

    gray: `
      linear-gradient(
        to bottom,
        #777777 0%,
        #666666 10%,
        #555555 38%,
        #444444 65%,
        #333333 86%,
        #222222 100%
      )
    `,
  };

  return (
    <div
      className={`
        relative min-w-25 flex-1 h-full
        transition-[filter,box-shadow] duration-100
        ${
          disabled
            ? "brightness-50 cursor-not-allowed grayscale-40"
            : `
              cursor-pointer
              hover:brightness-150
              active:brightness-80
              active:shadow-[inset_0_2px_3px_rgba(0,0,0,0.65)]
            `
        }
      `}
      style={{
        background: gradients[color],
        borderTop: "2px solid #650000",
        borderLeft: "2px solid #e8b0b0",
        borderRight: "2px solid #650000",
        borderBottom: "2px solid #3b0000",
        boxShadow: `
          inset 1px 0 0 rgba(255,255,255,0.35),
          inset -1px 0 0 rgba(0,0,0,0.35)
        `,
      }}
      onClick={() => {
        if (disabled) return;

        navigate(navigateOnClick ?? "");
      }}
    >
      <p
        className="
          w-full h-full
          flex justify-center items-center
          font-bold text-white
          whitespace-nowrap
          overflow-hidden
          text-ellipsis
          min-w-0
        "
        style={{
          fontFamily: font,
        }}
      >
        {children}
      </p>
    </div>
  );
}