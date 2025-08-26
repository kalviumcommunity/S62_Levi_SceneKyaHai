# 🎬 SceneKyaHai – Mood-based Movie Generator

**SceneKyaHai** is an AI-powered movie recommendation system that suggests films based on your current mood.  
Built as part of the *Developing AI Agents using GenAI* course, it demonstrates how GenAI concepts can be applied in real-world apps.

---

## 🚀 Features
- Enter your mood in natural language (e.g., *“I’m feeling adventurous but stressed”*).
- AI analyzes emotions and generates structured JSON output.
- Recommender Agent fetches movies matching mood (via TMDB API).
- Posters, ratings, and trailers shown in a clean UI.
- Multi-agent architecture: **Mood Analyzer Agent + Recommender Agent**.

---

## 🧑‍💻 Tech Stack
- **Frontend:** React + Vite  
- **Backend:** Node.js + Express  
- **Database:** MongoDB (for caching/search history)  
- **AI:** OpenAI / DeepSeek LLMs  
- **Movie Data:** TMDB API  

---

## 📚 GenAI Concepts Used (7 Marks)
Each concept below is worth **1 mark**:

1. **Zero-shot Prompting**  
   The Mood Analyzer can understand user emotions without examples.  
   Example: *“Extract primary and secondary emotions from this text and return JSON.”*

2. **Dynamic Prompting**  
   Prompts adapt based on user preferences (e.g., excluding horror if requested).  

3. **System & User Prompts**  
   System prompt sets the agent role (*“You are MoodAnalyzer…”*), while the user provides mood input.  

4. **Structured Output**  
   Responses are enforced in JSON for easy parsing by the frontend.  

5. **Temperature**  
   Controls creativity of recommendations (low = safe picks, high = diverse picks).  

6. **Top P (Nucleus Sampling)**  
   Ensures balance between popular and niche movie suggestions.  

7. **Function Calling**  
   AI triggers backend functions like `getMovieDetails()` to fetch TMDB data.  

---

## 🏗️ Architecture
