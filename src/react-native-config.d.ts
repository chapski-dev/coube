declare module 'react-native-config' {
  export interface NativeConfig {
    API_HOST: string
    AUTH_URL: string
  }

  export const Config: NativeConfig
  export default Config
}
