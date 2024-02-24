import { NextResponse } from "next/server";
import { getRepoCommits } from "@/services";

export async function GET(request, { params }) {
  const { username, reponame } = params ?? {};
  const commits = await getRepoCommits(username, reponame);
  return NextResponse.json(commits);
}
