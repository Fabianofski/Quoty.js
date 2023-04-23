import { SlashCommandBuilder } from "@discordjs/builders";
import { Command } from "../interfaces/Command";

export const pingCommand: Command = {
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Replies with pong."),
  run: async (interaction) => {
    await interaction.reply("pong!");
  },
};
