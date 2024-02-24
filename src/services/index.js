import {
  GITHUB_ACCESS_TOKEN,
  SEARCH_USERS,
  SEARCH_USER_REPOS,
  README_URL,
  CONTRIBUTORS_URL,
  COMMITS_URL,
} from "@/constants";
import { generateUrlWithSearchParams } from "@/services/helpers";

async function searchUsers({ username = "" }) {
  const url = generateUrlWithSearchParams(SEARCH_USERS, { q: username });
  url.searchParams.set("per_page", 100);
  const response = await fetch(url, {
    headers: {
      Authorization: GITHUB_ACCESS_TOKEN,
    },
  });

  return await response.json();
}

async function getRepos(username) {
  const url = generateUrlWithSearchParams(
    SEARCH_USER_REPOS.replace("{{username}}", username),
    {},
  );
  url.searchParams.set("per_page", "100");
  const response = await fetch(url, {
    headers: {
      Authorization: GITHUB_ACCESS_TOKEN,
    },
  });
  return await response.json();
}

async function getRepoDetails(username, reponame) {
  const readMeUrl = generateUrlWithSearchParams(
    README_URL.replace("{{username}}", username).replace(
      "{{reponame}}",
      reponame,
    ),
  );
  const contributorsUURL = generateUrlWithSearchParams(
    CONTRIBUTORS_URL.replace("{{username}}", username).replace(
      "{{reponame}}",
      reponame,
    ),
    {
      per_page: 50,
    },
  );

  const since = new Date();
  since.setFullYear(since.getFullYear() - 1);
  const until = new Date();
  const commitsHistory = generateUrlWithSearchParams(
    COMMITS_URL.replace("{{username}}", username).replace(
      "{{reponame}}",
      reponame,
    ),
    {
      since: since.toISOString(),
      until: until.toISOString(),
      per_page: 1000,
    },
  );

  const headers = {
    Authorization: GITHUB_ACCESS_TOKEN,
  };
  const [readMeResponse, contributorsResponse, commitsResponse] =
    await Promise.all([
      fetch(readMeUrl, { headers }),
      fetch(contributorsUURL, { headers }),
      fetch(commitsHistory, { headers }),
    ]);
  return await Promise.all([
    readMeResponse.json(),
    contributorsResponse.json(),
    commitsResponse.json(),
  ]);
}

async function fetchCommits(url, page) {
  const commitUrl = new URL(url.toString());
  commitUrl.searchParams.set("page", page);
  const headers = {
    Authorization: GITHUB_ACCESS_TOKEN,
  };
  const response = await fetch(commitUrl, { headers, method: "GET" });
  return await response.json();
}
async function getRepoCommits(username, reponame) {
  const since = new Date();
  since.setFullYear(since.getFullYear() - 1);
  const until = new Date();
  const commitsHistory = generateUrlWithSearchParams(
    COMMITS_URL.replace("{{username}}", username).replace(
      "{{reponame}}",
      reponame,
    ),
    {
      since: since.toISOString(),
      until: until.toISOString(),
      per_page: 100,
    },
  );

  const commits = await new Promise(async (resolve) => {
    let page = 1;
    let commits = [];
    while (true) {
      try {
        let newCommits = await Promise.all([
          fetchCommits(commitsHistory, page++),
          fetchCommits(commitsHistory, page++),
          fetchCommits(commitsHistory, page++),
        ]);
        newCommits = [].concat(...newCommits);
        commits = commits.concat(...newCommits);

        if (newCommits.length < 300) {
          resolve(commits);
          break;
        }
      } catch (err) {
        resolve(commits);
      }
    }
  });

  const commitsDateCountMap = {};
  commits.forEach((commitData) => {
    const date = new Date(commitData.commit.committer.date);
    const formattedDate = date.toISOString().split("T")[0];
    if (!commitsDateCountMap[formattedDate])
      commitsDateCountMap[formattedDate] = 0;
    commitsDateCountMap[formattedDate] += 1;
  });
  return commitsDateCountMap;
}

export { getRepos, searchUsers, getRepoDetails, getRepoCommits };
