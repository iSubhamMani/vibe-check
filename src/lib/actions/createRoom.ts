"use server";

import { getServerSession } from "next-auth";
import prisma from "../db";
import { authOptions } from "@/app/api/auth/[...nextauth]/config";

export async function createRoom() {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) return null;

  const currentUser = await prisma.user.findUnique({
    where: {
      email: session.user.email!,
    },
  });

  if (!currentUser) return null;

  const room = await prisma.room.create({
    data: {
      roomCode: Math.floor(Math.random() * 1000000).toString(),
      owner: {
        connect: {
          id: currentUser.id,
        },
      },
    },
  });

  return room.roomCode;
}
