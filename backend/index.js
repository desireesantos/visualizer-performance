const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { getPullRequests } = require('./githubClient');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get('/api/prs', async (req, res) => {
  const { owner, repo } = req.query;

  if (!owner || !repo) {
    return res.status(400).json({ error: 'Owner and repo are required query parameters' });
  }

  try {
    const prs = await getPullRequests(owner, repo);
    res.json(prs);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch PRs from GitHub' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
