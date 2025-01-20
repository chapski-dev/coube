import BootSplash from 'react-native-bootsplash';


export const onNavigationReady = async () => {
  await BootSplash.hide({ fade: true });
};
