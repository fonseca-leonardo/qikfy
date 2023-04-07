import { EJSON } from "bson";
import { randomUUID } from "crypto";
import { BuilderPageModel } from "src/@types/builder";
import MongoDriver from "../MongoDriver";
import {
  CreatePageRequest,
  ListPageRequest,
  UpdatePageComponentsRequest,
} from "./PageService.types";

export default class PageService extends MongoDriver {
  public async getPage(pagePath: string) {
    const pageCollection = this.db.collection<BuilderPageModel>("pages");

    const page = await pageCollection.findOne<BuilderPageModel>({
      pagePath,
    });

    const serialize = EJSON.serialize(page);

    return serialize as BuilderPageModel;
  }

  public async updatePage({
    pagePath,
    title,
    components,
  }: UpdatePageComponentsRequest) {
    const page = await this.db.collection("pages").findOne<BuilderPageModel>({
      pagePath,
    });

    if (page) {
      const updatePage = {
        ...page,
        ...(title && { title }),
        components,
      };

      await this.db.collection("pages").updateOne(
        {
          pagePath,
        },
        {
          $set: updatePage,
        }
      );

      return updatePage;
    }
  }

  public async listPages({
    search,
  }: ListPageRequest): Promise<BuilderPageModel[]> {
    const pageCollection = this.db.collection<BuilderPageModel>("pages");

    const pages = await pageCollection
      .find({
        ...(search && {
          pagePath: {
            $regex: search,
            $options: "i",
          },
        }),
      })
      .sort({
        pagePath: 1,
      })
      .toArray();

    const serialize = EJSON.serialize(pages);

    return serialize as BuilderPageModel[];
  }

  public async createPage({ pagePath, title }: CreatePageRequest) {
    const pageCollection = this.db.collection<BuilderPageModel>("pages");

    const pageExists = await pageCollection.findOne({
      pagePath,
    });

    if (pageExists) return;

    const createPage: BuilderPageModel = {
      pagePath,
      title,
      id: randomUUID(),
      components: [],
    };

    await pageCollection.insertOne(createPage);

    return createPage;
  }
}
