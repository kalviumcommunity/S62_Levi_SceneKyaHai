import axios from "axios";

const API_URL = "http://localhost:5000/api/movies"; // adjust if backend deployed

export const getMovieRecommendations = async (genre, mood) => {
  try {
    const response = await axios.post(`${API_URL}/recommend`, { genre, mood });
    return response.data;
  } catch (error) {
    console.error("Error fetching movies:", error);
    return { success: false, message: "Failed to fetch movies" };
  }
};
