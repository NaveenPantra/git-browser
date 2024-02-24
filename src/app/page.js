"use client";

import React from "react";
import Link from "next/link";
import classes from "./style.module.css";

export default function Home() {
  return (
    <main className={classes.main}>
      <div>
        <h1>GITHUB BROWSER</h1>
        <p>
          To get started visit <Link href={"/users"}>Browse users</Link>
        </p>
      </div>
    </main>
  );
}
