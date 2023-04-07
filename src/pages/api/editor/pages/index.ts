import { CreatePageRequest } from "./../../../../builder/services/PageService/PageService.types";
import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "@builder/lib/dbconnect";
import ApiRequestHandler from "@server/utils/ApiRequestHandler";
import PageService from "@builder/services/PageService";
import {
  ListPageRequest,
  UpdatePageComponentsRequest,
} from "@builder/services/PageService/PageService.types";

class PageComponentHandler extends ApiRequestHandler {
  public async patch() {
    const value: UpdatePageComponentsRequest = this.request.body;

    const mongoClient = await clientPromise;

    const pageService = new PageService(mongoClient);

    const result = await pageService.updatePage(value);

    this.response.json(result);
  }

  public async get() {
    const query: ListPageRequest = this.request.query;

    const mongoClient = await clientPromise;

    const pageService = new PageService(mongoClient);

    const result = await pageService.listPages(query);

    this.response.json(result);
  }

  public async post() {
    const body: CreatePageRequest = this.request.body;

    const mongoClient = await clientPromise;

    const pageService = new PageService(mongoClient);

    const result = await pageService.createPage(body);

    this.response.json(result);
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const api = new PageComponentHandler(req, res);

  await api.execute();
}
