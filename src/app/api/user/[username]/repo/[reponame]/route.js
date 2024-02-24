import { NextResponse } from "next/server";
import { getRepoDetails } from "@/services";

export async function GET(request, { params = {} }) {
  const { username, reponame } = params ?? {};
  const [readme, contributors, commits] = await getRepoDetails(
    username,
    reponame,
  );
  return NextResponse.json({ readme, contributors, commits });
}
