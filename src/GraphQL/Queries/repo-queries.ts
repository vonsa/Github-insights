// https://docs.github.com/en/github/searching-for-information-on-github/searching-on-github/searching-for-repositories
// https://docs.github.com/en/graphql/reference/queries#searchresultitemconnection

import { format, subWeeks } from 'date-fns'

// Gebleven bij https://github.com/search?o=desc&p=9&q=javascript&s=stars&type=Repositories
/*

EXAMPLE QUERY:

query { 
	search(first: 10, query: "language:JavaScript sort:stars", type: REPOSITORY){
    edges {
      node {
        ... on Repository{
      		stargazerCount
          name
        }
      }
    }
  }
}

*/

const searchQueryFragments = {
  base: 'in:name,description,readme is:public',
  popular: 'stars:>1000',
  contributable: 'good-first-issues:>5 help-wanted-issues:>5',
  active: 'pushed:2021-01-01 archived:false',
  lightweight: 'size:<4000',
  new: `created:>${format(subWeeks(new Date(), 1), 'YYYY-MM-DD')}`, // @TODO externalise the date logic
} as const

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

// type SearchPrefixes = 'sort'

// type SortOptions = 'stars-asc'

/*

  SEARCH QUERIES (not case sensitive):
  
  BASE: in:name,description,readme is:public
  POPULAR: stars:>1000
  CONTRIBUTABLE: good-first-issues:>5 help-wanted-issues:>5
  ACTIVE: pushed:2021-01-01 archived:false
  LIGHTWEIGHT: size:<4000
  NEW: created:>2021-08-16

  language:javascript topic:testing 


  frontend topics: web, ui, frontend, javascript
  learning topics: learn-to-code, education

  Topic suggestions:

  Selection:
    style-guide / best-practices (choose?)
    material-design
    testing
    components
    pwa
    utilities
    framework
    animation
    canvas
    compiler

  Possibly:
    algorithms
    typechecker
    design-systems
    vue
    react
    angular
    svelte
    build-tool
    module-bundler
    javascript-modules
    state/state-management
    project
    beginner-project
    webdevelopment
    ui-kit
    interview
    computer-science
    programming
    formatter
    css
    mocks/mocking
    video
    webgl
    translation
    data
    date
    minifier
*/

export default {}
