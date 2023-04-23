import { SlashCommandBuilder } from "@discordjs/builders";
import { Command } from "../interfaces/Command";
import { CommandInteraction, TextChannel } from "discord.js";

export const quoteCommand: Command = {
  data: new SlashCommandBuilder()
    .setName("quote")
    .setDescription("Replies with pong.")
    .addChannelOption((option) =>
      option
        .setName("channel")
        .setDescription("Channel für das Zitat.")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("autoren")
        .setDescription("Autoren des Zitats. Getrennt durch ,")
        .setRequired(true)
    )
    .addStringOption((option) =>
      option
        .setName("zitate")
        .setDescription("Zitate getrennt durch '|'")
        .setRequired(true)
    ),
  run: async (interaction: CommandInteraction) => {
    if (!interaction.isChatInputCommand()) return;

    const channel = <TextChannel>(
      interaction.options.getChannel("channel", true)
    );
    const autoren = interaction.options.getString("autoren", true).split(",");
    const zitate = interaction.options.getString("zitate", true).split("|");

    await channel.send(`${autoren[0]}: \"${zitate[0]}\"`);

    await interaction.reply({
      content: `Created new quote in <#${channel.id}>`,
      ephemeral: true,
    });
  },
};
