export interface StyleConfig {
  hover?: string
  default?: string
}

export interface StylesString {
  [key: string]: string
}

export interface StylesObject {
  [key: string]: StyleConfig
}

export interface Styles {
  [key: string]: StyleConfig | string
}

export function generateStyleString<T = StylesObject | StylesString>(
  styles: T,
  filterState?: T extends StylesObject ? keyof StylesObject[keyof StylesObject] : undefined,
): string {
  return Object.entries(styles)
    .filter(([, config]) => !!config)
    .map(([property, config]) => {
      if (typeof config === 'string') {
        return `${property}: ${config};`
      }

      if (filterState) {
        return `${property}: ${config[filterState] || config.default};`
      }

      return ''
    })
    .join('')
}
