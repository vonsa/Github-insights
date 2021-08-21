/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: StarredRepositories
// ====================================================

export interface StarredRepositories_starredRepositories_nodes_languages_nodes {
  __typename: "Language";
  /**
   * The name of the current language.
   */
  name: string;
}

export interface StarredRepositories_starredRepositories_nodes_languages {
  __typename: "LanguageConnection";
  /**
   * A list of nodes.
   */
  nodes: (StarredRepositories_starredRepositories_nodes_languages_nodes | null)[] | null;
}

export interface StarredRepositories_starredRepositories_nodes_repositoryTopics_nodes_topic {
  __typename: "Topic";
  /**
   * The topic's name.
   */
  name: string;
}

export interface StarredRepositories_starredRepositories_nodes_repositoryTopics_nodes {
  __typename: "RepositoryTopic";
  /**
   * The topic.
   */
  topic: StarredRepositories_starredRepositories_nodes_repositoryTopics_nodes_topic;
}

export interface StarredRepositories_starredRepositories_nodes_repositoryTopics {
  __typename: "RepositoryTopicConnection";
  /**
   * A list of nodes.
   */
  nodes: (StarredRepositories_starredRepositories_nodes_repositoryTopics_nodes | null)[] | null;
}

export interface StarredRepositories_starredRepositories_nodes {
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
  languages: StarredRepositories_starredRepositories_nodes_languages | null;
  /**
   * A list of applied repository-topic associations for this repository.
   */
  repositoryTopics: StarredRepositories_starredRepositories_nodes_repositoryTopics;
}

export interface StarredRepositories_starredRepositories {
  __typename: "StarredRepositoryConnection";
  /**
   * A list of nodes.
   */
  nodes: (StarredRepositories_starredRepositories_nodes | null)[] | null;
}

export interface StarredRepositories {
  __typename: "User";
  /**
   * Repositories the user has starred.
   */
  starredRepositories: StarredRepositories_starredRepositories;
}
