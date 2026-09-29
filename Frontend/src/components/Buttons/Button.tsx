import { useState } from "react";
import { useNavigate } from "react-router-dom";

type ButtonStyle =
  | "test"
  | "login"
  | "main"
  | "search"
  | "seemore"
  | "tabs"
  | "icon"
  | "hexagon"
  | "bar";

type ButtonState = "normal" | "hover" | "pressed" | "blocked";

interface ButtonProps {
  navigateOnClick?: string;
  onClick?: () => void;
  children: React.ReactNode;
  disabled?: boolean;
  font?: string;
  style?: ButtonStyle;
  width?: string;
  height?: string;
  type?: "button" | "submit" | "reset";
}

export default function Button({
  children,
  navigateOnClick,
  onClick,
  disabled = false,
  font,
  style = "test",
  width = "100%",
  height = "100%",
  type = "button",
}: ButtonProps) {
  const navigate = useNavigate();

  const [state, setState] = useState<ButtonState>("normal");

  const currentState = disabled ? "blocked" : state;
  const image = `/images/buttons/${style}/${currentState}.png`;

  return (
    <button
      type={type}
      disabled={disabled}
      className={`
        relative
        select-none
        border-0
        p-0
        bg-transparent
        ${disabled ? "cursor-not-allowed" : "cursor-pointer"}
      `}
      style={{
        width,
        height,
        backgroundImage: `url("${image}")`,
        backgroundSize: "100% 100%",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
      }}
      onMouseEnter={() => {
        if (!disabled) setState("hover");
      }}
      onMouseLeave={() => {
        setState("normal");
      }}
      onMouseDown={() => {
        if (!disabled) setState("pressed");
      }}
      onMouseUp={() => {
        if (!disabled) setState("hover");
      }}
      onClick={() => {
        if (disabled) return;

        onClick?.();

        if (navigateOnClick) {
          navigate(navigateOnClick);
        }
      }}
    >
      <p
        className="
          w-full
          h-full
          flex
          justify-center
          items-center
          font-bold
          whitespace-nowrap
          overflow-hidden
          text-ellipsis
          pointer-events-none
        "
        style={{
          fontFamily: font,
          color:
            currentState === "blocked" || currentState === "pressed"
              ? "#777777"
              : "#dedede",
        }}
      >
        {children}
      </p>
    </button>
  );
}