# Quoty.js

Quoty.js is a bot written in Discord.js that can display quotes in a beautiful embed. The bot can also
track a user's voicetime, mutetime, and deaftime, and display a ranking of which user has been muted, deafened, or been
in a
voice channel the most.

## Local

To run the bot locally, follow these steps:

1. Make sure you have Node.js installed on your machine and a MongoDB and MySQL instance running.
2. Clone the repository to your local machine.
3. Navigate to the root directory of the project in your terminal.
4. Create a `.env` file with the following content:
   ```
   BOT_TOKEN=""
   GUILD_ID=""
   MONGO_HOST="localhost:27017"
   MONGO_PASSWORD="12345"
   MONGO_AUTH='root:12345'
   SQL_HOST="localhost"
   SQL_PASSWORD="test"
   ```
5. Run `npm install` to install the necessary dependencies.
6. Start the bot by running `npm start`.

## Docker

To run the bot using Docker, follow these steps:

1. Make sure you have Docker installed on your machine.
2. Clone the repository to your local machine.
3. Navigate to the root directory of the project in your terminal.
4. Create a `.env` file with the following content:
   ```
   BOT_TOKEN=""
   GUILD_ID=""
   MONGO_HOST="localhost:27017"
   MONGO_PASSWORD="12345"
   MONGO_AUTH='root:12345'
   SQL_HOST="localhost"
   SQL_PASSWORD="test"
   ```
5. Run `docker-compose up -d` to start the bot in a Docker container.

Note: In the Docker setup, the MongoDB and SQL databases are also started in separate containers.

## Usage

The bot has several commands that can be used in Discord. Here are some of the most important commands:

- `/quote [channel:channel] [authors:string] [quotes:string]`:  
  Use this command to add a quote.
- `/rank [type:{Voicetime, Mutetime, Deaftime}]`:  
  Use this command to get the ranking of users with the most [type].

## License

This project is licensed under the MIT license. See the `LICENSE` file for more information.
