const { exec } = require("child_process");
const fs = require("fs");
const path = require("path");

function normalizeVideos(outputDir) {
  return new Promise((resolve, reject) => {
    const scenesDir = path.join(outputDir, "scenes");
    const normalizedDir = path.join(outputDir, "normalized");

    fs.mkdirSync(normalizedDir, {
      recursive: true,
    });

    const files = fs
      .readdirSync(scenesDir)
      .filter((file) => file.endsWith(".mp4"))
      .sort();

    if (files.length === 0) {
      return resolve([]);
    }

    const commands = files.map((file) => {
      const input = path.join(scenesDir, file);
      const output = path.join(normalizedDir, file);

      return new Promise((res, rej) => {
        const cmd = `
          ffmpeg -y \
          -i "${input}" \
          -vf "scale=1080:1920,fps=24" \
          -c:v libx264 \
          -preset fast \
          -c:a aac \
          -ar 44100 \
          "${output}"
        `;

        exec(cmd, (error) => {
          if (error) {
            return rej(error);
          }

          res(output);
        });
      });
    });

    Promise.all(commands).then(resolve).catch(reject);
  });
}

module.exports = {
  normalizeVideos,
};
