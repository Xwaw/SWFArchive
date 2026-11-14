import { useEffect, useState } from "react";
import { BASE } from "./arcadeMachineConfig";

type JoystickDirection =
  | "none"
  | "a"
  | "as"
  | "aw"
  | "d"
  | "ds"
  | "dw"
  | "s"
  | "w";

const buttonHueRotations = [0, 35, 65, 120, 180, 220] as const;
const joystickKeys = new Set([
  "a",
  "s",
  "d",
  "w",
  "ArrowLeft",
  "ArrowDown",
  "ArrowRight",
  "ArrowUp",
]);
const joystickKeyCodes: Record<string, string> = {
  KeyA: "a",
  KeyS: "s",
  KeyD: "d",
  KeyW: "w",
};
const actionButtonKeyGroups: readonly string[][] = [
  [],
  [],
  ["q", "KeyQ", "Control", "ControlLeft", "ControlRight"],
  ["e", "KeyE", "Shift", "ShiftLeft", "ShiftRight"],
  ["r", "KeyR"],
  ["Enter", "NumpadEnter", "p", "KeyP", "Escape"],
];

function getJoystickDirection(keys: ReadonlySet<string>): JoystickDirection {
  const left = keys.has("a") || keys.has("ArrowLeft");
  const right = keys.has("d") || keys.has("ArrowRight");
  const up = keys.has("w") || keys.has("ArrowUp");
  const down = keys.has("s") || keys.has("ArrowDown");
  const horizontal = left === right ? null : left ? "left" : "right";
  const vertical = up === down ? null : up ? "up" : "down";

  if (horizontal === "left") {
    if (vertical === "up") return "aw";
    if (vertical === "down") return "as";
    return "a";
  }
  if (horizontal === "right") {
    if (vertical === "up") return "dw";
    if (vertical === "down") return "ds";
    return "d";
  }
  if (vertical === "up") return "w";
  if (vertical === "down") return "s";
  return "none";
}

export default function ArcadeControls() {
  const [joystickDirection, setJoystickDirection] =
    useState<JoystickDirection>("none");
  const [pressedButtons, setPressedButtons] =
    useState<ReadonlySet<number>>(() => new Set());

  useEffect(() => {
    const pressedKeys = new Set<string>();
    const pressedMouseButtons = new Set<number>();
    const updateJoystick = () => {
      setJoystickDirection(getJoystickDirection(pressedKeys));
    };
    const updatePressedButtons = () => {
      const nextPressedButtons = new Set<number>();

      actionButtonKeyGroups.forEach((keys, buttonIndex) => {
        if (keys.some((key) => pressedKeys.has(key))) {
          nextPressedButtons.add(buttonIndex);
        }
      });
      if (pressedMouseButtons.has(0)) nextPressedButtons.add(0);
      if (pressedMouseButtons.has(2)) nextPressedButtons.add(1);

      setPressedButtons(nextPressedButtons);
    };
    const normalizeKey = (key: string) =>
      key.length === 1 ? key.toLowerCase() : key;
    const getEventKeys = (event: KeyboardEvent) => [
      event.code,
      normalizeKey(event.key),
    ];
    const getJoystickKey = (event: KeyboardEvent) => {
      const key = joystickKeyCodes[event.code] ?? normalizeKey(event.key);
      return joystickKeys.has(key) ? key : null;
    };
    const isActionKey = (key: string) =>
      actionButtonKeyGroups.some((keys) => keys.includes(key));
    const isEditableTarget = (target: EventTarget | null) =>
      target instanceof HTMLElement &&
      (target.isContentEditable ||
        target.closest("input, textarea, select, [contenteditable='true']") !==
          null);
    const handleKeyDown = (event: KeyboardEvent) => {
      const joystickKey = getJoystickKey(event);
      const actionKeys = getEventKeys(event).filter(isActionKey);

      if (
        (!joystickKey && actionKeys.length === 0) ||
        isEditableTarget(event.target)
      ) {
        return;
      }

      if (joystickKey && !pressedKeys.has(joystickKey)) {
        pressedKeys.add(joystickKey);
        updateJoystick();
      }
      if (actionKeys.some((key) => !pressedKeys.has(key))) {
        actionKeys.forEach((key) => pressedKeys.add(key));
        updatePressedButtons();
      }
    };
    const handleKeyUp = (event: KeyboardEvent) => {
      const joystickKey = getJoystickKey(event);
      const actionKeys = getEventKeys(event).filter(isActionKey);

      if (joystickKey && pressedKeys.delete(joystickKey)) {
        updateJoystick();
      }
      if (actionKeys.some((key) => pressedKeys.has(key))) {
        actionKeys.forEach((key) => pressedKeys.delete(key));
        updatePressedButtons();
      }
    };
    const handleMouseDown = (event: MouseEvent) => {
      if (
        (event.button === 0 || event.button === 2) &&
        !pressedMouseButtons.has(event.button)
      ) {
        pressedMouseButtons.add(event.button);
        updatePressedButtons();
      }
    };
    const handleMouseUp = (event: MouseEvent) => {
      if (pressedMouseButtons.delete(event.button)) {
        updatePressedButtons();
      }
    };
    const handlePointerDown = (event: PointerEvent) => {
      if (
        event.pointerType === "mouse" &&
        (event.button === 0 || event.button === 2) &&
        !pressedMouseButtons.has(event.button)
      ) {
        pressedMouseButtons.add(event.button);
        updatePressedButtons();
      }
    };
    const handlePointerUp = (event: PointerEvent) => {
      if (pressedMouseButtons.delete(event.button)) {
        updatePressedButtons();
      }
    };
    const handlePointerCancel = () => {
      if (pressedMouseButtons.size > 0) {
        pressedMouseButtons.clear();
        updatePressedButtons();
      }
    };
    const handleBlur = () => {
      pressedKeys.clear();
      updateJoystick();
      updatePressedButtons();
    };
    const handleFocus = () => {
      pressedMouseButtons.clear();
      updatePressedButtons();
    };

    window.addEventListener("keydown", handleKeyDown, true);
    window.addEventListener("keyup", handleKeyUp, true);
    window.addEventListener("mousedown", handleMouseDown, true);
    window.addEventListener("mouseup", handleMouseUp, true);
    window.addEventListener("pointerdown", handlePointerDown, true);
    window.addEventListener("pointerup", handlePointerUp, true);
    window.addEventListener("pointercancel", handlePointerCancel, true);
    window.addEventListener("blur", handleBlur);
    window.addEventListener("focus", handleFocus);

    return () => {
      window.removeEventListener("keydown", handleKeyDown, true);
      window.removeEventListener("keyup", handleKeyUp, true);
      window.removeEventListener("mousedown", handleMouseDown, true);
      window.removeEventListener("mouseup", handleMouseUp, true);
      window.removeEventListener("pointerdown", handlePointerDown, true);
      window.removeEventListener("pointerup", handlePointerUp, true);
      window.removeEventListener("pointercancel", handlePointerCancel, true);
      window.removeEventListener("blur", handleBlur);
      window.removeEventListener("focus", handleFocus);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 z-30"
    >
      <img
        src={`${BASE}/accessories/joystick/${joystickDirection}.png`}
        alt=""
        aria-hidden="true"
        draggable={false}
        className="absolute left-[18%] top-[-100%] h-[188%] w-auto"
        style={{
          clipPath: "inset(70% 18% 10% 18%)",
          filter: "brightness(0) opacity(0.55) blur(1px)",
          transform: "translateY(3px)",
        }}
      />
      <img
        src={`${BASE}/accessories/joystick/${joystickDirection}.png`}
        alt=""
        draggable={false}
        className="absolute left-[18%] top-[-100%] h-[188%] w-auto"
      />
      <div className="absolute left-[60%] top-[-5%] grid h-[85%] w-[25.5%] grid-cols-3 grid-rows-2 gap-x-[2%]">
        {buttonHueRotations.map((hueRotation, index) => (
          <img
            key={hueRotation}
            src={`${BASE}/accessories/button/${
              pressedButtons.has(index) ? "pressed" : "idle"
            }.png`}
            alt=""
            draggable={false}
            className="h-full w-full object-contain"
            style={{
              filter: `hue-rotate(${hueRotation}deg) drop-shadow(2px 3px 2px #000f)`,
              transform: index < 3 ? "translateX(-25%)" : "translateX(-12%)",
            }}
          />
        ))}
      </div>
    </div>
  );
}
