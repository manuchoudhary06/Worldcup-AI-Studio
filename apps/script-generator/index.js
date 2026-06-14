const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

async function createScript(matchesPrompt) {
  const prompt = `
    Generate YouTube Shorts content for the following FIFA World Cup 2026 matches.

    Return ONLY valid JSON.

    For each match return:

    {
      "match": "",
      "title": "",
      "description": "",
      "voiceover": "",
      "thumbnailPrompt": "",
      "scenes": []
    }

    Requirements:

    1. title
    - Catchy YouTube Shorts title
    - Maximum 70 characters

    2. description
    - 2-3 sentence YouTube description
    - Include relevant hashtags

    3. voiceover
    - EXACTLY 50-60 words
    - Never exceed 60 words
    - Optimized for 15-18 second YouTube Shorts
    - Natural and engaging
    - Must contain:
      - Hook
      - Analysis
      - Prediction
      - Call To Action
    - Should sound like a football commentator

    4. thumbnailPrompt
    - Detailed image generation prompt
    - Sports poster style
    - Include both teams
    - Include FIFA World Cup atmosphere
    - Dramatic lighting
    - High detail

    5. scenes
    - Generate exactly 5 scenes
    - Each scene should be 5-8 seconds
    - Suitable for Kling AI
    - Vertical 9:16 format
    - Cinematic sports documentary style
    - Include:
      - subject
      - action
      - environment
      - camera movement
      - lighting

    Scene Structure:

    Scene 1:
    Match introduction

    Scene 2:
    Home team focus

    Scene 3:
    Away team focus

    Scene 4:
    Match action

    Scene 5:
    Prediction and ending

    Return ONLY JSON.

    Matches:

    ${matchesPrompt}
    `;

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: prompt,
    config: {
      responseMimeType: "application/json",
    },
  });

  return response.text;
}

module.exports = {
  createScript,
};
