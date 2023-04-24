import { isDotEnvValid } from "./utilities/isDotEnvValid";
import { onReady } from "./events/onReady";
import { onInteraction } from "./events/onInteraction";
import { onVoiceStateUpdate } from "./events/onVoiceStateUpdate";

const { Client, Events } = require("discord.js");

require("dotenv").config();
const token = process.env.BOT_TOKEN;

(async () => {
  if (!isDotEnvValid()) return;

  const client = new Client({
    intents: 641,
  });

  client.on(Events.ClientReady, onReady);

  client.on(Events.InteractionCreate, onInteraction);

  client.on(Events.VoiceStateUpdate, onVoiceStateUpdate);

  await client.login(token);
})();
