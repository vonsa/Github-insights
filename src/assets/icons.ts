/*
  Steps to add an icon to the project:
  
    1. Place icon file in public/assets/icons
    2. Add icon filename to iconsConfig
*/

const iconsConfig = {
  bottle: 'bottle.svg',
  'rank-1': 'rank-1.svg',
  'rank-2': 'rank-2.svg',
  'rank-3': 'rank-3.svg',
  clipboard: 'clipboard.svg',
  close: 'close.svg',
  github: 'github.svg',
  star: 'star.svg',
  error: 'error.svg',
  info: 'info.svg',
  success: 'success.svg',
  link: 'link.svg',
  open: 'open.svg',
  'external-link': 'external-link.svg',
  menu: 'menu.svg',
  home: 'home.svg',
  profiles: 'profiles.svg',
  login: 'login.svg',
  logout: 'logout.svg',
}

export type Icon = keyof typeof iconsConfig

export const icons = Object.entries(iconsConfig)
  .map(([key, value]) => {
    return { [key]: `/assets/icons/${value}` }
  })
  .reduce((prev, curr) => {
    return { ...prev, ...curr }
  }, {})
