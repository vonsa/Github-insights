import type { Icon } from 'src/assets/icons'

export interface NavbarItem {
  label: string
  location?: string
  action?: () => void
  mobileIcon?: Icon
}
