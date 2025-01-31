export type NotificationSettings = {
  settings: {
    push_notifications: boolean
  }
}

export type NotificationDetails = {
  amount: string
  created_at: number
  from: string
  status: string
  to: string
  tx: any
  tx_hash: string
  loading?: boolean
}

export type OrderDetails = {
  amount: string
  created_at: number
  from: string
  status: string
  to: string
  tx: any
  tx_hash: string
  loading?: boolean
}
