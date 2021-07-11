api endpoints
api data models
data fetchers
map data to frontend requirements

## State management

Incorporate url state to share pages (e.g. github.coendewaal.com/visualize?search=vonsa)

## Structure

data layer (typed axios api?)
components layer
routes/ app

## Dev libs:

typescript
linting
git
jest

## Production libs:

rxjs
svelte & svelte-routing
xstate
animejs
axios

## Components:

### @TODO:

Build for production (babel, webpack?)

#### Bonus:

ci/cd
docker

# Concept brainstorm

Dashboard for recruiters? Store activity, comparisons, filter previously watched users by keywords (e.g. svelte, rxjs). New leads?
Funfactor for developers? Check your achievements in a visually attractive way, compare yourself to others. (get tips for improvement etc.?)
Add multiple users to compare them
Combine user event data with repos stars data to list activity to high profile repos etc.
Get amount of comments user placed

# Conceptual steps

1. Analyse github endpoints & data
2. Define visual representations

# Development steps

1. Routes
2. Page layout
3. Typed API
4. Data models
5. Data fetchers

Then repeat:

6. Component
7. Mapper for data fetcher

Then:

- Jest
- Add animations
- Refactor to use xstate (also try to implement this at start)
