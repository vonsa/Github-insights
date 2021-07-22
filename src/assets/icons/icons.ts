// Place icon files in public/assets/icons

const iconsConfig = {
  bottle: 'bottle.svg',
  'rank-1': 'rank-1.svg',
  'rank-2': 'rank-2.svg',
  'rank-3': 'rank-3.svg',
}

export const icons = Object.entries(iconsConfig)
  .map(([key, value]) => {
    return { [key]: `/assets/icons/${value}` }
  })
  .reduce((prev, curr) => {
    return { ...prev, ...curr }
  }, {})
