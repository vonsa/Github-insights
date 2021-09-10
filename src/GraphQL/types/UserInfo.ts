/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: UserInfo
// ====================================================

export interface UserInfo {
  __typename: "User";
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
}
