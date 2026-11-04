import { readdir } from "fs/promises";
import path from "path";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const MUSIC_DIR = "/www/wwwroot/music";
const AUDIO = new Set([".mp3", ".flac", ".wav", ".m4a", ".ogg", ".aac"]);

function encodeName(name: string) {
  return encodeURIComponent(name);
}

function parseName(filename: string) {
  const base = path.basename(filename, path.extname(filename));
  const parts = base.split(/\s*[-–—]\s*/);
  if (parts.length >= 2) {
    return { title: parts.slice(0, -1).join("-"), artist: parts[parts.length - 1] };
  }
  return { title: base, artist: "未知歌手" };
}

export async function GET() {
  let entries: string[] = [];
  try {
    entries = await readdir(MUSIC_DIR);
  } catch {
    return NextResponse.json([]);
  }

  const songs = entries
    .filter((file) => AUDIO.has(path.extname(file).toLowerCase()))
    .sort((a, b) => a.localeCompare(b, "zh"))
    .map((file) => {
      const { artist, title } = parseName(file);
      const base = path.basename(file, path.extname(file));
      const lrcName = entries.find((name) => name.toLowerCase() === `${base}.lrc`.toLowerCase());
      return {
        id: encodeName(file),
        title,
        artist,
        cover: "/icon.png",
        src: `/local-music/${encodeName(file)}`,
        lrcUrl: lrcName ? `/local-music/${encodeName(lrcName)}` : "",
      };
    });

  return NextResponse.json(songs);
}
