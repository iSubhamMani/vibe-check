import MusicSearch from "./MusicSearch";

const MusicDisplay = ({ roomCode }: { roomCode: string }) => {
  return (
    <div className="rounded-md h-full pt-6 px-6 bg-white">
      <h1 className="font-bold text-2xl text-start pb-4">Currently Playing</h1>

      <MusicSearch roomCode={roomCode} />
    </div>
  );
};

export default MusicDisplay;
