import type { Icon } from '@/assets/icons'

export interface NavbarItem {
  label: string
  location?: string
  action?: () => void
  mobileIcon?: Icon
}
