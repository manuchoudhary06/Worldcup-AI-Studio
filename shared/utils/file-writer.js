const fs = require("fs");
const path = require("path");

const OUTPUT_DIR = path.join(process.cwd(), "scripts");

const fileName = `scripts-${new Date().toISOString().replace(/[:.]/g, "-")}.txt`;

const OUTPUT_FILE = path.join(OUTPUT_DIR, fileName);

function saveScript(script) {
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, {
      recursive: true,
    });
  }

  fs.writeFileSync(OUTPUT_FILE, script);
}

function getOutputFile() {
  return OUTPUT_FILE;
}

module.exports = {
  saveScript,
  getOutputFile,
};
