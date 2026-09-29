import { useState } from "react";

type SwitchStyle = "default";

export type SwitchState =
  | "normal"
  | "left_pressed"
  | "right_pressed"
  | "blocked";

interface SwitchProps {
  onSwitch?: (state: SwitchState) => void;
  text: [React.ReactNode, React.ReactNode];
  forcedState?: SwitchState;
  disabled?: boolean;
  font?: string;
  style?: SwitchStyle;
  width?: string;
  height?: string;
}

export default function Switch({
  onSwitch,
  text,
  forcedState,
  disabled = false,
  font,
  style = "default",
  width = "100%",
  height = "100%",
}: SwitchProps) {
  const [state, setState] = useState<SwitchState>("left_pressed");

  const currentState: SwitchState = disabled
    ? "blocked"
    : forcedState ?? state;

  const image = `/images/switches/${style}/${currentState}.png`;

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (disabled) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;

    const newState: SwitchState =
      clickX < rect.width / 2
        ? "left_pressed"
        : "right_pressed";

    setState(newState);
    onSwitch?.(newState);
  };

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
      onClick={handleClick}
    >
      <div
        className="
          absolute
          inset-0
          flex
          items-center
          pointer-events-none
        "
        style={{
          fontFamily: font,
          color: currentState === "blocked" ? "#777777" : "#dedede",
        }}
      >
        <div className="w-1/2 h-full flex items-center justify-center">
          {text[0]}
        </div>

        <div className="w-1/2 h-full flex items-center justify-center">
          {text[1]}
        </div>
      </div>
    </div>
  );
}