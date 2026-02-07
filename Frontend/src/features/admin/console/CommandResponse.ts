import type { Command } from "./CommandRegistry";

export type CommandResponse = 
{ok: true, output: string[]} |
{ok: false, error?: string[]}

