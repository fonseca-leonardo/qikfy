import { BuilderPageModel } from "src/@types/builder";
import MongoDriver from "./MongoDriver";

export default class PageService extends MongoDriver {
  public async getPage(pagePath: string) {
    const pageCollection = this.db.collection<BuilderPageModel>("pages");

    const page = await pageCollection.findOne<BuilderPageModel>({
      pagePath,
    });

    return page;
  }
}
