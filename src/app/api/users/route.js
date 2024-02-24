import { NextResponse } from "next/server";
import { GITHUB_ACCESS_TOKEN } from "@/constants";
import { searchUsers } from "@/services";

export async function GET(request) {
  const query = request.nextUrl.searchParams;
  const username = query.get("username");

  const data = await searchUsers({ username });

  return NextResponse.json({ data: data.items });
}
