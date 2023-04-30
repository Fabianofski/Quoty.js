import { SlashCommandBuilder } from "@discordjs/builders";
import { Command } from "../interfaces/Command";
import { CommandInteraction, EmbedBuilder, TextChannel } from "discord.js";

export const quoteCommand: Command = {
  data: new SlashCommandBuilder()
    .setName("zitat")
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

    const quoteEmbed = new EmbedBuilder()
      .setColor(0x00ff00)
      .setTitle(autoren[0])
      .setAuthor({
        name: interaction.user.username,
        iconURL: interaction.user.avatarURL() || undefined,
      })
      .setDescription(zitate[0])
      .setTimestamp();

    for (let i = 1; i < autoren.length; i++) {
      quoteEmbed.addFields({ name: autoren[i], value: zitate[i] });
    }

    await channel.send({ embeds: [quoteEmbed] });

    await interaction.reply({
      content: `Created new quote in <#${channel.id}>`,
      ephemeral: true,
    });
  },
};
