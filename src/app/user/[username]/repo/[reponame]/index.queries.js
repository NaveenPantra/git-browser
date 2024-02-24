import React from "react";
import { useQuery } from "@tanstack/react-query";
import markdownit from "markdown-it";
import { API_BASE_URL } from "@/constants/client.constants";

async function fetchRepoDetails({ queryKey }) {
  const response = await fetch(
    `${API_BASE_URL}user/${queryKey[2]}/repo/${queryKey[3]}`,
    {
      method: "GET",
    },
  );
  return await response.json();
}

const useGetRepoDetails = (username, reponame) => {
  const transformData = React.useCallback((data) => {
    const md = markdownit({
      html: true,
      xhtmlOut: true,
      breaks: true,
      langPrefix: "language-",
      linkify: true,
      typographer: true,
      image: true,
    }).enable(["image"]);
    const readme = md.render(
      atob(data.readme.content ?? "") || "No Readme Found",
    );
    const commitsDateCountMap = {};
    data.commits.forEach((commitData) => {
      const date = new Date(commitData.commit.committer.date);
      const formattedDate = date.toISOString().split("T")[0];
      if (!commitsDateCountMap[formattedDate])
        commitsDateCountMap[formattedDate] = 0;
      commitsDateCountMap[formattedDate] += 1;
    });
    return {
      ...data,
      readme,
      commitsDateCountMap,
    };
  }, []);

  return useQuery({
    queryKey: ["repos", "details", username, reponame],
    queryFn: fetchRepoDetails,
    select: transformData,
  });
};

const fetchCommits = async ({ queryKey }) => {
  const response = await fetch(
    `${API_BASE_URL}user/${queryKey[2]}/repo/${queryKey[3]}/commits`,
    {
      method: "GET",
    },
  );
  return await response.json();
};

const useGetCommitDetails = (username, reponame) => {
  return useQuery({
    queryKey: ["repos", "commits", username, reponame],
    queryFn: fetchCommits,
  });
};

export { useGetRepoDetails, useGetCommitDetails };
