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

export const onVoiceStateUpdate = async (
  before: VoiceState,
  after: VoiceState
) => {
  await joinHandler(before, after);
  await muteHandler(before, after);
  await deafHandler(before, after);
};

const joinHandler = async (before: VoiceState, after: VoiceState) => {
  if (userJoinedChannel(before, after)) {
    console.log(`${before.member?.user.username} joined a voice channel!`);
    await addData(before.member?.id || "", "Voicetime");
  } else if (userLeftChannel(before, after)) {
    console.log(`${before.member?.user.username} left a voice channel!`);
    await getData(before.member?.id || "", "Voicetime");
  }
};
const muteHandler = async (before: VoiceState, after: VoiceState) => {
  if (userActivatedMute(before, after)) {
    console.log(`${before.member?.user.username} activated mute!`);
    await addData(before.member?.id || "", "Mutetime");
  } else if (userDeactivatedMute(before, after)) {
    console.log(`${before.member?.user.username} deactivated mute!`);
    await getData(before.member?.id || "", "Mutetime");
  }
};
const deafHandler = async (before: VoiceState, after: VoiceState) => {
  if (userActivatedDeaf(before, after)) {
    console.log(`${before.member?.user.username} activated deaf!`);
    await addData(before.member?.id || "", "Deaftime");
  } else if (userDeactivatedDeaf(before, after)) {
    console.log(`${before.member?.user.username} deactivated deaf!`);
    await getData(before.member?.id || "", "Deaftime");
  }
};
