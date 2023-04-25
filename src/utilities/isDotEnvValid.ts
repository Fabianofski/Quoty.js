export const isDotEnvValid = () => {
  let valid = true;
  if (!process.env.BOT_TOKEN) {
    console.warn("Missing Discord bot token. Add BOT_TOKEN to .env file.");
    valid = false;
  }
  if (!process.env.GUILD_ID) {
    console.warn("Missing Guild Id. Add GUILD_ID to .env file.");
    valid = false;
  }
  if (!process.env.MONGO_HOST) {
    console.warn("Missing Mongo Host. Add MONGO_HOST to .env file.");
    valid = false;
  }
  if (!process.env.MONGO_PASSWORD) {
    console.warn(
      "Missing Mongo Password (Used in Production). Add MONGO_PASSWORD to .env file."
    );
    valid = false;
  }
  if (!process.env.MONGO_AUTH) {
    console.warn(
      "Missing Mongo Auth (Used in Production). Add MONGO_AUTH to .env file."
    );
    valid = false;
  }
  if (!process.env.SQL_HOST) {
    console.warn("Missing SQL Host. Add SQL_HOST to .env file.");
    valid = false;
  }
  if (!process.env.SQL_PASSWORD) {
    console.warn("Missing SQL Password. Add SQL_PASSWORD to .env file.");
    valid = false;
  }
  return valid;
};
