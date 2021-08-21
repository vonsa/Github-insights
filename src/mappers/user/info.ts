import type { UserInfo } from 'src/GraphQL/types/UserInfo'

export function userInfoMapper<T extends UserInfo>({
  avatarUrl,
  company,
  createdAt,
  login,
  websiteUrl,
}: T) {
  return {
    avatarUrl,
    company,
    createdAt,
    login,
    websiteUrl,
  }
}
