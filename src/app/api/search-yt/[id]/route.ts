import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url);
    const musicId = url.pathname.split("/").pop();

    if (!musicId) throw new Error("Music ID is required");

    const ytApiUrl = `https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,topicDetails&id=${musicId}&key=${process.env.GOOGLE_API_KEY}`;

    const res = await axios.get(ytApiUrl);

    const musicDetails = {
      type: "SONG",
      name: res.data.items[0].snippet.title,
      videoId: musicId,
      artist: {
        artistId: null,
        name: res.data.items[0].snippet.channelTitle,
      },
      album: null,
      duration: res.data.items[0].contentDetails.duration,
      thumbnails: [
        {
          url: res.data.items[0].snippet.thumbnails.standard.url,
          width: res.data.items[0].snippet.thumbnails.standard.width,
          height: res.data.items[0].snippet.thumbnails.standard.height,
        },
      ],
    };

    return NextResponse.json({
      success: true,
      data: musicDetails,
      error: null,
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      data: error,
      error: error instanceof Error ? error.message : "Something went wrong",
    });
  }
}
