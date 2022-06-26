import { Subject } from 'rxjs'

type AnalyticsEvent = { name: string; callback?: () => void; props?: any }

const analyticsEvents$ = new Subject<AnalyticsEvent>()
const sendAnalyticsEvent = (
  name: string,
  { callback, props }: { callback?: () => void; props?: any } = {},
) => {
  analyticsEvents$.next({ name, callback, props })
}

export { sendAnalyticsEvent, analyticsEvents$ }
