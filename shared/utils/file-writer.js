const fs = require("fs");
const path = require("path");

const OUTPUT_DIR = path.join(process.cwd(), "scripts");

const fileName = `scripts-${new Date().toISOString().replace(/[:.]/g, "-")}.txt`;

const OUTPUT_FILE = path.join(OUTPUT_DIR, fileName);

function saveScript(match, script) {
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, {
      recursive: true,
    });
  }

  const content = `
==================================================
MATCH: ${match.teams.home.fullname} vs ${match.teams.away.fullname}
DATE : ${match.datestart}
VENUE: ${match.venue.name}
==================================================

${script}

==================================================
END OF SCRIPT
==================================================

`;

  fs.appendFileSync(OUTPUT_FILE, content, "utf8");
}

function getOutputFile() {
  return OUTPUT_FILE;
}

module.exports = {
  saveScript,
  getOutputFile,
};
