import BackgroundGeolocation, {
  HttpEvent,
  Location,
  LocationError,
  MotionChangeEvent,
} from 'react-native-background-geolocation';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';
import axios from 'axios';

const GEO_STORAGE_KEY = 'offline_geolocations';
const SERVER_URL = 'https://x.com/location';

class GeolocationService {
  constructor() {
    this.init() 
  }

  async init() {
    await BackgroundGeolocation.ready(
      {
        allowIdenticalLocations: true,
        authorization: {
          accessToken: '123',
          expires: 123123123123123,
          refreshPayload: {
            the_refresh_token_field_name: '{refreshToken}'
          },
          refreshToken: 'zxc',
          refreshUrl: 'https://auth.your.server.com/tokens',
          strategy: 'JWT'
        },
        autoSync: true, // Автоматически синхронизировать данные с сервером
        batchSync: false, // Отправлять данные пакетами
        debug: true, // Включить отладку
        desiredAccuracy: BackgroundGeolocation.DESIRED_ACCURACY_HIGH,
        distanceFilter: 50, // Минимальное расстояние в метрах для обновления местоположения
        locationAuthorizationRequest: 'Always',
        logLevel: BackgroundGeolocation.LOG_LEVEL_VERBOSE,

        startOnBoot: true, // Запускать отслеживание при загрузке устройства
        stopOnTerminate: false, // Продолжать отслеживание после закрытия приложения
        stopTimeout: 5, // Остановить отслеживание через 5 минут после остановки движения
        url: SERVER_URL, // URL для отправки данных на сервер
      });
      
      BackgroundGeolocation.onLocation(this.onLocation, this.onError);
      BackgroundGeolocation.onMotionChange(this.onMotionChange);
      BackgroundGeolocation.onHttp(this.onHttpSuccess);

    this.monitorInternetConnection();
  }


  onLocation(location: Location) {
    console.log('[location] -', location);

    // Сохраняем местоположение в AsyncStorage, если нет интернета
    AsyncStorage.getItem('locations').then((locations) => {
      const storedLocations = locations ? JSON.parse(locations) : [];
      storedLocations.push(location);
      AsyncStorage.setItem('locations', JSON.stringify(storedLocations));
    });

    // Отправляем местоположение на сервер
    axios
      .post(SERVER_URL, location)
      .then((response) => {
        console.log('Location sent to server:', response.data);
      })
      .catch((error) => {
        console.error('Error sending location to server:', error);
      });
  }

  onMotionChange(event: MotionChangeEvent) {
    console.log('[motionchange] -', event.isMoving, event.location);
  }

  onError(error: LocationError) {
    console.error('[ERROR] BackgroundGeolocation error:', error);
  }

  onHttpSuccess(response:HttpEvent) {
    console.log('[http status] -', response.status);
  }

  async startTracking() {
   await BackgroundGeolocation.start((state) => {
    console.log('[start] success - ', state);
  });
  }

  async stopTracking() {
    await BackgroundGeolocation.stop();
  }

  sendLocationToServer = async (location: Location) => {
    try {
      await axios.post(SERVER_URL, location);
    } catch (error) {
      console.log('Failed to send location, saving locally', error);
      this.saveLocationOffline(location);
    }
  };

  async saveLocationOffline(location: Location) {
    try {
      const storedData = await AsyncStorage.getItem(GEO_STORAGE_KEY);
      const locations = storedData ? JSON.parse(storedData) : [];
      locations.push(location);
      await AsyncStorage.setItem(GEO_STORAGE_KEY, JSON.stringify(locations));
    } catch (error) {
      console.log('Error saving location offline', error);
    }
  }

  async sendStoredLocations() {
    try {
      const storedData = await AsyncStorage.getItem(GEO_STORAGE_KEY);
      if (!storedData) return;

      const locations = JSON.parse(storedData);
      for (const location of locations) {
        await axios.post(SERVER_URL, location);
      }

      await AsyncStorage.removeItem(GEO_STORAGE_KEY);
    } catch (error) {
      console.log('Error sending stored locations', error);
    }
  }

  monitorInternetConnection() {
    NetInfo.addEventListener((state) => {
      if (state.isConnected) {
        this.sendStoredLocations();
      }
    });
  }


}

export default new GeolocationService();
