// Place icon files in public/assets/icons

const iconsConfig = {
  bottle: 'bottle.svg',
}

export const icons = Object.entries(iconsConfig)
  .map(([key, value]) => {
    return { [key]: `/assets/icons/${value}` }
  })
  .reduce((prev, curr) => {
    return { ...prev, ...curr }
  }, {})
