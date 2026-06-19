// /api/pexels.js
//
// Vercel serverless function — proxies requests to Pexels so the API key
// never reaches the browser, and so the browser never talks cross-origin
// to api.pexels.com directly (which is what was failing in the artifact
// preview / can be unreliable cross-browser in general).
//
// Setup in Vercel:
//   1. Place this file at the project root under /api/pexels.js
//      (alongside your Vite app — Vercel auto-detects it as a function,
//      no extra config needed).
//   2. In Vercel → Project Settings → Environment Variables, add:
//        PEXELS_API_KEY = <your real key from pexels.com/api>
//   3. Redeploy. The function is then reachable at:
//        https://sketchattitude.com/api/pexels?query=yoga+pose
//
// Local testing: `vercel dev` reads the same env var from a local
// `.env.local` file (PEXELS_API_KEY=...), or from `vercel env pull`.

export default async function handler(req, res) {
  const apiKey = process.env.PEXELS_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: "PEXELS_API_KEY er ikke satt i Vercel-miljøvariabler" });
  }

  const { query, per_page = "40", orientation = "portrait", page = "1" } = req.query;
  if (!query) {
    return res.status(400).json({ error: "Mangler ?query=" });
  }

  try {
    const url = `https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&per_page=${per_page}&orientation=${orientation}&page=${page}`;
    const r = await fetch(url, { headers: { Authorization: apiKey } });
    const data = await r.json();

    if (!r.ok) {
      return res.status(r.status).json({ error: data.error || `Pexels-feil (${r.status})` });
    }

    // Cache for 1 hour at the edge — pose photos don't change, and this
    // cuts down on Pexels API usage if many people draw from the same query.
    res.setHeader("Cache-Control", "public, s-maxage=3600, stale-while-revalidate=86400");

    // Slim payload down to exactly what the app needs.
    const photos = (data.photos || []).map(p => ({
      id: p.id,
      url: p.src.large2x || p.src.large,
      credit: p.photographer,
      creditUrl: p.photographer_url,
    }));

    return res.status(200).json({ photos });
  } catch (e) {
    return res.status(502).json({ error: "Kunne ikke nå Pexels: " + e.message });
  }
}
