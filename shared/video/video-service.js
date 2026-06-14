const { exec } = require("child_process");
const path = require("path");

function createFinalVideo(outputDir) {
  return new Promise((resolve, reject) => {
    const mergedVideo = path.join(outputDir, "merged.mp4");
    const narration = path.join(outputDir, "audio.mp3");
    const finalVideo = path.join(outputDir, "final-video.mp4");

    const command = `
      ffmpeg -y \
      -i "${mergedVideo}" \
      -i "${narration}" \
      -filter_complex "[0:a]volume=0.4[bg];[1:a]volume=1.5[narr];[bg][narr]amix=inputs=2:duration=shortest[a]" \
      -map 0:v \
      -map "[a]" \
      -c:v copy \
      -c:a aac \
      "${finalVideo}"
    `;

    exec(command, (error, stdout, stderr) => {
      if (error) {
        return reject(error);
      }

      resolve(finalVideo);
    });
  });
}

module.exports = {
  createFinalVideo,
};
