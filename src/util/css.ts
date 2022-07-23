import { log } from '@/debugging/logger'
import type { CSSVariables } from '@/types/css-variables'

export function getGlobalVariable(variable: CSSVariables) {
  const computedValue = getComputedStyle(document.documentElement).getPropertyValue(`--${variable}`)

  if (!computedValue) {
    log(`Could not retrieve computed value for css variable ${variable}`)
    throw new Error(`Could not retrieve computed value for css variable ${variable}`)
  }
  return computedValue
}
