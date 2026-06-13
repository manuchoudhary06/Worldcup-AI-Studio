const axios = require("axios");

async function getFifaMatches() {
  try {
    // 1382 competitionId for FIFA 2026
    const response = await axios.get(
      "https://api-football186.p.rapidapi.com/competition/1382/matches",
      {
        headers: {
          "X-RapidAPI-Key": process.env.FOOTBALL_API_KEY,
          "X-RapidAPI-Host": "api-football186.p.rapidapi.com",
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error("API Error:", error.response?.data || error.message);
    throw error;
  }
}

module.exports = {
  getFifaMatches,
};
