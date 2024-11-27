import prisma from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "@/app/api/auth/[...nextauth]/config";
import { getServerSession } from "next-auth";

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const roomCode = url.pathname.split("/").pop();

    if (!roomCode) throw new Error("Room Code is required");

    const session = await getServerSession(authOptions);

    if (!session || !session.user)
      return {
        data: null,
        error: "Unauthenticated",
        success: false,
      };

    const currentUser = await prisma.user.findUnique({
      where: {
        email: session.user.email!,
      },
    });

    if (!currentUser)
      return {
        data: null,
        error: "User not found",
        success: false,
      };

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
      orderBy: [{ votesCount: "desc" }, { createdAt: "asc" }],
    });

    const musicQueueWithVotes = musicQueue.map((music) => {
      return {
        ...music,
        isVoted: music.votes.includes(currentUser.id),
      };
    });

    return NextResponse.json({
      success: true,
      error: null,
      data: musicQueueWithVotes,
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : "Something went wrong",
      data: null,
    });
  }
}
