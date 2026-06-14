const mm = require("music-metadata");

async function getAudioDuration(filePath) {
  const metadata = await mm.parseFile(filePath);
  return metadata.format.duration;
}

module.exports = {
  getAudioDuration,
};
