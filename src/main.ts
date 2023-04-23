import { Interaction } from "discord.js";
import { validateEnv } from "./utilities/validateEnv";
import { onInteraction } from "./events/onInteraction";
import { onReady } from "./events/onReady";
import { onVoiceStateUpdate } from "./events/onVoiceStateUpdate";

const { Client, Events } = require("discord.js");

require("dotenv").config();
const token = process.env.BOT_TOKEN;

(async () => {
  if (!validateEnv()) return;

  const client = new Client({
    intents: 641,
  });

  client.on(Events.ClientReady, onReady);

  client.on(
    Events.InteractionCreate,
    async (interaction: Interaction) => await onInteraction(interaction)
  );

  client.on(Events.VoiceStateUpdate, onVoiceStateUpdate);

  await client.login(token);
})();
