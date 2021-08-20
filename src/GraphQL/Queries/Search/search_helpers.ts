import { format, subWeeks } from 'date-fns'

export function getRepoSearchQuery(fragments: SearchQueryFragment[]) {
  return fragments.map((fragment) => searchQueryFragments[fragment]).join(' ')
}

const searchQueryFragments = {
  base: 'in:name,description,readme is:public',
  popular: 'stars:>1000',
  contributable: 'good-first-issues:>5 help-wanted-issues:>5',
  active: 'pushed:2021-01-01 archived:false',
  lightweight: 'size:<4000',
  new: `created:>${format(subWeeks(new Date(), 1), 'yyyy-mm-dd')}`,
} as const

export const searchKeywords: Omit<SearchQueryFragment, 'base'>[] = Object.keys(
  searchQueryFragments,
).filter((key) => key !== 'base')

export type SearchQueryFragment = keyof typeof searchQueryFragments

export const topics = [
  'material-design',
  'testing',
  'components',
  'pwa',
  'utilities',
  'framework',
  'animation',
  'canvas',
  'compiler',
  'best-practices',
] as const

export type Topics = typeof topics[number]
