import { writable } from 'svelte/store'
import produce from 'immer'
import type { NotificationConfig } from '@/types/notification'
import { uid } from '@/util/uid'

const notificationStore = writable<({ id: string } & NotificationConfig)[]>([])

const { update, subscribe } = notificationStore
const notifications$ = { subscribe }

notifications$.subscribe((notifications) => {
  if (notifications.length > 4) {
    removeFirstNotification()
  }
})

function removeFirstNotification() {
  update((innerNotifications) => {
    return produce(innerNotifications, (draft) => {
      draft.shift()

      return draft
    })
  })
}

function addNotification(notification: NotificationConfig) {
  const id = uid()
  const notificationWithId = { ...notification, id }

  update((notifications) => {
    return produce(notifications, (draft) => {
      draft.push(notificationWithId)

      return draft
    })
  })

  if (notification.time) {
    setTimeout(() => {
      removeNotification(id)
    }, notification.time)
  }
}

function removeNotification(id: string) {
  update((notifications) => {
    return produce(notifications, (draft) => draft.filter((notification) => notification.id !== id))
  })
}

export { notifications$, addNotification }
