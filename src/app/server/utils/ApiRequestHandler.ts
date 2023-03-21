import { NextApiRequest, NextApiResponse } from "next";
import { isAxiosError } from "axios";

interface IRequestHandler {
  post: (...args: any) => Promise<any>;
  get: (...args: any) => Promise<any>;
  patch: (...args: any) => Promise<any>;
  put: (...args: any) => Promise<any>;
  delete: (...args: any) => Promise<any>;
}

export default class ApiRequestHandler implements IRequestHandler {
  public request: NextApiRequest;
  public response: NextApiResponse;

  constructor(req: NextApiRequest, res: NextApiResponse) {
    this.request = req;
    this.response = res;
  }

  public async execute() {
    try {
      switch (this.request.method) {
        case "POST": {
          return await this.post();
        }

        case "GET": {
          return await this.get();
        }

        case "PATCH": {
          return await this.patch();
        }

        case "PUT": {
          return await this.put();
        }

        case "DELETE": {
          return await this.delete();
        }
      }
    } catch (error) {
      if (isAxiosError(error)) {
        return this.response.status(error.response?.status || 500).end();
      }

      return this.response.status(500).end();
    }
  }

  public async post(...args: any): Promise<void> {
    this.response.status(404).end("Page not found!");
    return;
  }

  public async get(...args: any): Promise<any> {
    this.response.status(404).end("Page not found!");
    return;
  }

  public async patch(...args: any): Promise<void> {
    this.response.status(404).end("Page not found!");
    return;
  }

  public async put(...args: any): Promise<void> {
    this.response.status(404).end("Page not found!");
    return;
  }

  public async delete(...args: any): Promise<void> {
    this.response.status(404).end("Page not found!");
    return;
  }
}
