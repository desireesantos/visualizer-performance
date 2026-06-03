const request = require('supertest');
const express = require('express');
const { getPullRequests } = require('./githubClient');
const app = require('./index'); // Note: We need to export app from index.js

// Mocking the githubClient to avoid real API calls during integration tests
jest.mock('./githubClient');

describe('API Endpoints Integration Tests', () => {
  it('GET /api/prs should return PRs when owner and repo are provided', async () => {
    const mockPRs = [{ number: 1, title: 'Test PR' }];
    getPullRequests.mockResolvedValue(mockPRs);

    const response = await request(app)
      .get('/api/prs')
      .query({ owner: 'test-owner', repo: 'test-repo' });

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockPRs);
  });

  it('GET /api/prs should return 400 if owner or repo is missing', async () => {
    const response = await request(app)
      .get('/api/prs')
      .query({ owner: 'test-owner' });

    expect(response.status).toBe(400);
    expect(response.body.error).toBe('Owner and repo are required query parameters');
  });
});
