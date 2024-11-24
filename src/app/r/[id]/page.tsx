import MainBg from "@/components/MainBg";
import MusicDisplay from "@/components/MusicDisplay";
import MusicQueue from "@/components/MusicQueue";
import prisma from "@/lib/db";
import Link from "next/link";

const Room = async ({ params }: { params: Promise<{ id: string }> }) => {
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

  return (
    <MainBg>
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 pt-6 md:pt-16 pb-6">
        <div className="mb-6">
          <button>
            <Link href={"/dashboard"}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="#4f46e5"
                className="size-6 md:size-7"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m11.25 9-3 3m0 0 3 3m-3-3h7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
            </Link>
          </button>
        </div>
        <div className="flex flex-col-reverse lg:flex-row gap-8 justify-between">
          <MusicQueue roomCode={room.roomCode} />
          <MusicDisplay roomCode={room.roomCode} />
        </div>
      </div>
    </MainBg>
  );
};

export default Room;
