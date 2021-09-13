import type { Repositories } from 'src/GraphQL/types/Repositories'
import type { UserInfo } from 'src/GraphQL/types/UserInfo'
import type { UserStats } from 'src/GraphQL/types/UserStats'
import type { ProfileKey } from 'src/types/profiles-types'
import type { User_user } from 'src/GraphQL/types/User'
import { QUERY_USER } from 'src/GraphQL/Queries/User/user-queries'
import { query } from 'src/services/apolloService'

export type UserQueryVariables = { [K in ProfileKey]?: true }

type UserQueryResponse<Keys extends Record<string, unknown>> = {
  user: { login: User_user['login'] } & (Keys['info'] extends true ? UserInfo : unknown) &
    (Keys['stats'] extends true ? UserStats : unknown) &
    (Keys['repositories'] extends true ? Repositories : unknown)
}

async function fetchUser<T extends UserQueryVariables>(
  userName: string,
  fetchKeys: T,
): Promise<UserQueryResponse<T>> {
  const response = await query<UserQueryResponse<T>>({
    query: QUERY_USER,
    variables: { user: userName, ...fetchKeys },
  })

  if (!response.data) {
    throw new Error('Could not fetch user data')
  }

  return response.data
}

type UserQueryVariablesFromKeys<T extends ProfileKey[]> = Required<
  Pick<UserQueryVariables, T[number]>
>

function toQueryVariables<T extends ProfileKey[]>(keys: T): UserQueryVariablesFromKeys<T> {
  const reduced: UserQueryVariablesFromKeys<T> = keys.reduce((acc: any, curr) => {
    return { ...acc, [curr]: true }
  }, {})

  return reduced
}

export { fetchUser, toQueryVariables }
