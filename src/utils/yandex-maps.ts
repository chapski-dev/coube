import { Linking } from 'react-native';
import { DrivingInfo, Point, RoutesFoundEvent } from 'react-native-yamap';

import { handleCatchError } from './handleCatchError';

export const extractRouteCoordinates = (routeData: RoutesFoundEvent<DrivingInfo>) => {
  if(routeData.status === 'error') {
    return handleCatchError('Не удалось отобразить маршрут')
  }
  // routeData.routes – массив маршрутов
  if (!routeData || !routeData.routes || routeData.routes.length === 0) return;
  const mainRoute = routeData.routes[0];
  let routePoints: Point[] = [];
  mainRoute.sections.forEach((section) => {
    // Каждая секция содержит массив точек в section.points
    routePoints = routePoints.concat(section.points);
  });

  let totalDistance = 0;
  mainRoute.sections.forEach((section) => {
    if (section.sectionInfo && section.sectionInfo.distance) {
      totalDistance += section.sectionInfo.distance;
    }
  });
  const distanceInKm = (totalDistance / 1000).toFixed(2);

  return {
    routeCoordinates: routePoints,
    routeDistance: distanceInKm
  };
};

export const openYandexMaps = (pointA: Point, pointB: Point) => {
  // Формируем deep link для нативного приложения
  const deepLinkUrl = `yandexmaps://maps.yandex.ru/?rtext=${pointA.lat},${pointA.lon}~${pointB.lat},${pointB.lon}&rtt=auto`;
  // Формируем URL для веб-версии Яндекс.Карт
  const webUrl = `https://yandex.ru/maps/?rtext=${pointA.lat},${pointA.lon}~${pointB.lat},${pointB.lon}&rtt=auto`;

  // Проверяем, можно ли открыть deep link
  Linking.canOpenURL(deepLinkUrl)
    .then((supported) => {
      if (supported) {
        // Если приложение установлено, открываем его
        return Linking.openURL(deepLinkUrl);
      } else {
        // Если нет – открываем веб-версию
        return Linking.openURL(webUrl);
      }
    })
    .catch(() => handleCatchError('Ошибка при открытии Яндекс.Карт', 'openYandexMaps'));
}
