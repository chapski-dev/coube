import { AppState, NativeEventSubscription } from 'react-native';
import BackgroundGeolocation from 'react-native-background-geolocation';
import Config from 'react-native-config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { t } from 'i18next';

import { dispatchLogout } from '@src/providers/auth';
import { AppStatus, getAppStatus } from '@src/utils/system';
import { ASYNC_STORAGE_KEYS } from '@src/vars/async_storage_keys';

class GeolocationService {
  private _listener: null | NativeEventSubscription = null;

  async init() {
    BackgroundGeolocation.onLocation((location) => {
      console.log('GeolocationService->[onLocation]:', location);
      // this.sendLocationToServer(location);
    });
    BackgroundGeolocation.onMotionChange((event) => {
      console.log('GeolocationService->[onMotionChange]:', event);
    });

    BackgroundGeolocation.onProviderChange((event) => {
      console.log('GeolocationService->[onProviderChange]:', event);
    });
    BackgroundGeolocation.onHttp((event) => {
      console.log('GeolocationService->[onHttp]:', event);
    });
    BackgroundGeolocation.onAuthorization(async (event) => {
      if (event.success) {
        console.log('GeolocationService->[authorization] ERROR: ', event);
        this.updateConfig({ accessToken, refreshToken });
        await AsyncStorage.setItem(ASYNC_STORAGE_KEYS.ACCESS_TOKEN, event.response.access_token);
        await AsyncStorage.setItem(ASYNC_STORAGE_KEYS.REFRESH_TOKEN, event.response.refresh_token);
      } else {
        if (event?.status === 400) {
          dispatchLogout?.();
          throw new Error(t('translation:the_session_has_timed_out_please_log_in'));
        } else {
          throw event.error;
        }
      }
    });
    

    const refreshToken = (await AsyncStorage.getItem(ASYNC_STORAGE_KEYS.REFRESH_TOKEN)) || '';
    const accessToken = (await AsyncStorage.getItem(ASYNC_STORAGE_KEYS.ACCESS_TOKEN)) || '';

    await BackgroundGeolocation.ready({
      allowIdenticalLocations: true,
      authorization: {
        accessToken: accessToken,
        refreshToken: refreshToken,
        refreshUrl: `${Config.API_HOST}/api/v1/auth/refresh-token`,
        strategy: 'JWT'
      },
      autoSync: true, // Автоматически синхронизировать данные с сервером
      batchSync: false, // Отправлять данные пакетами
      debug: __DEV__ ? true : false, // Включить отладку
      desiredAccuracy: BackgroundGeolocation.DESIRED_ACCURACY_HIGH,
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      },
      locationAuthorizationRequest: 'Always',
      locationTemplate:
        '{"point":{"lat":<%= latitude %>,"lng":<%= longitude %>},"timestamp":"<%= timestamp %>","accuracy":<%= accuracy %>,"speed":<%= speed %>,"heading":<%= heading %>}',
      logLevel: BackgroundGeolocation.LOG_LEVEL_VERBOSE,
      startOnBoot: true,
      stopOnTerminate: false,
      url: `${Config.API_HOST}/api/v1/driver/location/check`
    })
      .then((state) => {
        console.log('GeolocationService->[init]: success', state);
      })
      .catch(() => {
        console.error('GeolocationService->[init]: error');
      });

    this._listener = AppState.addEventListener('change', () => this.listenAppStateChange());
    this.listenAppStateChange();
  }

  private listenAppStateChange() {
    try {
      if (getAppStatus() === AppStatus.inactive) {
        console.log('GeolocationService->[listenAppStateChange]: removeAllListeners');
        BackgroundGeolocation.removeAllListeners();
        // this.monitorInternetConnection().unsubscribe();
        return;
      }
    } catch (error) {
      console.error('messaging listenAppStateChange error', error);
    }
  }

  async updateConfig({ accessToken, refreshToken }: { accessToken: string; refreshToken: string }) {
    await BackgroundGeolocation.setConfig({
      authorization: {
        accessToken,
        refreshToken,
        refreshUrl: `${Config.API_HOST}/api/v1/auth/refresh-token`,
        strategy: 'JWT'
      }
    });
  }

  async start() {
    console.log('START');
    
    await BackgroundGeolocation.start().then(() => {
      console.log('GeolocationService->[start]: success');
    });
    await BackgroundGeolocation.changePace(true);
  }

  async stop() {
    await BackgroundGeolocation.changePace(false);
    await BackgroundGeolocation.stop();
  }

  // private async sendLocationToServer(location: Location) {
  //   try {
  //     sendLocation({
  //       accuracy: location.coords.accuracy,
  //       heading: location.coords.heading || 0,
  //       point: {
  //         lat: location.coords.latitude,
  //         lon: location.coords.longitude
  //       },
  //       speed: location.coords.speed || 0,
  //       timestamp: location.timestamp
  //     }).then((response) => {
  //       console.log('GeolocationService->[sendLocationToServer]->Location sent to server:', response.message);
  //     });
  //   } catch (error) {
  //     console.log('Failed to send location, saving locally', error);
  //     this.saveLocationOffline(location);
  //   }
  // }

  // private async saveLocationOffline(location: Location) {
  //   try {
  //     const storedData = await AsyncStorage.getItem(ASYNC_STORAGE_KEYS.OFFLINE_LOCATIONS);
  //     const locations = storedData ? JSON.parse(storedData) : [];
  //     locations.push(location);
  //     await AsyncStorage.setItem(ASYNC_STORAGE_KEYS.OFFLINE_LOCATIONS, JSON.stringify(locations));
  //   } catch (error) {
  //     console.log('Error saving location offline', error);
  //   }
  // }

  // private async sendStoredLocations() {
  //   try {
  //     const storedData = await AsyncStorage.getItem(ASYNC_STORAGE_KEYS.OFFLINE_LOCATIONS);
  //     if (!storedData) return;

  //     const locations = JSON.parse(storedData);
  //     for (const location of locations) {
  //       await sendLocation({
  //         accuracy: location.coords.accuracy,
  //         heading: location.coords.heading || 0,
  //         point: {
  //           lat: location.coords.latitude,
  //           lon: location.coords.longitude
  //         },
  //         speed: location.coords.speed || 0,
  //         timestamp: location.timestamp
  //       }).then((response) => {
  //         console.log('GeolocationService->[sendStoredLocations]->Location sent to server:', response.message);
  //       });
  //     }

  //     await AsyncStorage.removeItem(ASYNC_STORAGE_KEYS.OFFLINE_LOCATIONS);
  //   } catch (error) {
  //     console.log('Error sending stored locations', error);
  //   }
  // }

  // private monitorInternetConnection() {
  //   const unsubscribe = NetInfo.addEventListener((state) => {
  //     if (state.isConnected) {
  //       this.sendStoredLocations();
  //     }
  //   });
  //   return { unsubscribe };
  // }
}

export default new GeolocationService();
