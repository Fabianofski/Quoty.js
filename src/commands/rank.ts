import { SlashCommandBuilder } from "@discordjs/builders";
import { Command } from "../interfaces/Command";
import { getRankingList } from "../db/mysql";
import { EmbedBuilder } from "discord.js";

export const rankCommand: Command = {
  data: new SlashCommandBuilder()
    .setName("rank")
    .setDescription("Server Ranking of Voicetime, Mutetime, Deaftime.")
    .addStringOption((option) =>
      option
        .setName("type")
        .setDescription("type of statistic")
        .setRequired(true)
        .addChoices(
          { name: "Voicetime", value: "Voicetime" },
          { name: "Mutetime", value: "Mutetime" },
          { name: "Deaftime", value: "Deaftime" }
        )
    ),
  run: async (interaction) => {
    if (!interaction.isChatInputCommand() || !interaction.guild) return;

    const type = interaction.options.getString("type", true);
    getRankingList(type, "426358403917676546", async (result) => {
      const rankEmbed = new EmbedBuilder()
        .setColor(0x00ff00)
        .setTitle(type)
        .setAuthor({
          name: interaction.user.username,
          iconURL: interaction.user.avatarURL() || undefined,
        })
        .setTimestamp();

      let ranking = "";
      for (let i = 0; i < result.length; i++) {
        ranking += `${i + 1}. ${result[i].UserName}: ${result[i].time} \n`;
      }
      rankEmbed.addFields({
        name: "Server Ranking:",
        value: ranking,
        inline: false,
      });

      await interaction.reply({ embeds: [rankEmbed] });
    });
  },
};
