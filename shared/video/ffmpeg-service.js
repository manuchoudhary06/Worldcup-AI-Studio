const { exec } = require("child_process");

function mergeVideos(outputDir) {
  return new Promise((resolve, reject) => {
    const command = `
      ffmpeg \
      -f concat \
      -safe 0 \
      -i "${outputDir}/clips.txt" \
      -c copy \
      "${outputDir}/merged.mp4"
    `;

    exec(command, (error) => {
      if (error) {
        return reject(error);
      }

      resolve(`${outputDir}/merged.mp4`);
    });
  });
}

module.exports = {
  mergeVideos,
};
