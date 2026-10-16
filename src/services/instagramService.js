/**
 * Instagram Graph / Basic Display API Service
 * Allows @dancingragasbymalavika to ingest live reels & posts dynamically.
 * 
 * Supports:
 * 1. Environment variable: VITE_INSTAGRAM_ACCESS_TOKEN
 * 2. In-browser storage: localStorage.getItem("instagram_access_token")
 * 3. Graceful fallback to the curated 9 posts when offline or token is absent
 */

const CACHE_KEY = "instagram_media_cache_v1";
const CACHE_TIME_KEY = "instagram_media_timestamp_v1";
const CACHE_TTL_MS = 15 * 60 * 1000; // 15 minutes cache to prevent rate-limiting

export function getStoredInstagramToken() {
  if (typeof window === "undefined") return "";
  return (
    import.meta.env.VITE_INSTAGRAM_ACCESS_TOKEN ||
    localStorage.getItem("instagram_access_token") ||
    ""
  );
}

export function saveInstagramToken(token) {
  if (typeof window === "undefined") return;
  if (token && token.trim()) {
    localStorage.setItem("instagram_access_token", token.trim());
    sessionStorage.removeItem(CACHE_KEY);
  } else {
    localStorage.removeItem("instagram_access_token");
    sessionStorage.removeItem(CACHE_KEY);
  }
}

/**
 * Fetch live Instagram media from Meta Graph API
 */
export async function fetchLiveInstagramMedia() {
  const token = getStoredInstagramToken();
  if (!token) {
    return null; // Fallback to curated 9 posts
  }

  // Check cache first
  try {
    const cached = sessionStorage.getItem(CACHE_KEY);
    const cachedTime = sessionStorage.getItem(CACHE_TIME_KEY);
    if (cached && cachedTime && Date.now() - Number(cachedTime) < CACHE_TTL_MS) {
      return JSON.parse(cached);
    }
  } catch {
    // SessionStorage unavailable/full, continue
  }

  try {
    const url = `https://graph.instagram.com/me/media?fields=id,caption,media_type,media_url,permalink,thumbnail_url,timestamp&limit=12&access_token=${encodeURIComponent(token)}`;
    const res = await fetch(url);
    if (!res.ok) {
      console.warn("Instagram API returned status", res.status);
      return null;
    }
    const data = await res.json();
    if (!data || !data.data || !Array.isArray(data.data)) {
      return null;
    }

    const formatted = data.data.map((item, index) => {
      const isVideo = item.media_type === "VIDEO";
      const titleFromCaption = item.caption
        ? item.caption.split("\n")[0].slice(0, 40)
        : `Performance ${index + 1}`;

      return {
        id: `insta-live-${item.id}`,
        type: isVideo ? "reel" : "post",
        reelIndex: isVideo ? index % 6 : 0,
        title: titleFromCaption,
        caption: item.caption || "Sacred classical dance and music sadhana by Dr. Malavika M. Sunil.",
        imageUrl: item.thumbnail_url || item.media_url || "/images/malavika_dance_stage.jpg",
        videoUrl: isVideo ? item.media_url : null,
        likes: "Live",
        comments: "Live",
        views: isVideo ? "Live Reel" : "Photo",
        tag: isVideo ? "Reel" : "Post",
        instagramUrl: item.permalink || "https://www.instagram.com/dancingragasbymalavika/",
        timestamp: item.timestamp
      };
    });

    try {
      sessionStorage.setItem(CACHE_KEY, JSON.stringify(formatted));
      sessionStorage.setItem(CACHE_TIME_KEY, String(Date.now()));
    } catch {}

    return formatted;
  } catch (err) {
    console.warn("Error fetching live Instagram posts:", err);
    return null;
  }
}
