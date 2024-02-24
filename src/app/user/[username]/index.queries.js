"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";

import { API_BASE_URL } from "@/constants/client.constants";

async function fetchUserRepos({ queryKey, signal }) {
  const response = await fetch(`${API_BASE_URL}user/${queryKey[2]}/repos`, {
    method: "GET",
    signal,
  });
  return response.json();
}

const useGetUserRepos = (username, filters) => {
  const { data, isLoading } = useQuery({
    queryKey: ["users", "repos", username],
    enabled: !!username.length,
    queryFn: fetchUserRepos,
  });

  const filteredData = React.useMemo(() => {
    let filteredRepos = data?.data ?? [];
    if (filters.q) {
      filteredRepos = filteredRepos?.filter((repo) =>
        repo.name.toLowerCase().includes(filters.q.toLowerCase()),
      );
    }
    if (filters.sort) {
      filteredRepos = filteredRepos?.sort((a, b) => {
        if (filters.sort === "stars") {
          return b.stargazers_count - a.stargazers_count;
        }
        if (filters.sort === "forks") {
          return b.forks_count - a.forks_count;
        }
        if (filters.sort === "issues-count") {
          return b.open_issues_count - a.open_issues_count;
        }
        return a.name.localeCompare(b.name);
      });
    }
    return filteredRepos;
  }, [data, filters]);

  return { data: filteredData, isLoading };
};

export { useGetUserRepos };
