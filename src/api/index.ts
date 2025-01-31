import api from './config';
import { NotificationSettings } from './types';

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
