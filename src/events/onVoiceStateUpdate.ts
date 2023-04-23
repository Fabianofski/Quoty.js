import { VoiceState } from "discord.js";
import {
  userActivatedDeaf,
  userActivatedMute,
  userDeactivatedDeaf,
  userDeactivatedMute,
  userJoinedChannel,
  userLeftChannel,
} from "../utilities/voiceStateTypeCheck";

export const onVoiceStateUpdate = async (
  before: VoiceState,
  after: VoiceState
) => {
  joinHandler(before, after);
  muteHandler(before, after);
  deafHandler(before, after);
};

const joinHandler = (before: VoiceState, after: VoiceState) => {
  if (userJoinedChannel(before, after)) console.log("joined");
  else if (userLeftChannel(before, after)) console.log("left");
};
const muteHandler = (before: VoiceState, after: VoiceState) => {
  if (userActivatedMute(before, after)) console.log("muted");
  else if (userDeactivatedMute(before, after)) console.log("unmuted");
};
const deafHandler = (before: VoiceState, after: VoiceState) => {
  if (userActivatedDeaf(before, after)) console.log("deafed");
  else if (userDeactivatedDeaf(before, after)) console.log("undeafed");
};
