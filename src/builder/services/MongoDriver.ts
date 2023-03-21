import { Db, MongoClient } from "mongodb";

export default class MongoDriver {
  protected client: MongoClient;
  protected db: Db;

  constructor(mongo: MongoClient) {
    this.client = mongo;

    this.db = mongo.db(process.env.MONGODB_DATABASE);
  }
}
