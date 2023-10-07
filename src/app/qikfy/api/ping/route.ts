import { connectToDatabase } from "@/qikfy/backend/database/mongodb";

export async function GET(request: Request) {
  return Response.json({ hello: "world" });
}
