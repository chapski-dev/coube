import { StyleSheet } from 'react-native';

export const commonStytle = StyleSheet.create({
  wrapper: {
    width: '100%',
    alignItems: 'center',
  },
  button: {
    width: '100%',
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  text: {
    fontSize: 15,
  },
});

export const clearStyle = StyleSheet.create({
  button: {
    backgroundColor: 'transparent',
  },
  text: {
    fontSize: 15,
  },
});

export const filledStyle = StyleSheet.create({
  text: {
    color: 'white',
  },
});

export const outlineStyle = StyleSheet.create({
  button: {
    borderWidth: 1,
    borderColor: '#000',
    backgroundColor: 'transparent',
  },
});
