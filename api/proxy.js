export default async function handler(req, res) {
  const { phone } = req.query;

  // keep your API key safe here (server-side only!)
  const API_KEY = "Pkcka4f2BbdHh2FhzJtx";

  try {
    const response = await fetch(
      `https://api.blacklistalliance.net/lookup?key=${API_KEY}&ver=v3&resp=json&phone=${phone}`,
      {
        method: "GET",
        headers: { "Accept": "application/json" },
      }
    );

    if (!response.ok) {
      return res
        .status(response.status)
        .json({ error: `Upstream error: ${response.status}` });
    }

    const data = await response.json();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: "Proxy server error", details: err.message });
  }
}
