// controllers/movieController.js
const { GoogleGenerativeAI } = require("@google/generative-ai");
require("dotenv").config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

const generateMovieRecommendation = async (req, res) => {
  try {
    const { genre, mood } = req.body;

    if (!genre || !mood) {
      return res.status(400).json({
        success: false,
        message: "Please provide both genre and mood",
      });
    }

      const prompt = `
I want you to recommend movies based on genre and mood.
Here is one example:

Input: genre = "Action", mood = "Excited"
Output (JSON): { "movies": ["Mad Max: Fury Road", "John Wick", "Die Hard"] }

Now, using the same format, recommend 3 movies.

Input: genre = "${genre}", mood = "${mood}"
Output (JSON):
`;

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
