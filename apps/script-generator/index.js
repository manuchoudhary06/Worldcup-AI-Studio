const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

async function createScript(match) {
  const prompt = `
    Create a 25-second YouTube Shorts script.

    Match:
    ${match.home} vs ${match.away}

    Venue:
    ${match.venue}

    Format:
    1. Hook
    2. Analysis
    3. Prediction
    4. Call to Action

    Keep it exciting.
    `;

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
  });
  return response.text;
}

module.exports = {
  createScript,
};
