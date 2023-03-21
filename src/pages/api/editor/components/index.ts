import { NextApiRequest, NextApiResponse } from "next";
import clientPromise from "@builder/lib/dbconnect";
import PageComponentService from "@builder/services/PageComponentService";
import {
  AddComponentRequest,
  DeleteComponentRequest,
  EditComponentRequest,
} from "@builder/services/PageComponentService/PageComponentService.types";
import ApiRequestHandler from "@server/utils/ApiRequestHandler";

class PageComponentHandler extends ApiRequestHandler {
  public async post() {
    const value: AddComponentRequest = this.request.body;

    const mongoClient = await clientPromise;

    const pageComponentService = new PageComponentService(mongoClient);

    const result = await pageComponentService.addComponent(value);

    this.response.json(result);
  }

  public async patch() {
    const value: EditComponentRequest = this.request.body;

    const mongoClient = await clientPromise;

    const pageComponentService = new PageComponentService(mongoClient);

    const result = await pageComponentService.editComponent(value);

    this.response.json(result);
  }

  public async delete() {
    const value: DeleteComponentRequest = this.request.body;

    const mongoClient = await clientPromise;

    const pageComponentService = new PageComponentService(mongoClient);

    const result = await pageComponentService.deleteComponent(value);

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
