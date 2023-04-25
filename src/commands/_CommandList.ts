import { Command } from "../interfaces/Command";
import { pingCommand } from "./ping";
import { quoteCommand } from "./quote";
import { rankCommand } from "./rank";

export const CommandList: Command[] = [pingCommand, quoteCommand, rankCommand];
