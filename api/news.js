export default async function handler(req, res) {
  try {
    const apiKey = process.env.GNEWS_API_KEY;
    const apiUrl = `https://gnews.io/api/v4/top-headlines?apikey=${apiKey}&lang=en&country=us&max=4`;

    const response = await fetch(apiUrl);
    if (!response.ok) throw new Error(`API error: ${response.status}`);

    const data = await response.json();

    // Allow frontend to access this data
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
