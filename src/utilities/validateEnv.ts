export const validateEnv = () => {
  if (!process.env.BOT_TOKEN) {
    console.warn("Missing Discord bot token. Add BOT_TOKEN to .env file.");
    return false;
  }
  if (!process.env.MONGO_HOST) {
    console.warn("Missing Mongo Host. Add MONGO_HOST to .env file.");
    return false;
  }

  return true;
};
