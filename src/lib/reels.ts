import { unstable_cache } from "next/cache";

export const REELS = [
  { id: "DbGM6v7z2KU", desc: "Happy Customer Review" },
  { id: "Dax9vl1pXQC", desc: "Customer Review from USA" },
  { id: "DaS_iwBpfOR", desc: "Bat Stickers Printing Process" },
  { id: "DW3lLfmCQFx", desc: "Owner Showing Product Going to UK" },
  { id: "DUiSLlBCR9v", desc: "Owner Showing Off to UAE" },
  { id: "DOqp61liTr3", desc: "Another Happy Customer" },
  { id: "DOoGbsQCbni", desc: "Bat Making Process" },
  { id: "DOBh4tKCWc3", desc: "Multiple Bats Showcase" },
  { id: "DNN9hdDJxQR", desc: "Bat Being Laser Engraved" },
];

export interface Reel {
  id: string;
  url: string;
  thumbnail: string | null;
  title: string;
}

async function fetchReels(): Promise<Reel[]> {
  const results: Reel[] = [];

  await Promise.allSettled(
    REELS.map(async (reel) => {
      const controller = new AbortController();
      const timer = setTimeout(() => controller.abort(), 4000);
      try {
        const resp = await fetch(`https://www.instagram.com/reel/${reel.id}/`, {
          headers: { "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36" },
          signal: controller.signal,
        });
        const html = await resp.text();
        const match = html.match(/<meta\s+property="og:image"\s+content="([^"]+)"/);
        const thumbnail = match ? match[1].replace(/&amp;/g, "&") : null;
        results.push({
          id: reel.id,
          url: `https://www.instagram.com/reel/${reel.id}/`,
          thumbnail,
          title: reel.desc,
        });
      } catch {
        results.push({
          id: reel.id,
          url: `https://www.instagram.com/reel/${reel.id}/`,
          thumbnail: null,
          title: reel.desc,
        });
      } finally {
        clearTimeout(timer);
      }
    })
  );

  return results;
}

export const getCachedReels = unstable_cache(fetchReels, ["instagram-reels"], {
  revalidate: 6 * 60 * 60, // 6 hours
});