import { useId, useState } from "react";
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
  | "bar"
  | "upload"
  ;

type ButtonState = "normal" | "hover" | "pressed" | "blocked";

interface ButtonProps {
  tone?: "red" | "blue" | "green" | "gray" | "yellow" | "purple" | "orange";
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
  tone,
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
  const redFilterId = `button-red-${useId().replace(/:/g, "")}`;
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

  const buttonStyle = { width, height };
  const backgroundStyle = {
    filter: tone ? {
      red: style === "bar" ? `url(#${redFilterId})` : "none",
      blue: "hue-rotate(210deg)",
      green: "hue-rotate(110deg)",
      yellow: "hue-rotate(55deg)",
      orange: "hue-rotate(20deg) saturate(1.2)",
      purple: "grayscale(1) brightness(0.65) sepia(1) saturate(12) hue-rotate(225deg)",
      gray: "grayscale(1)",
    }[tone] : "none",
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
    <>
    {tone === "red" && style === "bar" && (
      <svg aria-hidden="true" width="0" height="0" className="absolute pointer-events-none">
        <defs>
          <filter id={redFilterId} colorInterpolationFilters="sRGB">
            <feColorMatrix type="saturate" values="0" />
            <feComponentTransfer>
              <feFuncR type="table" tableValues="0 0.38 0.72 0.95 1" />
              <feFuncG type="table" tableValues="0 0.01 0.025 0.08 1" />
              <feFuncB type="table" tableValues="0 0.01 0.025 0.08 1" />
            </feComponentTransfer>
          </filter>
        </defs>
      </svg>
    )}
    <span aria-hidden="true" className="absolute inset-0 pointer-events-none" style={backgroundStyle} />
    <span
      className="
        relative w-full
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
        WebkitTextStroke: tone ? "0.8px #200000" : undefined,
        paintOrder: "stroke fill",
        textShadow: tone ? "0 1px 2px #000" : undefined,
        color:
          currentState === "blocked" || currentState === "pressed"
            ? "#777777"
            : tone ? "#ffffff" : "#dedede",
      }}
    >
      {children}
    </span>
    </>
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
