/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: User
// ====================================================

export interface User_user_repositoriesContributedTo {
  __typename: "RepositoryConnection";
  /**
   * Identifies the total count of items in the connection.
   */
  totalCount: number;
}

export interface User_user_pullRequests {
  __typename: "PullRequestConnection";
  /**
   * Identifies the total count of items in the connection.
   */
  totalCount: number;
}

export interface User_user_repositories_nodes {
  __typename: "Repository";
  /**
   * Returns a count of how many stargazers there are on this object
   */
  stargazerCount: number;
}

export interface User_user_repositories {
  __typename: "RepositoryConnection";
  /**
   * Identifies the total count of items in the connection.
   */
  totalCount: number;
  /**
   * A list of nodes.
   */
  nodes: (User_user_repositories_nodes | null)[] | null;
}

export interface User_user_followers {
  __typename: "FollowerConnection";
  /**
   * Identifies the total count of items in the connection.
   */
  totalCount: number;
}

export interface User_user_contributionsCollection {
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

export interface User_user_issues {
  __typename: "IssueConnection";
  /**
   * Identifies the total count of items in the connection.
   */
  totalCount: number;
}

export interface User_user {
  __typename: "User";
  /**
   * A list of repositories that the user recently contributed to.
   */
  repositoriesContributedTo: User_user_repositoriesContributedTo;
  /**
   * A list of pull requests associated with this user.
   */
  pullRequests: User_user_pullRequests;
  /**
   * A list of repositories that the user owns.
   */
  repositories: User_user_repositories;
  /**
   * A list of users the given user is followed by.
   */
  followers: User_user_followers;
  /**
   * The collection of contributions this user has made to different repositories.
   */
  contributionsCollection: User_user_contributionsCollection;
  /**
   * A list of issues associated with this user.
   */
  issues: User_user_issues;
}

export interface User {
  /**
   * Lookup a user by login.
   */
  user: User_user | null;
}

export interface UserVariables {
  user: string;
  info?: boolean | null;
}
