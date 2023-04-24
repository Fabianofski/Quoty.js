import { VoiceState } from "discord.js";
import {
  userActivatedDeaf,
  userActivatedMute,
  userDeactivatedDeaf,
  userDeactivatedMute,
  userJoinedChannel,
  userLeftChannel,
} from "../utilities/voiceStateTypeCheck";
import { addData, getData } from "../db/mongo";
import { addNewVoiceStateEntry } from "../db/mysql";
import moment from "moment";

export const onVoiceStateUpdate = async (
  before: VoiceState,
  after: VoiceState
) => {
  await joinHandler(before, after);
  await muteHandler(before, after);
  await deafHandler(before, after);
};

const joinHandler = async (before: VoiceState, after: VoiceState) => {
  if (!before.member) return;
  if (userJoinedChannel(before, after)) {
    console.log(`${before.member.user.username} joined a voice channel!`);
    await addData(before.member.id || "", "Voicetime");
  } else if (userLeftChannel(before, after)) {
    console.log(`${before.member.user.username} left a voice channel!`);
    const start = await getData(before.member.user.id, "Voicetime");
    if (start)
      await addNewVoiceStateEntry(
        "Voicetime",
        before.member.user.username,
        before.member.user.id,
        before.guild.name,
        before.guild.id,
        moment(start),
        moment()
      );
  }
};
const muteHandler = async (before: VoiceState, after: VoiceState) => {
  if (!before.member) return;
  if (userActivatedMute(before, after)) {
    console.log(`${before.member.user.username} activated mute!`);
    await addData(before.member.id || "", "Mutetime");
  } else if (userDeactivatedMute(before, after)) {
    console.log(`${before.member.user.username} deactivated mute!`);
    const start = await getData(before.member.user.id, "Mutetime");
    if (start)
      await addNewVoiceStateEntry(
        "Mutetime",
        before.member.user.username,
        before.member.user.id,
        before.guild.name,
        before.guild.id,
        moment(start),
        moment()
      );
  }
};
const deafHandler = async (before: VoiceState, after: VoiceState) => {
  if (!before.member) return;
  if (userActivatedDeaf(before, after)) {
    console.log(`${before.member.user.username} activated deaf!`);
    await addData(before.member.id || "", "Deaftime");
  } else if (userDeactivatedDeaf(before, after)) {
    console.log(`${before.member.user.username} deactivated deaf!`);
    const start = await getData(before.member.user.id, "Deaftime");
    if (start)
      await addNewVoiceStateEntry(
        "Deaftime",
        before.member.user.username,
        before.member.user.id,
        before.guild.name,
        before.guild.id,
        moment(start),
        moment()
      );
  }
};
