import moment, { Moment } from "moment";
import * as process from "process";

const mysql = require("mysql");
require("dotenv").config();

const database = process.env.SQL_DATABASE;
const con = mysql.createPool({
  host: process.env.SQL_HOST,
  user: process.env.SQL_USER,
  password: process.env.SQL_PASSWORD,
  database: database,
});

con.getConnection(function (err: any, conn: any) {
  if (err) {
    console.error(err);
    return;
  }
  conn.changeUser({ database: database }, function (err: any) {
    if (err) throw err;
    console.log(`Connected to mySQL '${database}' database!`);
    createTableIfNotExists("Voicetime");
    createTableIfNotExists("Mutetime");
    createTableIfNotExists("Deaftime");
  });
});

const createTableIfNotExists = (tableName: string) => {
  con.query(`
  CREATE TABLE IF NOT EXISTS \`${tableName}\` (
  \`UserName\` tinytext CHARACTER SET utf8mb4,
  \`UserID\` tinytext CHARACTER SET utf8mb4,
  \`ServerName\` tinytext CHARACTER SET utf8mb4,
  \`ServerID\` tinytext CHARACTER SET utf8mb4,
  \`Start\` datetime DEFAULT NULL,
  \`End\` datetime DEFAULT NULL,
  \`Time\` time DEFAULT NULL)`);
};

export const getRankingList = (
  database: string,
  serverId: string,
  callback: (
    result: { UserID: string; UserName: string; time: string }[]
  ) => void
): void => {
  const query = `SELECT DISTINCT UserID, UserName, SEC_TO_TIME(SUM(TIME_TO_SEC(\`Time\`))) as time 
                 FROM ${database} 
                 WHERE ServerID = ${serverId} 
                 GROUP BY UserID, UserName
                 ORDER BY time desc`;
  return con.query(query, function (err: any, result: any) {
    if (err) throw err;
    return callback(result);
  });
};

export const addNewVoiceStateEntry = (
  database: string,
  username: string,
  userid: string,
  servername: string,
  serverId: string,
  start: Moment,
  end: Moment
): void => {
  const query = `INSERT INTO ${database} (UserName, UserID, ServerName, ServerID, Start, End, time)
                VALUES(
                '${username}', 
                '${userid}', 
                '${servername}',  
                '${serverId}', 
                '${start.format("YYYY-MM-DD HH:mm:ss")}', 
                '${end.format("YYYY-MM-DD HH:mm:ss")}', 
                '${dateDiffInDays(start, end)}')`;
  con.query(query, function (err: any) {
    if (err) console.error(err);
    console.log(
      `Saved data to SQL database. ${username} (${database}): ${start.format(
        "YYYY-MM-DD HH:mm:ss"
      )} - ${end.format("YYYY-MM-DD HH:mm:ss")}`
    );
  });
};

function dateDiffInDays(a: Moment, b: Moment) {
  const duration = moment.duration(b.diff(a));
  return `${duration.hours()}:${duration.minutes() % 60}:${
    duration.seconds() % 3600
  }`;
}
