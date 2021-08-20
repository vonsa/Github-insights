import type { DocumentNode } from 'graphql'
import { QUERY_USER } from './User/user-queries'

interface Queries {
  [key: string]: DocumentNode
}

export const queries: Queries = {
  QUERY_USER,
}
