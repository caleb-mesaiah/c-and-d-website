const express = require("express");

const app = express();
const PORT = process.env.PORT || 10000;

const ALLOWED_ORIGIN = "*";

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", ALLOWED_ORIGIN);
  res.header("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.sendStatus(204);
  }

  next();
});

app.use(express.json({ limit: "1mb" }));
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

    // Check for OpenRouter API key
    if (!process.env.OPENROUTER_API_KEY) {
      return res.status(500).json({
        error: "OPENROUTER_API_KEY is not configured"
      });
    }

    // Send request to OpenRouter
    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "HTTP-Referer": "https://cali-ai.onrender.com",
          "X-Title": "Cali AI - C & D Multitech"
        },

        body: JSON.stringify({
          model: "openrouter/free",
          messages: messages,
          temperature: 0.6,
          max_tokens: 550
        })
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.error("OpenRouter error:", data);

      return res.status(response.status).json({
        error: data?.error?.message || "OpenRouter request failed"
      });
    }

    const reply = data?.choices?.[0]?.message?.content;

    if (!reply) {
      console.error("OpenRouter returned no reply:", data);

      return res.status(500).json({
        error: "OpenRouter returned an empty response"
      });
    }

    res.json({
      reply: reply
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
    apiKeyConfigured: !!process.env.OPENROUTER_API_KEY
  });
});

// Start server
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Cali AI running on port ${PORT}`);
});
