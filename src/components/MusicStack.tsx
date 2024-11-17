import { MusicCard } from "./MusicCard";

const MusicStack = () => {
  return (
    <div className="flex-1 border pt-6 px-6 rounded-md shadow-sm bg-gradient-to-bl from-white to-indigo-100 h-[500px]">
      <h1 className="font-bold text-2xl text-start pb-4">Up Next</h1>
      <ul className="py-1 overflow-auto max-h-[400px] " role="listbox"></ul>
    </div>
  );
};

export default MusicStack;
