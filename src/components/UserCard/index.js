"use client";

import React from "react";
import Link from "next/link";
import classes from "./style.module.css";

const UserCard = ({ userDetails }) => {
  if (!userDetails) return null;

  return (
    <div className={classes.card}>
      <Link href={`user/${userDetails.login}`} className={classes.link}>
        <figure className={classes.figure}>
          <img
            src={userDetails.avatar_url}
            alt={userDetails.login}
            className={classes.img}
          />
          <figcaption className={classes.figcaption}>
            <h3 className={classes.username}>{userDetails.login}</h3>
            <p>{userDetails.html_url}</p>
          </figcaption>
        </figure>
      </Link>
    </div>
  );
};

export default UserCard;
