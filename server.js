const express = require("express");

const app = express();
const PORT = process.env.PORT || 10000;

app.use(express.json({ limit: "1mb" }));

// Serve your website (index.html)
app.use(express.static(__dirname));

// Cali AI API endpoint
app.post("/api/chat", async (req, res) => {
  try {
    const { messages } = req.body;

    if (!Array.isArray(messages)) {
      return res.status(400).json({
        error: "Invalid messages"
      });
    }

    if (!process.env.OPENAI_API_KEY) {
      return res.status(500).json({
        error: "OPENAI_API_KEY is not configured"
      });
    }

    const response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-5.6-luna",
        input: messages
      })
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("OpenAI error:", data);

      return res.status(response.status).json({
        error: "OpenAI request failed"
      });
    }

    res.json({
      reply: data.output_text || "Sorry, I couldn't generate a response."
    });

  } catch (error) {
    console.error("Server error:", error);

    res.status(500).json({
      error: "Something went wrong"
    });
  }
});

// Health check
app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    apiKeyConfigured: !!process.env.OPENAI_API_KEY
  });
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Cali AI running on port ${PORT}`);
});