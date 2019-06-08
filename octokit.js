const Octokit = require("@octokit/rest");

const { parsed: config } = require("dotenv").config();
if (!config || !config.GH_API_TOKEN) {
  throw new Error("No GitHub API token provided!");
}

module.exports = new Octokit({
  auth: config.GH_API_TOKEN,
  userAgent: "octotests"
});
