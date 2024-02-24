"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";

import { API_BASE_URL } from "@/constants/client.constants";

async function fetchUsers({ queryKey, signal }) {
  const response = await fetch(`${API_BASE_URL}users?username=${queryKey[1]}`, {
    method: "GET",
    signal,
  });
  return response.json();
}

const useGetUsersQuery = (username) => {
  return useQuery({
    queryKey: ["users", username],
    enabled: !!username.length,
    queryFn: fetchUsers,
  });
};

export { useGetUsersQuery };
