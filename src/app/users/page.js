"use client";

import React from "react";
import classes from "./style.module.css";
import { useGetUsersQuery } from "@/app/users/index.queries";
import { useSearchParams, useRouter } from "next/navigation";
import { useDebounceValue } from "@/utils/hooks";
import UserCard from "@/components/UserCard";

function UsersPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const username = useDebounceValue(searchParams.get("q") || "", 500);
  const { data: { data: users = [] } = {}, isLoading } =
    useGetUsersQuery(username);

  const handleInputChange = React.useCallback(
    (event) => {
      router.replace(window.location.origin + "/users?q=" + event.target.value);
    },
    [router],
  );

  return (
    <main className={classes.main}>
      <form className={classes.form}>
        <input
          type="text"
          defaultValue={searchParams.get("q") || ""}
          onChange={handleInputChange}
          placeholder={"Search with username"}
          className={classes.input}
        />
      </form>
      <section className={classes.users}>
        {users?.map?.((userDetails) => (
          <UserCard key={userDetails.id} userDetails={userDetails} />
        )) ?? null}
      </section>
    </main>
  );
}

export default UsersPage;
