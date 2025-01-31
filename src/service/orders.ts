import { EventBus } from '@trutoo/event-bus'
import dayjs from 'dayjs'

import { getOrdersByUserId } from '@src/api'
import { OrderDetails } from '@src/api/types'
import { EventBusEvents } from '@src/events'
import { createdAtFormat, groupBy } from '@src/utils'

export interface SectionData {
  title: string
  data: OrderDetails[]
}
const defaultOrders = Array.from({ length: 5 }, (_) => ({
  amount: '0',
  created_at: dayjs().unix(),
  from: '',
  loading: true,
  status: '',
  to: '',
  tx: {},
  tx_hash: '',
}))

export const getTxSections = (orders: OrderDetails[]): SectionData[] => {
  if (!orders.length) {
    return []
  }
  const grouped = groupBy(orders, (order) =>
    dayjs(typeof order.created_at === 'number' ?
       dayjs.unix(order.created_at) :
        order.created_at)
      .startOf('day')
      .toISOString(),
  )

  return Object.keys(grouped).map((key) => ({
    data: grouped[key],
    title: createdAtFormat(key),
  }))
}

class Orders extends EventBus {
  orders: OrderDetails[] = defaultOrders
  orderSections: SectionData[] = getTxSections(defaultOrders)
  loading = false
  loading_more = false
  has_more = false
  next_cursor?: string = undefined
  limit = 10

  constructor() {
    super()
    this.register(EventBusEvents.getOrderSections, { type: 'array' })
    this.register(EventBusEvents.setOrderLoading, { type: 'boolean' })
  }

  refresh = async () => {
    try {
      this.limit = 10
      this.next_cursor = undefined
      this.loading = true
      this.publish(EventBusEvents.setOrderLoading, this.loading)
      this.deleteAll()
      await this.fetch()
    } catch (e) {
      this.orders = []
    } finally {
      this.loading = false
      this.publish(EventBusEvents.setOrderLoading, this.loading)
      this.update()
    }
  }

  fetch = async () => {
    const res = await getOrdersByUserId({ cursor: this.next_cursor, limit: this.limit })
    this.has_more = res.has_more
    this.orders = this.next_cursor ? [...this.orders, ...res.data] : res.data || []
    this.next_cursor = res.next_cursor
  }

  loadMore = async () => {
    if (!this.has_more) {
      return
    }
    if (this.loading_more) {
      return
    }
    try {
      this.loading_more = true
      await this.fetch()
      this.update()
    } catch (error) {
      console.error('orders loadMore error: ', error)
    } finally {
      this.loading_more = false
    }
  }
  update = () => {
    this.orderSections = getTxSections(this.orders)
    this.publish(EventBusEvents.getOrderSections, this.orderSections)
  }

  deleteAll = () => {
    this.orders = defaultOrders
    this.orderSections = getTxSections(defaultOrders)
    this.publish(EventBusEvents.getOrderSections, this.orderSections)
  }
}

export default new Orders()
