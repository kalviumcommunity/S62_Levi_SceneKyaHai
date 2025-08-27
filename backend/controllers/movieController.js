// controllers/movieController.js
const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

const generateMovieRecommendation = async (req, res) => {
  try {
    const { genre, mood, year, language } = req.body;

    if (!genre || !mood) {
      return res.status(400).json({
        success: false,
        message: "Please provide both genre and mood",
      });
    }

    // ========= PROMPTING STRATEGIES =========

    // ✅ ZERO-SHOT
    /*
    const prompt = `Recommend 3 movies in the genre "${genre}" for someone in a "${mood}" mood. 
    Respond strictly in JSON like this: { "movies": ["Movie1", "Movie2", "Movie3"] }`;
    */

    // ✅ ONE-SHOT
    /*
    const prompt = `
    Input: genre = "Action", mood = "Excited"
    Output (JSON): { "movies": ["Mad Max: Fury Road", "John Wick", "Die Hard"] }

    Now, using the same format:
    Input: genre = "${genre}", mood = "${mood}"
    Output (JSON):
    `;
    */

    // ✅ MULTI-SHOT
    /*
    const prompt = `
    Example 1:
    Input: genre = "Comedy", mood = "Sad"
    Output (JSON): { "movies": ["The Intouchables", "Groundhog Day", "The Grand Budapest Hotel"] }

    Example 2:
    Input: genre = "Romance", mood = "Happy"
    Output (JSON): { "movies": ["La La Land", "Notting Hill", "Crazy Rich Asians"] }

    Now, using the same format:
    Input: genre = "${genre}", mood = "${mood}"
    Output (JSON):
    `;
    */

    // ✅ SYSTEM + USER PROMPTING
    /*
    const systemPrompt = `
    You are a helpful movie recommendation assistant.
    Always respond only in JSON format with this structure:
    { "movies": ["Movie1", "Movie2", "Movie3"] }
    `;

    const userPrompt = `
    Recommend 3 movies in the genre "${genre}" for someone in a "${mood}" mood.
    `;

    const prompt = systemPrompt + "\n" + userPrompt;
    */

    // ✅ DYNAMIC PROMPTING
    let extraContext = "";
    if (year) extraContext += ` around the year ${year}`;
    if (language) extraContext += ` in ${language} language`;

    const prompt = `
You are a movie recommendation assistant.
Recommend exactly 3 movies.

Respond only in JSON:
{
  "movies": [
    { "title": "Movie 1", "year": "Year", "reason": "Why this movie" },
    { "title": "Movie 2", "year": "Year", "reason": "Why this movie" },
    { "title": "Movie 3", "year": "Year", "reason": "Why this movie" }
  ]
}
`;


    // ========= CALL GEMINI =========
    const result = await model.generateContent(prompt);
    let response = result.response.text();

    // 🧹 Clean up markdown fences if present
    response = response.replace(/```json|```/g, "").trim();

    let parsed;
    try {
      parsed = JSON.parse(response);
    } catch (parseErr) {
      console.error("JSON Parse Error:", response);
      return res.status(500).json({
        success: false,
        message: "Failed to parse Gemini response",
        rawResponse: response,
      });
    }

    res.status(200).json({
      success: true,
      data: parsed.movies || [],
    });
  } catch (error) {
    console.error("Gemini API Error:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { generateMovieRecommendation };
