require("dotenv").config();

const fs = require("fs");
const path = require("path");

const { getFifaMatches } = require("../../shared/football-api");
const { createScript } = require("../script-generator");
const { saveScript, getOutputFile } = require("../../shared/utils/file-writer");
const { sendFile } = require("../../shared/email/email-service");
const { generateVoiceover } = require("../../shared/tts");
const { getAudioDuration } = require("../../shared/tts/audio-utils");
const { generateKlingPrompts } = require("../../shared/video/kling-prompts");
const { generateVideoManifest } = require("../../shared/video/video-manifest");
const { mergeVideos } = require("../../shared/video/ffmpeg-service.js");
const { createFinalVideo } = require("../../shared/video/video-service");
const { normalizeVideos } = require("../../shared/video/video-normalizer");

const featuredTeams = [
  "Brazil",
  "Argentina",
  "France",
  "England",
  "Germany",
  "Spain",
  "Netherlands",
  "Japan",
  "Portugal",
];

async function run() {
  console.log(`Fetching matches.......`);

  const matches = await getFifaMatches();

  console.log(`Found ${matches?.response?.items?.length || 0} matches`);

  const upcomingMatches = matches.response.items.filter(
    (match) =>
      match.status_str === "upcoming" &&
      (featuredTeams.includes(match.teams.home.fullname) ||
        featuredTeams.includes(match.teams.away.fullname)),
  );

  if (upcomingMatches.length === 0) {
    return;
  }

  console.log(`Found ${upcomingMatches.length} upcoming matches`);

  const matchesPrompt = upcomingMatches
    .map(
      (match, index) => `
              ${index + 1}.
              Home: ${match.teams.home.fullname}
              Away: ${match.teams.away.fullname}
              Venue: ${match.venue.name}
              `,
    )
    .join("\n");

  const response = await createScript(matchesPrompt);
  const contents = JSON.parse(response);

  // saveScript(contents);

  for (const content of contents) {
    try {
      console.log(`Processing match: ${content.match}`);

      const slug = createSlug(content.match);
      const outputDir = path.join(process.cwd(), "output", slug);

      fs.mkdirSync(outputDir, {
        recursive: true,
      });

      const scenesDir = path.join(outputDir, "scenes");

      fs.mkdirSync(scenesDir, {
        recursive: true,
      });

      fs.writeFileSync(
        path.join(outputDir, "content.json"),
        JSON.stringify(content, null, 2),
      );

      const klingPromptFile = generateKlingPrompts(content, outputDir);

      console.log(`Kling prompts saved: ${klingPromptFile}`);

      // Generate narration
      const cleanText = content.voiceover
        .replace(/[^\x20-\x7E\n]/g, " ")
        .trim();

      const { audioFilePath } = await generateVoiceover(cleanText, outputDir);
      const duration = await getAudioDuration(audioFilePath);
      console.log(`${content.match}: ${duration}s`);

      fs.writeFileSync(
        path.join(outputDir, "metadata.json"),
        JSON.stringify(
          {
            match: content.match,
            generatedAt: new Date().toISOString(),
            voiceoverDuration: duration,
          },
          null,
          2,
        ),
      );

      // Process video clips if present
      const sceneFiles = fs
        .readdirSync(scenesDir)
        .filter((file) => file.endsWith(".mp4"));

      if (sceneFiles.length > 0) {
        console.log(`Normalizing ${sceneFiles.length} clips`);

        await normalizeVideos(outputDir);

        const manifestFile = generateVideoManifest(outputDir);
        console.log(`Manifest created: ${manifestFile}`);

        const mergedVideo = await mergeVideos(outputDir);
        console.log(`Merged video: ${mergedVideo}`);

        const finalVideo = await createFinalVideo(outputDir);
        console.log(`Final video: ${finalVideo}`);
      } else {
        console.log(
          `No scene videos found for ${content.match}. Skipping video generation.`,
        );
      }

      await new Promise((resolve) => setTimeout(resolve, 2000));
    } catch (err) {
      console.error(`Failed processing ${content.match}`, err);
    }
  }
}

function createSlug(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

run().catch((error) => {
  console.error("Error:", error.message);
});
