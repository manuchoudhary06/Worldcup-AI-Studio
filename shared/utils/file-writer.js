const fs = require("fs");
const path = require("path");

const OUTPUT_DIR = path.join(process.cwd(), "scripts");

const fileName = `scripts-${new Date().toISOString().replace(/[:.]/g, "-")}.json`;

const OUTPUT_FILE = path.join(OUTPUT_DIR, fileName);

function saveScript(content) {
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, {
      recursive: true,
    });
  }

  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(content, null, 2));
}

function getOutputFile() {
  return OUTPUT_FILE;
}

module.exports = {
  saveScript,
  getOutputFile,
};
