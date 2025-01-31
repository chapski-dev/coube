import { useCallback, useEffect, useState } from 'react';
import { EmitterSubscription, Keyboard, KeyboardEventListener, KeyboardMetrics } from 'react-native';
import { NativeEventSubscription } from 'react-native/Libraries/EventEmitter/RCTNativeAppEventEmitter';
import { useSharedValue } from 'react-native-reanimated';

const emptyCoordinates = Object.freeze({
  height: 0,
  screenX: 0,
  screenY: 0,
  width: 0,
});
const initialValue = {
  end: emptyCoordinates,
  start: emptyCoordinates,
};
export function useKeyboard() {
  const [shown, setShown] = useState(false);
  const keyboardHeightSV = useSharedValue(0);
  const [coordinates, setCoordinates] = useState<{
    start: undefined | KeyboardMetrics
    end: KeyboardMetrics
  }>(initialValue);
  const [keyboardHeight, setKeyboardHeight] = useState<number>(0);

  const handleKeyboardWillShow: KeyboardEventListener = useCallback((e) => {
    setCoordinates({ end: e.endCoordinates, start: e.startCoordinates });
  }, []);
  const handleKeyboardDidShow: KeyboardEventListener = useCallback((e) => {
    setShown(true);
    setCoordinates({ end: e.endCoordinates, start: e.startCoordinates });
    setKeyboardHeight(e.endCoordinates.height);
    keyboardHeightSV.value = e.endCoordinates.height;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const handleKeyboardWillHide: KeyboardEventListener = useCallback((e) => {
    setCoordinates({ end: e.endCoordinates, start: e.startCoordinates });
  }, []);
  const handleKeyboardDidHide: KeyboardEventListener = useCallback((e) => {
    setShown(false);
    if (e) {
      setCoordinates({ end: e.endCoordinates, start: e.startCoordinates });
    } else {
      setCoordinates(initialValue);
      setKeyboardHeight(0);
    }
  }, []);

  useEffect(() => {
    const subscriptions = [
      Keyboard.addListener('keyboardWillShow', handleKeyboardWillShow),
      Keyboard.addListener('keyboardDidShow', handleKeyboardDidShow),
      Keyboard.addListener('keyboardWillHide', handleKeyboardWillHide),
      Keyboard.addListener('keyboardDidHide', handleKeyboardDidHide),
    ] as (EmitterSubscription | NativeEventSubscription)[];

    return () => {
      subscriptions.forEach((subscription) => subscription.remove());
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    coordinates,
    keyboardHeight,
    keyboardHeightSV,
    keyboardShown: shown,
  };
}
