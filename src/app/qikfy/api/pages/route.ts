import { updatePageService } from "@/qikfy/backend/services/pages";
import {
  searchPageService,
  createPage,
  deletePage,
} from "@/qikfy/bff/services/pages";

export async function PUT(request: Request) {
  const { _id, ...res } = await request.json();

  await updatePageService(res);

  return Response.json(null);
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const name = searchParams.get("name") || "";
  const skip = Number(searchParams.get("skip"));
  const take = Number(searchParams.get("take"));

  const pageSearchResult = await searchPageService({ name, skip, take });

  return Response.json(pageSearchResult);
}

export async function POST(request: Request) {
  const data = await request.json();

  const { statusCode, ...result } = await createPage(data);

  return Response.json(null);
}

export async function DELETE(request: Request) {
  const data = await request.json();

  await deletePage(data.id);

  return new Response(null, { status: 204 });
}
