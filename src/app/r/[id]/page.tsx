import MainBg from "@/components/MainBg";
import MusicDisplay from "@/components/MusicDisplay";
import MusicStack from "@/components/MusicStack";
import prisma from "@/lib/db";

const Room = async ({ params }: { params: Promise<{ id: string }> }) => {
  const roomId = await prisma.room.findUnique({
    where: {
      roomCode: (await params).id,
    },
  });

  if (!roomId) {
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
      <div className="px-4 sm:px-6 w-full max-w-6xl mx-auto flex flex-col-reverse md:flex-row pt-6 md:pt-16 pb-6 gap-8 justify-between">
        <MusicStack />
        <MusicDisplay />
      </div>
    </MainBg>
  );
};

export default Room;
