const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { getPullRequests, getPullRequestDetails, getCommitDetails } = require('./githubClient');

const app = express();
// ...existing code...
app.get('/api/prs', async (req, res) => {
// ...existing code...
  }
});

app.get('/api/pr/:number', async (req, res) => {
  const { owner, repo } = req.query;
  const { number } = req.params;

  if (!owner || !repo) {
    return res.status(400).json({ error: 'Owner and repo are required query parameters' });
  }

  try {
    const pr = await getPullRequestDetails(owner, repo, number);
    res.json(pr);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch PR details' });
  }
});

app.get('/api/commit/:sha', async (req, res) => {
  const { owner, repo } = req.query;
  const { sha } = req.params;

  if (!owner || !repo) {
    return res.status(400).json({ error: 'Owner and repo are required query parameters' });
  }

  try {
    const commit = await getCommitDetails(owner, repo, sha);
    res.json(commit);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch commit details' });
  }
});

app.listen(PORT, () => {
// ...existing code...

