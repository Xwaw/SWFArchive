import { useState } from "react";
import { useNavigate } from "react-router-dom";

type ButtonStyle = "test" | "login" | "main" | "search";
type ButtonState = "normal" | "hover" | "pressed" | "blocked";

interface ButtonProps {
  navigateOnClick?: string;
  children: React.ReactNode;
  disabled?: boolean;
  font?: string;
  style?: ButtonStyle;
  width?: string;
  height?: string;
}

export default function Button({
  children,
  navigateOnClick,
  disabled = false,
  font,
  style = "test",
  width = "100%",
  height = "100%",
}: ButtonProps) {
  const navigate = useNavigate();

  const [state, setState] = useState<ButtonState>("normal");

  const currentState = disabled ? "blocked" : state;
  const image = `/images/buttons/${style}/${currentState}.png`;

  return (
    <div
      className={`
        relative
        select-none
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
          color: currentState === "blocked" || currentState === "pressed" ? "#777777" : "#dedede",
        }}
      >
        {children}
      </p>
    </div>
  );
}
