"use client";

import React from "react";
import classes from "./index.module.css";
import Link from "next/link";

const RepoCard = ({ repo }) => {
  if (!repo) return null;

  return (
    <div className={classes.card}>
      <Link
        href={`/user/${repo.owner.login}/repo/${repo.name}`}
        className={classes.link}
      >
        <h3 className={classes.heading}>{repo.name}</h3>
        <article className={classes.description}>{repo.description}</article>
        <Link href={""} className={classes.homepage}>
          {repo.homepage}
        </Link>
        <div className={classes.stats}>
          <p className={classes.stat}>Stars: {repo.stargazers_count}</p>
          <p className={classes.stat}>Watchers: {repo.watchers_count}</p>
          <p className={classes.stat}>Forks: {repo.forks_count}</p>
          <p className={classes.stat}>Issues: {repo.open_issues_count}</p>
        </div>
      </Link>
    </div>
  );
};

export default RepoCard;
