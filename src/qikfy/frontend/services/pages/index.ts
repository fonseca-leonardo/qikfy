import { QikfyPageModel } from "@/@types/builder";
import qikfyApi from "../../http/qikfyApi";

export async function updatePage(page: QikfyPageModel) {
  const { data } = await qikfyApi.put("/pages", page);
}
