import { format, subMonths, subWeeks, subYears } from 'date-fns'

export const timeAgo = {
  week: subWeeks(new Date(), 1),
  month: subMonths(new Date(), 1),
  year: subYears(new Date(), 1),
}

export function getTopRepositoriesQuery(from: Date) {
  return `created:>${format(from, 'yyyy-mm-dd')}`
}
