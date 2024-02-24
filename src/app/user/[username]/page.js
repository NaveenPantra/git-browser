"use client";

import React from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useGetUsersQuery } from "@/app/users/index.queries";
import classes from "./style.module.css";
import { useGetUserRepos } from "@/app/user/[username]/index.queries";
import UserCard from "@/components/UserCard";
import RepoCard from "@/components/RepoCard";

const Page = () => {
  const { username } = useParams();
  const { data: { data: users = [] } = {} } = useGetUsersQuery(username);

  const searchParams = useSearchParams();
  const router = useRouter();

  const handleInputChange = React.useCallback(
    (event) => {
      const url = new URL(window.location.href);
      url.searchParams.set(event.target.name, event.target.value);
      router.replace(url.toString());
    },
    [router],
  );

  const { data: repos = [], isLoading } = useGetUserRepos(username, {
    q: searchParams.get("q") || "",
    sort: searchParams.get("sort") || "name",
  });

  return (
    <section className={classes.section}>
      <h2 className={classes.heading}>Repositories of {username}</h2>
      <div className={classes.header}>
        <form className={classes.form}>
          <div>
            <input
              onChange={handleInputChange}
              type="text"
              name={"q"}
              placeholder="Search by name"
              className={classes.input}
              defaultValue={searchParams.get("q") || ""}
            />
          </div>
          <div className={classes.selectContainer}>
            <label htmlFor="sort-by" className={classes.label}>
              Sort by{" "}
            </label>
            <select
              name="sort"
              id="sort-by"
              className={classes.select}
              onChange={handleInputChange}
              defaultValue={searchParams.get("sort") || "name"}
            >
              <option value="name">Name</option>
              <option value="stars">Stars</option>
              <option value="forks">Forks</option>
              <option value="issues-count">Issues Count</option>
            </select>
          </div>
        </form>
        <div className={classes.userCard}>
          <UserCard
            userDetails={users.find(
              (user) =>
                user.login.toLocaleLowerCase() === username.toLocaleLowerCase(),
            )}
          />
        </div>
        <div className={classes.repos}>
          {repos.map((repo) => {
            return <RepoCard repo={repo} key={repo.id} />;
          })}
        </div>
      </div>
    </section>
  );
};

export default Page;
