import { EventBus } from '@trutoo/event-bus';

// import { getOrdersByUserId } from '@src/api';
import { EventBusEvents } from '@src/events';

import { ITransportationOrderData, STATE_MOCK } from './transportation-service';

const defaultOrders = Array.from({ length: 1 }, (_) => STATE_MOCK);

class Orders extends EventBus {
  orders: ITransportationOrderData[] = defaultOrders;
  loading = false;
  loading_more = false;
  has_more = false;
  next_cursor?: string = undefined;
  limit = 10;

  constructor() {
    super();
    this.register(EventBusEvents.getOrders, { type: 'array' });
    this.register(EventBusEvents.setOrderLoading, { type: 'boolean' });
  }

  refresh = async () => {
    try {
      this.limit = 10;
      this.next_cursor = undefined;
      this.loading = true;
      this.publish(EventBusEvents.setOrderLoading, this.loading);
      this.deleteAll();
      await this.fetch();
    } catch (e) {
      this.orders = [];
    } finally {
      this.loading = false;
      this.publish(EventBusEvents.setOrderLoading, this.loading);
      this.update();
    }
  };

  fetch = async () => {
    // TODO: return to life when api apear
    // const res = await getOrdersByUserId({
    //   cursor: this.next_cursor,
    //   limit: this.limit,
    // });
    // this.has_more = res.has_more;
    // this.orders = this.next_cursor ? [...this.orders, ...res.data] : res.data || [];
    // this.next_cursor = res.next_cursor;
    this.orders = defaultOrders;
  };

  loadMore = async () => {
    if (!this.has_more) {
      return;
    }
    if (this.loading_more) {
      return;
    }
    try {
      this.loading_more = true;
      await this.fetch();
      this.update();
    } catch (error) {
      console.error('orders loadMore error: ', error);
    } finally {
      this.loading_more = false;
    }
  };

  update = () => {
    this.orders = defaultOrders
    this.publish(EventBusEvents.getOrders, this.orders);
  };

  deleteAll = () => {
    this.orders = [];
    this.publish(EventBusEvents.getOrders, this.orders);
  };
}

export default new Orders();
