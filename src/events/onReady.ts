import { REST } from "@discordjs/rest";
import { Routes } from "discord-api-types/v9";
import { ActivityType, Channel, Client, TextChannel } from "discord.js";
import { CommandList } from "../commands/_CommandList";

export const onReady = async (client: Client) => {
  client.user?.setAvatar("./zitat.png");
  client.user?.setPresence({
    activities: [
      {
        type: ActivityType.Playing,
        name: "https://quoty-bot.web.app/",
      },
    ],
  });

  const rest = new REST({ version: "9" }).setToken(
    process.env.BOT_TOKEN as string
  );

  const commandData = CommandList.map((command) => command.data.toJSON());

  const guildIds = (<string>process.env.GUILD_ID).split(",");
  for (const id of guildIds) {
    await rest.put(
      Routes.applicationGuildCommands(client.user?.id || "missing id", id),
      { body: commandData }
    );
  }

  client.channels
    .fetch("856556910303379496")
    .then(async (channel: Channel | null) => {
      if (channel && channel.isTextBased())
        await (<TextChannel>channel).send("Ready for Takeoff!");
    });

  console.log(`Ready! Logged in as ${client.user?.tag}`);
};
