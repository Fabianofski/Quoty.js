import { Command } from "../interfaces/Command";
import { pingCommand } from "./ping";
import { quoteCommand } from "./quote";

export const CommandList: Command[] = [pingCommand, quoteCommand];
