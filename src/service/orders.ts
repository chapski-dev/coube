import { EventBus } from '@trutoo/event-bus';

import { getDriverOrders, getDriverOrdersFinished } from '@src/api';
import { OrderDetails } from '@src/api/types';
import { EventBusEvents } from '@src/events';
import { handleCatchError } from '@src/utils/handleCatchError';

class OrdersService extends EventBus {
  orders: OrderDetails[] = [];
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
    const notFinished = await getDriverOrders();
    const finished = await getDriverOrdersFinished();
    this.orders =[...this.orders, ...notFinished.content, ...finished.content];
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

  updateOrder = (updatedOrder: OrderDetails) => {
    const index = this.orders.findIndex(
      o => o.transportationMainInfoResponse.id === updatedOrder.transportationMainInfoResponse.id
    );
    
    if (index !== -1) {
      this.orders[index] = updatedOrder;
      this.publish(EventBusEvents.getOrders, this.orders);
    }
  };

  removeOrder = (orderId: number) => {
    this.orders = this.orders.filter(
      o => o.transportationMainInfoResponse.id !== orderId
    );
    this.publish(EventBusEvents.getOrders, this.orders);
  };
}

export default new OrdersService();
