import { Channel, Interaction, TextChannel } from "discord.js";
import { validateEnv } from "./validateEnv";
import { onInteraction } from "./events/onInteraction";
import { onReady } from "./events/onReady";

const { Client, Events, GatewayIntentBits } = require("discord.js");

require("dotenv").config();
const token = process.env.BOT_TOKEN;

(async () => {
  if (!validateEnv()) return;

  const client = new Client({ intents: [GatewayIntentBits.Guilds] });

  client.once(Events.ClientReady, onReady);

  client.on(
    "interactionCreate",
    async (interaction: Interaction) => await onInteraction(interaction)
  );

  await client.login(token);
})();
