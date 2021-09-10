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

export interface User_user_repositoriesStats_nodes {
  __typename: "Repository";
  /**
   * Returns a count of how many stargazers there are on this object
   */
  stargazerCount: number;
}

export interface User_user_repositoriesStats {
  __typename: "RepositoryConnection";
  /**
   * Identifies the total count of items in the connection.
   */
  totalCount: number;
  /**
   * A list of nodes.
   */
  nodes: (User_user_repositoriesStats_nodes | null)[] | null;
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

export interface User_user_repositories_nodes_languages_nodes {
  __typename: "Language";
  /**
   * The name of the current language.
   */
  name: string;
}

export interface User_user_repositories_nodes_languages {
  __typename: "LanguageConnection";
  /**
   * A list of nodes.
   */
  nodes: (User_user_repositories_nodes_languages_nodes | null)[] | null;
}

export interface User_user_repositories_nodes_repositoryTopics_nodes_topic {
  __typename: "Topic";
  /**
   * The topic's name.
   */
  name: string;
}

export interface User_user_repositories_nodes_repositoryTopics_nodes {
  __typename: "RepositoryTopic";
  /**
   * The topic.
   */
  topic: User_user_repositories_nodes_repositoryTopics_nodes_topic;
}

export interface User_user_repositories_nodes_repositoryTopics {
  __typename: "RepositoryTopicConnection";
  /**
   * A list of nodes.
   */
  nodes: (User_user_repositories_nodes_repositoryTopics_nodes | null)[] | null;
}

export interface User_user_repositories_nodes {
  __typename: "Repository";
  /**
   * The name of the repository.
   */
  name: string;
  /**
   * Returns a count of how many stargazers there are on this object
   */
  stargazerCount: number;
  /**
   * A list containing a breakdown of the language composition of the repository.
   */
  languages: User_user_repositories_nodes_languages | null;
  /**
   * A list of applied repository-topic associations for this repository.
   */
  repositoryTopics: User_user_repositories_nodes_repositoryTopics;
  /**
   * Identifies the date and time when the object was created.
   */
  createdAt: any;
  /**
   * Identifies the date and time when the object was last updated.
   */
  updatedAt: any;
  /**
   * Identifies when the repository was last pushed to.
   */
  pushedAt: any | null;
  /**
   * Identifies if the repository is a fork.
   */
  isFork: boolean;
  /**
   * The HTTP URL for this repository
   */
  url: any;
}

export interface User_user_repositories {
  __typename: "RepositoryConnection";
  /**
   * A list of nodes.
   */
  nodes: (User_user_repositories_nodes | null)[] | null;
}

export interface User_user_starredRepositories_nodes_languages_nodes {
  __typename: "Language";
  /**
   * The name of the current language.
   */
  name: string;
}

export interface User_user_starredRepositories_nodes_languages {
  __typename: "LanguageConnection";
  /**
   * A list of nodes.
   */
  nodes: (User_user_starredRepositories_nodes_languages_nodes | null)[] | null;
}

export interface User_user_starredRepositories_nodes_repositoryTopics_nodes_topic {
  __typename: "Topic";
  /**
   * The topic's name.
   */
  name: string;
}

export interface User_user_starredRepositories_nodes_repositoryTopics_nodes {
  __typename: "RepositoryTopic";
  /**
   * The topic.
   */
  topic: User_user_starredRepositories_nodes_repositoryTopics_nodes_topic;
}

export interface User_user_starredRepositories_nodes_repositoryTopics {
  __typename: "RepositoryTopicConnection";
  /**
   * A list of nodes.
   */
  nodes: (User_user_starredRepositories_nodes_repositoryTopics_nodes | null)[] | null;
}

export interface User_user_starredRepositories_nodes {
  __typename: "Repository";
  /**
   * The name of the repository.
   */
  name: string;
  /**
   * Returns a count of how many stargazers there are on this object
   */
  stargazerCount: number;
  /**
   * A list containing a breakdown of the language composition of the repository.
   */
  languages: User_user_starredRepositories_nodes_languages | null;
  /**
   * A list of applied repository-topic associations for this repository.
   */
  repositoryTopics: User_user_starredRepositories_nodes_repositoryTopics;
}

export interface User_user_starredRepositories {
  __typename: "StarredRepositoryConnection";
  /**
   * A list of nodes.
   */
  nodes: (User_user_starredRepositories_nodes | null)[] | null;
}

export interface User_user {
  __typename: "User";
  /**
   * The username used to login.
   */
  login: string;
  /**
   * The user's public profile name.
   */
  name: string | null;
  /**
   * Identifies the date and time when the object was created.
   */
  createdAt: any;
  /**
   * A URL pointing to the user's public avatar.
   */
  avatarUrl: any;
  /**
   * The user's public profile company.
   */
  company: string | null;
  /**
   * A URL pointing to the user's public website/blog.
   */
  websiteUrl: any | null;
  /**
   * The HTTP URL for this user
   */
  url: any;
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
  repositoriesStats: User_user_repositoriesStats;
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
  /**
   * A list of repositories that the user owns.
   */
  repositories: User_user_repositories;
  /**
   * Repositories the user has starred.
   */
  starredRepositories: User_user_starredRepositories;
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
  stats?: boolean | null;
  repositories?: boolean | null;
  starredRepositories?: boolean | null;
}
