import { updatePageService } from "@/qikfy/backend/services/pages";

export async function PUT(request: Request) {
  const res = await request.json();

  await updatePageService(res);

  return Response.json(null, { status: 204 });
}
