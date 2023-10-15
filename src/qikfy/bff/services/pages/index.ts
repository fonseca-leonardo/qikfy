import {
  ApiResponse,
  MongoQikfyPageModel,
  QikfyPageModel,
  QikfySearchQuery,
  QikfySearchResult,
} from "@/@types/builder";
import { makeEditorUrl } from "../../http";

export async function getPageDetailService(
  pagePath: string
): Promise<ApiResponse<MongoQikfyPageModel>> {
  const response = await fetch(makeEditorUrl(`/pages/detail${pagePath}`), {
    cache: "no-cache",
  });

  const result: ApiResponse<MongoQikfyPageModel> = await response.json();

  return result;
}

export async function searchPageService(
  query: QikfySearchQuery<{ name: string }>
): Promise<ApiResponse<QikfySearchResult<MongoQikfyPageModel>>> {
  const { name, skip, take } = query;

  const params = `?${new URLSearchParams({
    name,
    skip: skip.toString(),
    take: take.toString(),
  })}`;

  const response = await fetch(makeEditorUrl(`/pages${params}`), {
    cache: "no-cache",
  });

  const result: ApiResponse<QikfySearchResult<MongoQikfyPageModel>> =
    await response.json();

  return result;
}

export async function createPage(page: QikfyPageModel) {
  const response = await fetch(makeEditorUrl("/pages"), {
    method: "POST",
    body: JSON.stringify(page),
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-cache",
  });

  return { statusCode: response.status };
}

export async function deletePage(pageId: string) {
  await fetch(makeEditorUrl(`/pages/${pageId}`), {
    method: "DELETE",
  });
}
