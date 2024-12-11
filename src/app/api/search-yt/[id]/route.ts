import { NextRequest, NextResponse } from "next/server";
import YTMusic from "ytmusic-api";

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const musicId = url.pathname.split("/").pop();

    if (!musicId) throw new Error("Music ID is required");

    const ytmusic = new YTMusic();
    await ytmusic.initialize();

    const response = await ytmusic.getVideo(musicId);

    return NextResponse.json({
      success: true,
      data: response,
      error: null,
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      data: error,
      error: error instanceof Error ? error.message : "Something went wrong",
    });
  }
}
