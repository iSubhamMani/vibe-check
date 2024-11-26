import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const roomCode = url.pathname.split("/").pop();

    if (!roomCode) throw new Error("Room Code is required");

    const room = await prisma.room.findFirst({
      where: {
        roomCode,
      },
    });

    if (!room) throw new Error("Room not found");

    const musicQueue = await prisma.music.findMany({
      where: {
        roomCode: room.roomCode,
      },
      orderBy: [{ votes: "desc" }, { createdAt: "asc" }],
    });

    return NextResponse.json({
      success: true,
      error: null,
      data: musicQueue,
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : "Something went wrong",
      data: null,
    });
  }
}
