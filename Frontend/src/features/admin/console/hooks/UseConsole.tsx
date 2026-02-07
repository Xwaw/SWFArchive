
import { useEffect, useState } from "react";
import { commandRegistry } from "../CommandRegistry";

type ConsoleMode = "idle" | "help" | "list" | "clear" | "start";
type TitleMessage = "Idle" | "Loading" | "Error" | "Success";

export function useConsole() {
  const [output, setOutput] = useState<string[]>([]);
  const [mode, setMode] = useState<ConsoleMode>("idle");
  
  const [effectStatus, setEffectStatus] = useState<TitleMessage>("Idle");

  useEffect(() => {
    document.title = effectStatus;
  }, [effectStatus])

  const handleCommand = async (rawInput: string[]) => {
    setEffectStatus("Idle")

    const input = rawInput.map(s => s.trim()).filter(Boolean);
    if (input.length === 0) return;

    const [name, ...args] = input.map(s => s.toLowerCase());

    if ((name === "help" && args.length === 0) || name === "ls") {
      setMode("list");
      setOutput(commandRegistry.list().map(c => "> " + c.name));
      return;
    }

    if (name === "help") {
      setMode("help");
      setOutput(commandRegistry.help(args[0]) ?? ["! No help available"]);
      return;
    }

    if (name === "clear" || name == "cl") {
      setMode("clear");
      setOutput([]);
      return;
    }

    if (name === "hello") {
        setMode("start")
        fetch("/console/startMessage.txt")
        .then(res => res.text())
        .then(text => text.split("\n"))
        .then(lines => {
            setOutput(lines);
        })
        .catch(err => {
            setOutput(["! Failed to load start message"]);
            console.error(err);
        });
    }

    const result = await commandRegistry.execute(rawInput)
    setEffectStatus("Loading")

    setOutput(prev => [...prev, ...["> " + name + " " + args]])

    if (result.ok) {
      setOutput(prev => [...prev, ...result.output]);
      setEffectStatus("Success")
    } else {
      setOutput(prev => [...prev, ...result.error ?? ["! UNDEFINED"]]);
      setEffectStatus("Error")
    }
  };

  return { output, handleCommand, mode };
}
