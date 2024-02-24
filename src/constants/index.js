const GITHUB_ACCESS_TOKEN = `Token ${process.env.GITHUB_ACCESS_TOKEN}`;
const PER_PAGE = 50;
const BASE_URL = "https://api.github.com";

const SEARCH_USERS = `${BASE_URL}/search/users`;
const SEARCH_USER_REPOS = `${BASE_URL}/users/{{username}}/repos`;
const README_URL = `${BASE_URL}/repos/{{username}}/{{reponame}}/contents/README.md`;
const CONTRIBUTORS_URL = `${BASE_URL}/repos/{{username}}/{{reponame}}/contributors`;
const COMMITS_URL = `${BASE_URL}/repos/{{username}}/{{reponame}}/commits`;

export {
  GITHUB_ACCESS_TOKEN,
  SEARCH_USERS,
  SEARCH_USER_REPOS,
  README_URL,
  CONTRIBUTORS_URL,
  COMMITS_URL,
};
