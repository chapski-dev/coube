import Config from 'react-native-config'
import axios from 'axios'
import axiosRetry, { isNetworkOrIdempotentRequestError } from 'axios-retry'

export const defaultHeaders = { 'Content-Type': 'application/json' }

const getAuthToken = async () => {
  try {
    // return 'Bearer ' + (await firebaseAuth().currentUser?.getIdToken())
    return 'Bearer ' + 'qwezxc'

  // eslint-disable-next-line no-unreachable
  } catch (err) {
    console.error('getAuthToken', err)
  }
}

const api = (() => {
  const instance = axios.create({
    baseURL: Config.API_HOST,
    headers: defaultHeaders,
  })

  axiosRetry(instance, {
    retries: 3,
    retryCondition: (error) => isNetworkOrIdempotentRequestError(error),
  })

  instance.interceptors.request.use(async (config) => {
    const authToken = await getAuthToken()
    if (authToken && !config.headers.Authorization) {
      config.headers.Authorization = authToken
    }
    return config
  })

  return instance
})()

export default api
