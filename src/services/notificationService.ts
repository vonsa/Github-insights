import { addNotification } from 'src/stores/notifications'
import type { NotificationConfig } from 'src/types/notification'

export function notify(
  config: { title: NotificationConfig['title'] } & Partial<NotificationConfig>,
) {
  const defaultConfig = {
    time: 3000,
    type: 'DEFAULT',
  } as const

  addNotification({ ...defaultConfig, ...config })
}
