import AsyncStorage from '@react-native-async-storage/async-storage'

import { dispatchAuth } from '@src/providers/auth'
import { AuthActionType } from '@src/providers/reducers/authReducer'


class App {
  logout = () => {
    // system
    AsyncStorage.clear().catch((e) => console.log('async storage clear error: ', e))
    // providers
    dispatchAuth?.({ type: AuthActionType.setEmpty })
  }
}

export default new App()
