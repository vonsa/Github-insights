/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: UserStats
// ====================================================

export interface UserStats_repositoriesContributedTo {
  __typename: "RepositoryConnection";
  /**
   * Identifies the total count of items in the connection.
   */
  totalCount: number;
}

export interface UserStats_pullRequests {
  __typename: "PullRequestConnection";
  /**
   * Identifies the total count of items in the connection.
   */
  totalCount: number;
}

export interface UserStats_repositoriesStats_nodes {
  __typename: "Repository";
  /**
   * Returns a count of how many stargazers there are on this object
   */
  stargazerCount: number;
}

export interface UserStats_repositoriesStats {
  __typename: "RepositoryConnection";
  /**
   * Identifies the total count of items in the connection.
   */
  totalCount: number;
  /**
   * A list of nodes.
   */
  nodes: (UserStats_repositoriesStats_nodes | null)[] | null;
}

export interface UserStats_followers {
  __typename: "FollowerConnection";
  /**
   * Identifies the total count of items in the connection.
   */
  totalCount: number;
}

export interface UserStats_contributionsCollection {
  __typename: "ContributionsCollection";
  /**
   * How many commits were made by the user in this time span.
   */
  totalCommitContributions: number;
  /**
   * A count of contributions made by the user that the viewer cannot access. Only
   * non-zero when the user has chosen to share their private contribution counts.
   */
  restrictedContributionsCount: number;
}

export interface UserStats_issues {
  __typename: "IssueConnection";
  /**
   * Identifies the total count of items in the connection.
   */
  totalCount: number;
}

export interface UserStats {
  __typename: "User";
  /**
   * A list of repositories that the user recently contributed to.
   */
  repositoriesContributedTo: UserStats_repositoriesContributedTo;
  /**
   * A list of pull requests associated with this user.
   */
  pullRequests: UserStats_pullRequests;
  /**
   * A list of repositories that the user owns.
   */
  repositoriesStats: UserStats_repositoriesStats;
  /**
   * A list of users the given user is followed by.
   */
  followers: UserStats_followers;
  /**
   * The collection of contributions this user has made to different repositories.
   */
  contributionsCollection: UserStats_contributionsCollection;
  /**
   * A list of issues associated with this user.
   */
  issues: UserStats_issues;
}
