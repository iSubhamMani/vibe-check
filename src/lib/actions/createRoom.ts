"use server";

import { getServerSession } from "next-auth";
import prisma from "../db";
import { authOptions } from "@/app/api/auth/[...nextauth]/config";

export async function createRoom() {
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

  // check if room already exists for user

  const isExistingRoom = await prisma.room.findFirst({
    where: {
      owner_id: currentUser.id,
    },
  });

  if (isExistingRoom)
    return {
      data: null,
      error: "A room already exists. Please end it first",
      success: false,
    };

  const room = await prisma.room.create({
    data: {
      roomCode: Math.floor(Math.random() * 1000000).toString(),
      owner_id: currentUser.id,
    },
  });

  return {
    data: room.roomCode,
    success: true,
    error: null,
  };
}
