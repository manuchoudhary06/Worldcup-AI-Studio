const { MsEdgeTTS } = require("msedge-tts");

async function generateVoiceover(text, outputDir) {
  const tts = new MsEdgeTTS();
  await tts.setMetadata("en-US-GuyNeural", "audio-24khz-48kbitrate-mono-mp3");
  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      return await tts.toFile(outputDir, text);
    } catch (err) {
      console.log(`TTS attempt ${attempt} failed`, err);
      if (attempt === 3) {
        throw err;
      }
      await new Promise((resolve) => setTimeout(resolve, 3000));
    }
  }
}

module.exports = {
  generateVoiceover,
};
