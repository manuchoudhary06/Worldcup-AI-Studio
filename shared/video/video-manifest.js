const fs = require("fs");
const path = require("path");

function generateVideoManifest(outputDir) {
  const normalizedDir = path.join(outputDir, "normalized");

  const files = fs
    .readdirSync(normalizedDir)
    .filter((file) => file.endsWith(".mp4"))
    .sort();

  const content = files.map((file) => `file 'normalized/${file}'`).join("\n");

  const manifestPath = path.join(outputDir, "clips.txt");

  fs.writeFileSync(manifestPath, content, "utf8");

  return manifestPath;
}

module.exports = {
  generateVideoManifest,
};
