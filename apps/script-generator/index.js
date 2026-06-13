const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

async function createScript(matchesPrompt) {
  const prompt = `
    Generate YouTube Shorts content for the following FIFA World Cup matches.
    
    Return ONLY valid JSON.

    For each match generate:
    1. match
    2. script
    3. scenes

    Requirements:
    - script should be 15-20 seconds long
    - script should contain:
    - Hook
    - Analysis
    - Prediction
    - Call To Action

    - scenes should contain 4 cinematic AI video prompts suitable for Kling AI
    - each scene should be detailed and cinematic
    - scenes should be optimized for vertical 9:16 videos
    - scenes should describe camera movement, lighting, atmosphere and action

    Refer the below Sample Output format:
    [
        {
            "match": "Brazil vs Morocco",
            "script": {
            "hook": "...",
            "analysis": "...",
            "prediction": "...",
            "cta": "..."
            },
            "scenes": [
            "Brazil football players entering MetLife Stadium, walking toward the pitch, crowd chanting, cinematic sports documentary, dramatic lighting, camera tracking shot, vertical 9:16",
            "Morocco supporters waving flags, stadium atmosphere, slow motion, dramatic sunset lighting, cinematic sports documentary, vertical 9:16",
            "World Cup trophy illuminated under stadium lights, cinematic close-up, shallow depth of field, dramatic sports photography, vertical 9:16",
            "Brazil attacking near the penalty area, intense football action, dynamic camera movement, broadcast style, vertical 9:16",
            "Prediction graphic Brazil 2-1 Morocco, crowd cheering, cinematic ending, dramatic lighting, vertical 9:16"
            ]
        }
    ]

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
