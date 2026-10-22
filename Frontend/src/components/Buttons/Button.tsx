import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { ReactNode } from "react";

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
  href?: string;
  download?: boolean | string;
  children: ReactNode;
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
  href,
  download,
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

  const className = `
    relative
    select-none
    border-0
    p-0
    bg-transparent
    inline-flex
    items-center
    justify-center
    no-underline
    ${disabled ? "cursor-not-allowed" : "cursor-pointer"}
  `;

  const buttonStyle = {
    width,
    height,
    backgroundImage: `url("${image}")`,
    backgroundSize: "100% 100%",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
  };

  const events = {
    onMouseEnter: () => {
      if (!disabled) setState("hover");
    },
    onMouseLeave: () => setState("normal"),
    onMouseDown: () => {
      if (!disabled) setState("pressed");
    },
    onMouseUp: () => {
      if (!disabled) setState("hover");
    },
    onBlur: () => setState("normal"),
  };

  const content = (
    <span
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
    </span>
  );

  if (href) {
    return (
      <a
        href={disabled ? undefined : href}
        download={disabled ? undefined : download}
        draggable={false}
        aria-disabled={disabled}
        tabIndex={disabled ? -1 : undefined}
        className={className}
        style={buttonStyle}
        {...events}
        onClick={(event) => {
          if (disabled) {
            event.preventDefault();
            return;
          }

          onClick?.();
        }}
      >
        {content}
      </a>
    );
  }

  return (
    <button
      type={type}
      disabled={disabled}
      className={className}
      style={buttonStyle}
      {...events}
      onClick={() => {
        if (disabled) return;

        onClick?.();

        if (navigateOnClick) {
          navigate(navigateOnClick);
        }
      }}
    >
      {content}
    </button>
  );
}
