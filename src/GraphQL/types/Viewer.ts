/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: Viewer
// ====================================================

export interface Viewer_viewer {
  __typename: "User";
  /**
   * The username used to login.
   */
  login: string;
}

export interface Viewer {
  /**
   * The currently authenticated user.
   */
  viewer: Viewer_viewer;
}
