import { VoiceState } from "discord.js";

export const userJoinedChannel = (before: VoiceState, after: VoiceState) => {
  return !before.channel && after.channel;
};

export const userLeftChannel = (before: VoiceState, after: VoiceState) => {
  return !after.channel && before.channel;
};

export const userActivatedDeaf = (before: VoiceState, after: VoiceState) => {
  return (
    (!before.deaf && after.deaf) ||
    (!before.channel && after.channel && after.deaf)
  );
};

export const userDeactivatedDeaf = (before: VoiceState, after: VoiceState) => {
  return (
    (before.deaf && !after.deaf) ||
    (before.channel && !after.channel && after.deaf)
  );
};

export const userActivatedMute = (before: VoiceState, after: VoiceState) => {
  return (
    (!before.mute && after.mute && !after.deaf) ||
    (!before.channel && after.channel && after.mute && !after.deaf) ||
    (before.deaf && after.mute && !after.deaf)
  );
};

export const userDeactivatedMute = (before: VoiceState, after: VoiceState) => {
  return (
    (before.mute && !before.deaf && !after.mute) ||
    (before.channel && !after.channel && after.mute && !after.deaf) ||
    (before.mute && !before.deaf && after.deaf)
  );
};
