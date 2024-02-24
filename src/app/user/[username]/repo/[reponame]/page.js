"use client";

import React from "react";
import { useParams } from "next/navigation";
import classes from "./style.module.css";
import {
  useGetCommitDetails,
  useGetRepoDetails,
} from "@/app/user/[username]/repo/[reponame]/index.queries";
import { getPast12MonthsDates } from "@/utils";

const RepoDetails = () => {
  const params = useParams();
  const { data, isLoading } = useGetRepoDetails(
    params.username,
    params.reponame,
  );

  return (
    <section className={classes.section}>
      <div className={classes.details}>
        <div>
          <h5 className={classes.detailsHeading}>Commit Graph</h5>
          <CommitGraph
            commitsDateCountMap={data?.commitsDateCountMap ?? {}}
            username={params.username}
            reponame={params.reponame}
          />
        </div>
      </div>
      <div className={classes.details}>
        <h5 className={classes.detailsHeading}>Contributors</h5>
        <div className={classes.tableContainer}>
          <table>
            <thead>
              <tr>
                <th>Username</th>
                <th>Commits</th>
              </tr>
            </thead>
            <tbody>
              {data?.contributors?.map?.((contributor) => (
                <tr key={contributor.id}>
                  <td>{contributor.login}</td>
                  <td>{contributor.contributions}</td>
                </tr>
              )) ?? null}
            </tbody>
          </table>
        </div>
      </div>
      <div className={classes.readMeContainer}>
        <h6 className={classes.readMeHeading}>ReadMe</h6>
        <article
          className={classes.readMe}
          dangerouslySetInnerHTML={{ __html: data?.readme ?? "" }}
        ></article>
      </div>
    </section>
  );
};

function CommitGraph({ username, reponame }) {
  const { data: commitsDateCountMap, isLoading } = useGetCommitDetails(
    username,
    reponame,
  );

  const months = React.useMemo(getPast12MonthsDates, []);

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className={classes.commitGraph}>
      {months.map(({ month, year, days }) => {
        return (
          <div key={`${month}-${year}`} className={classes.month}>
            <h5 className={classes.monthName}>
              {month} - {year}
            </h5>
            <div
              className={classes.calendar}
              style={{ "--r": days.length > 35 ? 6 : 5 }}
            >
              {days.map(({ type, strDate, title }, index) => {
                if (type === "dummy-day") return <div />;
                return (
                  <div
                    className={classes.day}
                    key={`${type}-${strDate}-${index}`}
                    title={`${title} - ${commitsDateCountMap[strDate] || 0} commits`}
                    style={{
                      backgroundColor: commitsDateCountMap[strDate]
                        ? "black"
                        : "white",
                    }}
                  />
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default RepoDetails;
