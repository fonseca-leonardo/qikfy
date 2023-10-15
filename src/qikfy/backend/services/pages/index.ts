import {
  ApiResponse,
  MongoQikfyPageModel,
  QikfyPageModel,
  QikfySearchQuery,
  QikfySearchResult,
} from "@/@types/builder";
import { makeEditorUrl } from "../../http";
import { connectToDatabase } from "../../database/mongodb";
import { Filter } from "mongodb";

export async function getPageService(
  pagePath: string
): Promise<MongoQikfyPageModel> {
  const response = await fetch(makeEditorUrl(`/pages/detail${pagePath}`), {
    cache: "no-cache",
  });

  if (!response.ok) throw Error();

  const result: ApiResponse<MongoQikfyPageModel> = await response.json();

  return result.data;
}

export async function updatePageService(page: MongoQikfyPageModel) {
  const { db } = await connectToDatabase();

  await db.collection<QikfyPageModel>("pages", {}).findOneAndUpdate(
    { pagePath: page.pagePath },
    {
      $set: page,
    }
  );
}

export async function createPage(page: QikfyPageModel) {
  const { db } = await connectToDatabase();

  const pageCollection = db.collection<QikfyPageModel>("pages", {});

  const exists = await pageCollection.findOne({
    pagePath: page.pagePath,
  });

  if (exists) return { statusCode: 400, message: "Página já existe" };

  await pageCollection.insertOne(page);

  return { statusCode: 200, message: "Página criada!" };
}

export async function deletePage(pagePath: string) {
  const { db } = await connectToDatabase();

  const pageCollection = db.collection<QikfyPageModel>("pages", {});

  await pageCollection.findOneAndDelete({
    pagePath,
  });
}
