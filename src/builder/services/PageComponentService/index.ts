import { randomUUID } from "crypto";
import { BuilderPageModel } from "src/@types/builder";
import MongoDriver from "../MongoDriver";
import {
  AddComponentRequest,
  DeleteComponentRequest,
} from "./PageComponentService.types";

export default class PageComponentService extends MongoDriver {
  public async addComponent({
    pagePath,
    component,
    index,
  }: AddComponentRequest) {
    const page = await this.db.collection("pages").findOne<BuilderPageModel>({
      pagePath,
    });

    if (page) {
      const components = [...page?.components];

      components?.splice(index, 0, {
        ...component,
        id: randomUUID(),
      });

      const updatePage = {
        ...page,
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

  public async editComponent({
    pagePath,
    component,
    index,
  }: AddComponentRequest) {
    const page = await this.db.collection("pages").findOne<BuilderPageModel>({
      pagePath,
    });

    if (page) {
      page.components[index] = component;

      await this.db.collection("pages").updateOne(
        {
          pagePath,
        },
        {
          $set: {
            ...page,
          },
        }
      );
    }

    return page;
  }

  public async deleteComponent({ index, pagePath }: DeleteComponentRequest) {
    const page = await this.db.collection("pages").findOne<BuilderPageModel>({
      pagePath,
    });

    if (page) {
      const components = [...page?.components];

      components?.splice(index, 1);

      const updatePage = {
        ...page,
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
}
