"use server";

import { authOptions } from "@/app/api/auth/[...nextauth]/config";
import { getServerSession } from "next-auth";
import prisma from "../db";
import { pusherServer } from "../pusher";

export async function addMusicToQueue(musicId: string, roomCode: string) {
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

  if (!room)
    return {
      success: false,
      data: null,
      error: "Room not found",
    };

  // check if music already exists in queue

  const existingMusic = await prisma.music.findFirst({
    where: {
      musicId,
      roomCode,
    },
  });

  if (existingMusic) {
    return {
      data: null,
      error: "Music already exists in queue",
      success: false,
    };
  }

  await prisma.music.create({
    data: {
      musicId,
      roomCode,
      createdAt: new Date().toISOString(),
    },
  });

  // broadcast update

  await pusherServer.trigger(`room-${roomCode}`, "update-queue", null);

  return {
    success: true,
    data: null,
    error: null,
  };
}
