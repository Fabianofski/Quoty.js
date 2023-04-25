import moment, { Moment } from "moment";

const { MongoClient } = require("mongodb");
require("dotenv").config();

const uri =
  process.env.NODE_ENV === "PRODUCTION"
    ? `mongodb://${process.env.MONGO_AUTH}@${process.env.MONGO_HOST}`
    : `mongodb://${process.env.MONGO_HOST}`;
export const addData = async (userID: string, state: string) => {
  try {
    const client = new MongoClient(uri);

    const db = client.db("quoty");
    const collection = db.collection("voice-states");
    await collection.updateOne(
      { _id: userID },
      {
        $set: {
          [state]: {
            start: moment().toISOString(),
          },
        },
      },
      { upsert: true }
    );

    await client.close();
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

export const getData = async (
  userID: string,
  state: string
): Promise<Moment | undefined> => {
  try {
    const client = new MongoClient(uri);

    const db = client.db("quoty");
    const collection = db.collection("voice-states");
    const userData = await collection.findOne({ _id: userID });

    await collection.updateOne(
      { _id: userID },
      {
        $unset: {
          [state]: {},
        },
      }
    );

    await client.close();
    return userData[state]["start"];
  } catch (e) {
    console.error(e);
    return undefined;
  }
};
