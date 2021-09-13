import type { Observable } from 'rxjs'
import { onDestroy } from 'svelte'

export function subscribeTo<T>(
  observable: Observable<T>,
  next?: (value: T) => void,
  error?: (error: any) => void,
  complete?: () => void,
) {
  const subscription = observable.subscribe({ next, error, complete })
  onDestroy(() => subscription.unsubscribe())
}
