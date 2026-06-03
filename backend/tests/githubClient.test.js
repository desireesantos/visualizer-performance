const nock = require('nock');
const { getPullRequests } = require('./githubClient');

describe('GitHub Client Tests', () => {
  beforeEach(() => {
    nock.cleanAll();
  });

  it('should fetch pull requests successfully', async () => {
    const mockPRs = [
      { number: 1, title: 'Fix bug A', state: 'closed' },
      { number: 2, title: 'Add feature B', state: 'open' }
    ];

    nock('https://api.github.com')
      .get('/repos/test-owner/test-repo/pulls')
      .query({ state: 'all', per_page: 100 })
      .reply(200, mockPRs);

    const prs = await getPullRequests('test-owner', 'test-repo');
    expect(prs).toEqual(mockPRs);
    expect(prs.length).toBe(2);
  });

  it('should throw an error when GitHub API fails', async () => {
    nock('https://api.github.com')
      .get('/repos/test-owner/test-repo/pulls')
      .query({ state: 'all', per_page: 100 })
      .reply(500);

    await expect(getPullRequests('test-owner', 'test-repo')).rejects.toThrow();
  });
});
