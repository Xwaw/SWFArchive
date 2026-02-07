import type { CommandResponse } from "./CommandResponse";

export interface Command {
  name: string;
  help?: string[];
  execute: (args: string[]) => Promise<CommandResponse>;
}

export class CommandRegistry {
  private commands: Command[] = [];

  registerCommand(command: Command) {
    this.commands.push(command);
  }

  async execute(inputArgs: string[]): Promise<CommandResponse> {
    const name = inputArgs[0];
    const args = inputArgs.slice(1);

    const command = this.commands.find(c => c.name === name);

    if (!command) {
      return {ok:false, error: ["Error: The command with the specified name does not exist."]};
    }

    return command.execute(args);
  }

  list(): Command[] {
    return this.commands;
  }

  help(name?: string): string[] | null {
    if (!name) {
      return ["Use: help <command>"];
    }

    const command = this.commands.find(c => c.name === name);
    return command?.help ?? null;
  }
}

export const commandRegistry = new CommandRegistry();
