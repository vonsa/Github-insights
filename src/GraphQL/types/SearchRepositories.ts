/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: SearchRepositories
// ====================================================

export interface SearchRepositories_search_edges_node_App {
  __typename: "App" | "Discussion" | "Issue" | "MarketplaceListing" | "Organization" | "PullRequest" | "User";
}

export interface SearchRepositories_search_edges_node_Repository {
  __typename: "Repository";
  /**
   * Returns a count of how many stargazers there are on this object
   */
  stargazerCount: number;
  /**
   * The name of the repository.
   */
  name: string;
}

export type SearchRepositories_search_edges_node = SearchRepositories_search_edges_node_App | SearchRepositories_search_edges_node_Repository;

export interface SearchRepositories_search_edges {
  __typename: "SearchResultItemEdge";
  /**
   * The item at the end of the edge.
   */
  node: SearchRepositories_search_edges_node | null;
}

export interface SearchRepositories_search {
  __typename: "SearchResultItemConnection";
  /**
   * A list of edges.
   */
  edges: (SearchRepositories_search_edges | null)[] | null;
}

export interface SearchRepositories {
  /**
   * Perform a search across resources.
   */
  search: SearchRepositories_search;
}

export interface SearchRepositoriesVariables {
  query: string;
}
