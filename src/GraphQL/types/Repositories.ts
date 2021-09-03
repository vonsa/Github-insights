/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: Repositories
// ====================================================

export interface Repositories_repositories_nodes_languages_nodes {
  __typename: "Language";
  /**
   * The name of the current language.
   */
  name: string;
}

export interface Repositories_repositories_nodes_languages {
  __typename: "LanguageConnection";
  /**
   * A list of nodes.
   */
  nodes: (Repositories_repositories_nodes_languages_nodes | null)[] | null;
}

export interface Repositories_repositories_nodes_repositoryTopics_nodes_topic {
  __typename: "Topic";
  /**
   * The topic's name.
   */
  name: string;
}

export interface Repositories_repositories_nodes_repositoryTopics_nodes {
  __typename: "RepositoryTopic";
  /**
   * The topic.
   */
  topic: Repositories_repositories_nodes_repositoryTopics_nodes_topic;
}

export interface Repositories_repositories_nodes_repositoryTopics {
  __typename: "RepositoryTopicConnection";
  /**
   * A list of nodes.
   */
  nodes: (Repositories_repositories_nodes_repositoryTopics_nodes | null)[] | null;
}

export interface Repositories_repositories_nodes {
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
  languages: Repositories_repositories_nodes_languages | null;
  /**
   * A list of applied repository-topic associations for this repository.
   */
  repositoryTopics: Repositories_repositories_nodes_repositoryTopics;
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

export interface Repositories_repositories {
  __typename: "RepositoryConnection";
  /**
   * A list of nodes.
   */
  nodes: (Repositories_repositories_nodes | null)[] | null;
}

export interface Repositories {
  __typename: "User";
  /**
   * A list of repositories that the user owns.
   */
  repositories: Repositories_repositories;
}
