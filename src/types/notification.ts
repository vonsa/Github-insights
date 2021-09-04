type NotificationType = 'ERROR' | 'DEFAULT' | 'SUCCESS'

export interface NotificationConfig {
  title: string
  type: NotificationType
  time: number
}
