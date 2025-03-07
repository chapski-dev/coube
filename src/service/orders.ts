import { EventBus } from '@trutoo/event-bus';

import { getDriverOrders } from '@src/api';
import { OrderDetails } from '@src/api/types';
import { EventBusEvents } from '@src/events';
import { handleCatchError } from '@src/utils/handleCatchError';

import { STATE_MOCK } from './transportation-service';

const defaultOrders = Array.from({ length: 1 }, (_) => STATE_MOCK);

class Orders extends EventBus {
  orders: OrderDetails[] = defaultOrders;
  loading = false;
  loading_more = false;
  has_more = false;
  next_page = 0;
  limit = 10;

  constructor() {
    super();
    this.register(EventBusEvents.getOrders, { type: 'array' });
    this.register(EventBusEvents.setOrderLoading, { type: 'boolean' });
  }

  refresh = async () => {
    try {
      this.limit = 10;
      this.next_page = 0; // Сбрасываем страницу
      this.loading = true;
      this.publish(EventBusEvents.setOrderLoading, this.loading);
      this.deleteAll();
      await this.fetch();
    } catch (e) {
      this.orders = [];
      handleCatchError(e, 'Orders service refresh');
    } finally {
      this.loading = false;
      this.publish(EventBusEvents.setOrderLoading, this.loading);
      this.update();
    }
  };

  fetch = async () => {
    const res = await getDriverOrders({ page: this.next_page, size: this.limit });

    this.has_more = res?.page?.number < res?.page.totalPages - 1;
    this.orders = this.next_page === 0 ? res.content : [...this.orders, ...res.content];
    this.next_page = res?.page?.number + 1;
  };

  loadMore = async () => {
    if (!this.has_more || this.loading_more) {
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
    this.publish(EventBusEvents.getOrders, this.orders);
  };

  deleteAll = () => {
    this.orders = [];
    this.publish(EventBusEvents.getOrders, this.orders);
  };
}

export default new Orders();
