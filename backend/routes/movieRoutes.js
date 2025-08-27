// routes/movieRoutes.js
const express = require("express");
const router = express.Router();

// ✅ Correct import (with destructuring)
const { generateMovieRecommendation } = require("../controllers/movieController");

// ✅ Register route
router.post("/recommend", generateMovieRecommendation);

module.exports = router;
