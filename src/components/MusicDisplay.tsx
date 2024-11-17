import MusicSearch from "./MusicSearch";

const MusicDisplay = () => {
  return (
    <div className="border py-6 px-6 rounded-md shadow-sm bg-white">
      <MusicSearch />
      <h1 className="font-bold text-xl text-start my-6">Currently Playing</h1>
    </div>
  );
};

export default MusicDisplay;
