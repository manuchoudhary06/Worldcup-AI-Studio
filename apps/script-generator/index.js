const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

async function createScript(matchesPrompt) {
  const prompt = `
    Generate YouTube Shorts scripts for the following matches.
    Format exactly like:

    ==================================================
    MATCH: Brazil vs Morocco
    ==================================================

    script

    ==================================================

    And the script have the below format:
    1. Hook
    2. Analysis
    3. Prediction
    4. Call to Action

    Matches:
    ${matchesPrompt}
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
