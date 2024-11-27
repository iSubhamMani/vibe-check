"use server";

import { getServerSession } from "next-auth";
import prisma from "../db";
import { authOptions } from "@/app/api/auth/[...nextauth]/config";
import { pusherServer } from "../pusher";

export const voteMusic = async (musicId: string, roomCode: string) => {
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

  // check if music exists in this room
  const musicExists = await prisma.music.findFirst({
    where: {
      roomCode,
      musicId,
    },
  });

  if (!musicExists) {
    return {
      data: null,
      error: "Music does not exist in this room",
      success: false,
    };
  }

  // check if already voted

  if (musicExists.votes.includes(currentUser.id)) {
    // remove vote
    await prisma.music.update({
      where: {
        id: musicExists.id,
      },
      data: {
        votes: {
          set: musicExists.votes.filter((id) => id !== currentUser.id),
        },
        votesCount: {
          decrement: 1,
        },
      },
    });
  } else {
    // add vote
    await prisma.music.update({
      where: {
        id: musicExists.id,
      },
      data: {
        votes: {
          push: currentUser.id,
        },
        votesCount: {
          increment: 1,
        },
      },
    });
  }
  await pusherServer.trigger(`room-${roomCode}`, "update-queue", null);

  return {
    data: null,
    error: null,
    success: true,
  };
};
