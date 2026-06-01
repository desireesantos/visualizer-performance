const { Octokit } = require("@octokit/rest");
require('dotenv').config();

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN
});

async function getPullRequests(owner, repo) {
  try {
    const { data } = await octokit.pulls.list({
      owner,
      repo,
      state: 'all', // 'open', 'closed', 'all'
      per_page: 100
    });
    return data;
  } catch (error) {
    console.error('Error fetching PRs from GitHub:', error);
    throw error;
  }
}

module.exports = { getPullRequests };
