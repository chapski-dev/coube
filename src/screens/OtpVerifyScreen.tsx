import React, { useMemo, useRef, useState } from 'react'
import { ActivityIndicator, Vibration } from 'react-native'
import { HapticFeedbackTypes } from 'react-native-haptic-feedback'
import { OtpInput, OtpInputProps, OtpInputRef } from 'react-native-otp-entry'
import AsyncStorage from '@react-native-async-storage/async-storage'

import { vibrate } from '@src/actions/vibrate'
import { ScreenProps } from '@src/navigation/types'
import { dispatchAuth } from '@src/providers/auth'
import { AuthActionType } from '@src/providers/reducers/authReducer'
import { useAppTheme } from '@src/theme/theme'
import { useLocalization } from '@src/translations/i18n'
import { Box, Button, Text } from '@src/ui'
import { wait } from '@src/utils'
import { ASYNC_STORAGE_KEYS } from '@src/vars/async_storage_keys'
import { isIOS } from '@src/vars/platform'

const OTP_PASSWORD_LENGTH = 4;

const OtpVerifyScreen = ({ navigation, route }: ScreenProps<'otp-verify'>) => {
  const { colors } = useAppTheme()
  const { t } = useLocalization()

  const action = route.params.action;

  const otpInput = useRef<OtpInputRef>(null)

  const [notMatch, setNotMatch] = useState(false)
  const [disabled, setDisabled] = useState(false)
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    dispatchAuth?.({ type: AuthActionType.setReady })
    await AsyncStorage.setItem(ASYNC_STORAGE_KEYS.AUTH_STATE, AuthActionType.setReady)
  }


  const handleInputChanges = async (text: string) => {
    try {
      if (text.length === OTP_PASSWORD_LENGTH) {
        setDisabled(true)
        await wait(300)
        setLoading(true)
        await wait(1000)
        if (action === 'login') {
          if (text === '5555') {
            vibrate(HapticFeedbackTypes.notificationSuccess)
            await handleLogin();
            return
          } else {
            throw new Error('Не верно введен код!')
          }
        }
        if (action === 'phone-verify') {
          navigation.replace('settings-profile')
          return
        }
        navigation.replace('registration', { step: 'residency' })
        return
      }
    } catch (e) {

      Vibration.vibrate()
      setNotMatch(true)
      setDisabled(false)
      otpInput.current?.setValue('')
      isIOS && otpInput.current?.focus()
    } finally {
      setLoading(false)
    }
  }

  const theme: OtpInputProps['theme'] = useMemo(
    () => ({
      containerStyle: { gap: 12, width: 'auto' },
      filledPinCodeContainerStyle: notMatch
        ? { borderColor: colors.red, borderRadius: 16, borderWidth: 1 }
        : { borderColor: colors.main, borderRadius: 16, borderWidth: 1 },
      focusedPinCodeContainerStyle: {
        borderColor: notMatch ? colors.red : colors.border,
        borderRadius: 15,
        borderWidth: 1,
      },
      pinCodeContainerStyle: {
        borderColor: notMatch ? colors.red : colors.border,
        borderRadius: 15,
        borderWidth: 1,
        width: 47,
      },
      pinCodeTextStyle: { color: colors.textDefault, fontSize: 24 },
    }),
    [colors, notMatch],
  )

  return (
    <Box p={16} pt={54} gap={54} alignItems='center'>
      {action !== 'invite' ? (
        <>
          <Text type='h2' children={t('confirm_the_number')} />
          <Box row>
            <Text children={t('we_sent_it_to_a_number')} />
            <Text children="+7 777 777 77 77" />
            <Text children={t('confirmation_code_enter_it_below')} />
          </Box>
          
        </>
      ) : (
        <Text type='h2' children={t('enter_the_invitation_code')} />
      )}
      <OtpInput
        autoFocus
        ref={otpInput}
        disabled={disabled}
        theme={theme}
        numberOfDigits={OTP_PASSWORD_LENGTH}
        onTextChange={handleInputChanges}
        focusColor={colors.main}
      />
      <Box gap={16} w='full'>
        <Button children={t('confirm')} onPress={() => null} />
        {action === 'phone-verify' && <Button children={t('sms-code-failed-to-arrive')} type='clear' onPress={() => null} />}
      </Box>
    </>
  )
}

export default OtpVerifyScreen
