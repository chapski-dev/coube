import BackgroundGeolocation, {
  Location,
} from 'react-native-background-geolocation';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';
import axios from 'axios';

const GEO_STORAGE_KEY = 'offline_geolocations';
const SERVER_URL = 'https://your-server.com/location';

// BackgroundFetch.configure({
//   minimumFetchInterval: 15
// }, async (taskId) => { // <-- This is your periodic-task callback  
//   const location = await BackgroundGeolocation.getCurrentPosition({
//     samples: 3,
//     extras: {   // <-- your own arbitrary meta-data
//       "event": "getCurrentPosition"
//     }
//   });
//   console.log('[getCurrentPosition]', location);
//   BackgroundFetch.finish(taskId);   // <-- signal that your task is complete
// })

class GeoTrackingService {

  async init() {
    await BackgroundGeolocation.ready(
      {
        allowIdenticalLocations: true,
        debug: false,
        desiredAccuracy: BackgroundGeolocation.DESIRED_ACCURACY_HIGH,
        distanceFilter: 50,
        logLevel: BackgroundGeolocation.LOG_LEVEL_VERBOSE,
        startOnBoot: true,
        stopOnTerminate: false,
      },
      async (state) => {
        if (!state.enabled) {
          BackgroundGeolocation.start();
        }
        await this.sendStoredLocations();
      },
    );

    BackgroundGeolocation.onLocation(async (location) => {
      // console.log('[LOCATION]', location);
      // location
      await this.sendLocationToServer(location);
    });

    this.monitorInternetConnection();
  };

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

  stop() {
    BackgroundGeolocation.stop();
  };
}

export default new GeoTrackingService();
