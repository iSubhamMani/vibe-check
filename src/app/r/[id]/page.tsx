import { authOptions } from "@/app/api/auth/[...nextauth]/config";
import MainBg from "@/components/MainBg";
import MusicDisplay from "@/components/MusicDisplay";
import MusicQueue from "@/components/MusicQueue";
import MusicSearch from "@/components/MusicSearch";
import prisma from "@/lib/db";
import { getServerSession } from "next-auth";

const Room = async ({ params }: { params: Promise<{ id: string }> }) => {
  const session = await getServerSession(authOptions);

  const room = await prisma.room.findUnique({
    where: {
      roomCode: (await params).id,
    },
  });

  if (!room) {
    return (
      <MainBg>
        <div className="min-h-screen px-4 sm:px-6 w-full max-w-6xl mx-auto flex justify-center items-center">
          <h1 className="text-xl md:text-3xl bg-clip-text text-transparent bg-gradient-to-b from-indigo-500 to-purple-600 text-bloc font-bold text-center">
            Sorry no such room exists
          </h1>
        </div>
      </MainBg>
    );
  }

  const user = await prisma.user.findUnique({
    where: {
      email: session?.user?.email ?? undefined,
    },
  });

  const isRoomOwner = room.owner_id === user?.id;

  return (
    <MainBg>
      <div className="py-4 px-4 min-h-screen lg:h-screen flex">
        <div className="w-full flex-1 rounded-md max-w-6xl mx-auto border flex flex-col-reverse lg:flex-row">
          <div className="w-full flex-1 lg:w-2/5 md:border-r h-full">
            <MusicQueue roomCode={room.roomCode} />
          </div>
          <div className="w-full lg:w-3/5 lg:h-full">
            <div className="rounded-md h-full pt-6 px-6 bg-white">
              {isRoomOwner && <MusicDisplay roomCode={room.roomCode} />}
              <MusicSearch roomCode={room.roomCode} />
            </div>
          </div>
        </div>
      </div>
    </MainBg>
  );
};

export default Room;
