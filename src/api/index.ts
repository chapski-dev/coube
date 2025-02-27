import api from './config';
import { DriverOrderAcceptOrDecline, DriverOrderRequest, DriverOrderResponse, NotificationSettings } from './types';

export const getOrdersByUserId = async (params: { cursor?: string, limit: number }) => 
  api.get<{has_more: boolean, next_cursor?: string, data: []}>('/orders', { params })
  .then((res) => res.data)

export const getNotificationsByUserId = async (params: { cursor?: string, limit: number }) => 
  api.get<{has_more: boolean, next_cursor?: string, data: []}>('/notifications', { params })
  .then((res) => res.data)

/**
 * Retrieves the current notification settings for the authenticated user
 */
export const getNotificationSettings = () =>
  api.get<NotificationSettings>('/notification/settings').then((res) => res.data)


/**
 * Updates the notification settings for the authenticated user
 * */
export const setNotificationSettings = (data: NotificationSettings) =>
  api.put<NotificationSettings>('/notification/settings', data).then((res) => res.data)

//* Notification
/**
 * Registers a new Firebase Cloud Messaging token for push notifications
 */
export const registerFCMToken = (data: { token: string }) =>
  api.post<{ message: 'Token registered successfully' }>('/fcm', data).then((res) => res.data)


// driver api's
export const getDriverOrders = (data: DriverOrderRequest) =>
  api.get<DriverOrderResponse>('/api/v1/driver/orders', {params: {page: data.page ?? 1, size: data.size ?? 10, sort: JSON.stringify(data.sort ?? ['string'])}}).then((res) => res.data)

export const acceptDriverOrder = (transportationId: number) => 
  api.put<DriverOrderAcceptOrDecline>(`/api/v1/driver/orders/${transportationId}/accept`).then(res => res.data)

export const rejectDriverOrder = (transportationId: number) => 
  api.put<DriverOrderAcceptOrDecline>(`/api/v1/driver/orders/${transportationId}/reject`).then(res => res.data)