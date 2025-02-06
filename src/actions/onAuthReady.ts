import { AppServiceStatus } from '@src/events'
import notifications from '@src/service/notifications'
import orders from '@src/service/orders'

let _isReady = false

export const onAuthReady = async (status: AppServiceStatus) => {
  if (status === AppServiceStatus.on && !_isReady) {
    _isReady = true
    void notifications.refresh()
    void orders.refresh()
  } else if (status === AppServiceStatus.off && _isReady) {
    _isReady = false
    void notifications.deleteAll()
    void orders.deleteAll()
  }
}
