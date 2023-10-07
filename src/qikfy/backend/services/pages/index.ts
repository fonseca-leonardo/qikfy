import { QikfyPageModel } from "@/@types/builder";
import { connectToDatabase } from "../../database/mongodb";

export async function getPageService(
  pagePath: string
): Promise<QikfyPageModel> {
  const { db } = await connectToDatabase();

  const result = await db
    .collection<QikfyPageModel>("pages", {})
    .findOne({ pagePath });

  if (!result) throw Error();

  const { _id, ...data } = result;

  return data;
}

export async function updatePageService(page: QikfyPageModel) {
  const { db } = await connectToDatabase();

  await db.collection<QikfyPageModel>("pages", {}).findOneAndUpdate(
    { pagePath: page.pagePath },
    {
      $set: page,
    }
  );
}
