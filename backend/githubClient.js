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

async function getPullRequestDetails(owner, repo, pull_number) {
  try {
    const { data } = await octokit.pulls.get({
      owner,
      repo,
      pull_number
    });
    return data;
  } catch (error) {
    console.error(`Error fetching PR #${pull_number} details:`, error);
    throw error;
  }
}

async function getCommitDetails(owner, repo, commit_sha) {
  try {
    const { data } = await octokit.repos.getCommit({
      owner,
      repo,
      ref: commit_sha
    });
    return data;
  } catch (error) {
    console.error(`Error fetching commit ${commit_sha} details:`, error);
    throw error;
  }
}

module.exports = { getPullRequests, getPullRequestDetails, getCommitDetails };
