
import { AppServiceStatus } from '@src/events'
import messaging from '@src/service/messaging'

let _isAuthorized = false
export const onFirebaseAuthorize = async (status: AppServiceStatus) => {
  console.log('onFirebaseAuthorize');
  
  if (status === AppServiceStatus.on && !_isAuthorized) {
    _isAuthorized = true
    messaging.init()
  } else if (status === AppServiceStatus.off && _isAuthorized) {
    _isAuthorized = false
    messaging.quitMessaging().catch((e) => console.error('firebase fcm token remove error: ', e))
  }
}
