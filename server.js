const express = require("express");

const app = express();
const PORT = process.env.PORT || 10000;

// Allow the website to communicate with the Cali AI backend
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.sendStatus(204);
  }

  next();
});

app.use(express.json({ limit: "1mb" }));

app.use(express.static(__dirname));

app.post("/api/chat", async (req, res) => {
  try {
    const { messages } = req.body;

    if (!Array.isArray(messages)) {
      return res.status(400).json({
        error: "Invalid messages"
      });
    }

    const apiKey = process.env.OPENROUTER_API_KEY;

    if (!apiKey) {
      console.error("OPENROUTER_API_KEY is missing");

      return res.status(500).json({
        error: "OPENROUTER_API_KEY is not configured"
      });
    }

    console.log(
      "OpenRouter key loaded:",
      apiKey.substring(0, 10) + "..."
    );

    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",

        headers: {
          "Authorization": "Bearer " + apiKey,
          "Content-Type": "application/json",
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
      console.error("No reply from OpenRouter:", data);

      return res.status(500).json({
        error: "OpenRouter returned no response"
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

app.get("/api/health", (req, res) => {
  const apiKey = process.env.OPENROUTER_API_KEY;

  res.json({
    status: "ok",
    apiKeyConfigured: !!apiKey,
    keyPrefix: apiKey ? apiKey.substring(0, 10) : null
  });
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Cali AI running on port ${PORT}`);
});
