const fs = require("fs");
const path = require("path");

function generateKlingPrompts(content, outputDir) {
  if (!content.scenes || !Array.isArray(content.scenes)) {
    throw new Error("No scenes found in content");
  }

  const promptContent = content.scenes
    .map(
      (scene, index) => `
        SCENE ${index + 1}

        ${scene.subject},
        ${scene.action},
        ${scene.environment},
        ${scene.camera_movement},
        ${scene.lighting},
        ultra realistic,
        cinematic sports documentary,
        FIFA World Cup 2026 atmosphere,
        professional broadcast quality,
        vertical 9:16
        `,
    )
    .join("\n\n----------------------------------------\n\n");

  const filePath = path.join(outputDir, "kling-prompts.txt");
  fs.writeFileSync(filePath, promptContent, "utf8");
  return filePath;
}

module.exports = {
  generateKlingPrompts,
};
