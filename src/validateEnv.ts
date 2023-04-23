export const validateEnv = () => {
  if (!process.env.BOT_TOKEN) {
    console.warn("Missing Discord bot token. Add BOT_TOKEN to .env file.");
    return false;
  }
  return true;
};
