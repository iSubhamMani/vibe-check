import { YoutubeMusic } from "@/lib/interface/YTMusic";
import Image from "next/image";

export const MusicCard = ({ music }: { music: YoutubeMusic }) => {
  return (
    <li key={music.videoId} className="px-2 py-2">
      <div className="flex items-start gap-3">
        <Image
          src={music.thumbnails[1].url}
          alt={`${music.name} thumbnail`}
          className="w-[120px] h-[80px] rounded-md object-cover shadow-md"
          width={120}
          height={80}
        />
        <div className="flex flex-col">
          <span className="line-clamp-2 font-medium text-base">
            {music.name}
          </span>
          <span className="text-sm text-gray-500">{music.artist.name}</span>
        </div>
      </div>
    </li>
  );
};
