import BootSplash from 'react-native-bootsplash';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { AppServiceStatus } from '@src/events';
import { navigationRef } from '@src/navigation/navigationRef';
import { dispatchAuth } from '@src/providers/auth';
import { AuthActionType } from '@src/providers/reducers/authReducer';
import { ASYNC_STORAGE_KEYS } from '@src/vars/async_storage_keys';

export const waitForNavigationReady = () => {
  return new Promise((resolve) => {
    const handler = () => {
      if (!navigationRef?.isReady()) {
        setTimeout(handler, 500)
      } else {
        resolve(true)
      }
    }

    handler()
  })
}

export const onNavigationReady = async (status: AppServiceStatus) => {
  if (status === AppServiceStatus.on) {
    const isStorageFilled = await AsyncStorage.getItem(ASYNC_STORAGE_KEYS.AUTH_STATE)
    dispatchAuth?.({ type: isStorageFilled ? AuthActionType.setReady : AuthActionType.setEmpty })
    await waitForNavigationReady()
    await BootSplash.hide({ fade: true });
  }
};
