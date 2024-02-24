import {NextResponse} from "next/server";

import { getRepos } from "@/services";

export async function GET(request, { params = {} }) {
  const { username = '' } = params ?? {}
  const data = await getRepos(username);
  return NextResponse.json({data})
}