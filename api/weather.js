export default async function handler(req, res) {
  try {
    const apiKey = process.env.WEATHER_API_KEY;
    const { city } = req.query;
    const apiUrl = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${city}`;

    const response = await fetch(apiUrl);
    if (!response.ok) throw new Error("API error:", response.status);

    const data = await response.json();

    // Allow frontend to access this data
    // res.setHeader("Access-Control-Allow-Origin", "https://taruros.github.io");
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
