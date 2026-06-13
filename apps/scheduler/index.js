require("dotenv").config();

const { getFifaMatches } = require("../../shared/football-api");
const { createScript } = require("../script-generator");
const { saveScript, getOutputFile } = require("../../shared/utils/file-writer");
const { sendFile } = require("../../shared/email/email-service");

async function run() {
  console.log(`Fetching matches.......`);

  const matches = await getFifaMatches();

  console.log(`Found ${matches?.response?.items?.length || 0} matches`);

  const upcomingMatches = matches.response.items.filter(
    (match) => match.status_str === "upcoming",
  );

  console.log(`Found ${upcomingMatches.length} upcoming matches`);

  for (const match of upcomingMatches) {
    const script = await createScript({
      home: match.teams.home.fullname,
      away: match.teams.away.fullname,
      venue: match.venue.name,
    });
    saveScript(match, script);
    console.log(
      `Saved script for ${match.teams.home.fullname} vs ${match.teams.away.fullname}`,
    );
  }

  await sendFile(getOutputFile());
  console.log("Email sent successfully");
}

run().catch((error) => {
  console.error("Error:", error.message);
});
