require("dotenv").config();

const { getFifaMatches } = require("../../shared/football-api");
const { createScript } = require("../script-generator");
const { saveScript, getOutputFile } = require("../../shared/utils/file-writer");
const { sendFile } = require("../../shared/email/email-service");

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
  saveScript(response);

  await sendFile(getOutputFile());
  console.log("Email sent successfully");
}

run().catch((error) => {
  console.error("Error:", error.message);
});
