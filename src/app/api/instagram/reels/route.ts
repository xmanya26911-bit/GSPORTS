import { NextResponse } from "next/server";
import { getCachedReels } from "@/lib/reels";

export const dynamic = "force-dynamic";

export async function GET() {
  const reels = await getCachedReels();
  return NextResponse.json({ reels, count: reels.length });
}