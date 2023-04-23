import { Channel, TextChannel } from "discord.js";

const { Client, Events, GatewayIntentBits } = require("discord.js");

require("dotenv").config();
const token = process.env.TOKEN;

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.once(Events.ClientReady, (c: typeof Client) => {
  client.channels
    .fetch("856556910303379496")
    .then(async (channel: Channel | null) => {
      if (channel && channel.isTextBased())
        await (<TextChannel>channel).send("Ready for Takeoff!");
    });
});

client.login(token).then(() => {
  console.log("Logged in!");
});
