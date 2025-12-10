import express from "express"; 
import cors from "cors";
import dotenv from "dotenv";
import fetch from "node-fetch"; 

dotenv.config(); 

const app = express();
app.use(cors());             
app.use(express.json());

// Başlık önerisi endpoint
app.post("/api/generate-title", async (req, res) => {
  const { text } = req.body;  
 
  const body = {
    model: "mistralai/mistral-nemo", 
    messages: [
      {
        role: "system",
        content: "Deneyimli bir editörsünüz. 20 karakterden kısa bir başlık yaz."
      },
      { role: "user", content: text }
    ]
  };

  try {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {  
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}` 
      },
      body: JSON.stringify(body)
    });

    if (!response.ok) {
      const err = await response.text();
      throw new Error(err);
    }

    const data = await response.json();
    res.json({ result: data.choices[0].message.content }); //çıktı frontende gönderilir.
  } catch (err) {
    console.error("OpenRouter API hatası:", err);
    res.status(500).json({ error: err.message });
  }
});

// Özet çıkarma endpoint
app.post("/api/generate-summary", async (req, res) => {
  const { text } = req.body; 

  const body = {  
    model: "mistralai/mistral-nemo",
    messages: [
      {
        role: "system",
        content: "Deneyimli bir editörsünüz. Aşağıdaki metnin çok kısa ve net bir özetini yaz."
      },
      { role: "user", content: text }
    ]
  };

  try {
    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`
      },
      body: JSON.stringify(body)
    });

    if (!response.ok) {
      const err = await response.text();
      throw new Error(err);
    }

    const data = await response.json();
    res.json({ result: data.choices[0].message.content });
  } catch (err) {
    console.error("OpenRouter API hatası:", err);
    res.status(500).json({ error: err.message });
  }
});

app.listen(5000, () => console.log("⚡️ AI Backend OpenRouter ile çalışıyor: http://localhost:5000"));
//sunucu başlatma