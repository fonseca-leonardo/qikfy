import {
  ApiResponse,
  MongoQikfyPageModel,
  QikfyPageModel,
  QikfySearchResult,
} from "@/@types/builder";
import qikfyApi from "../../http/qikfyApi";
import { SearchPageList } from "@/app/qikfy/paginas/page";

export async function updatePage(page: QikfyPageModel) {
  const { data } = await qikfyApi.put("/pages", page);
}

export async function createPage(page: QikfyPageModel) {
  const { data } = await qikfyApi.post("/pages", page);
}

export async function deletePage(id: string) {
  const { data } = await qikfyApi.delete("/pages", {
    data: { id },
  });
}

export async function searchPage(
  search?: SearchPageList
): Promise<ApiResponse<QikfySearchResult<MongoQikfyPageModel>>> {
  const { data } = await qikfyApi.get("/pages", {
    params: search,
  });

  return data;
}
