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

export type DriverOrderRequest = {
  page?: number
  size?: number
  sort?: string[]
}

export type DriverOrderResponse = {
  content: Array<Record<string, unknown>>
  page: {
    size: number
    number: number
    totalElements: number
    totalPages: number
  }
}