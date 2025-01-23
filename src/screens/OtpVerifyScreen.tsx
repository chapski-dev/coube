import { Box, Button, Text } from '@src/ui'
import React, { useMemo, useRef, useState } from 'react'
import { OtpInput, OtpInputProps, OtpInputRef } from 'react-native-otp-entry'
import { useAppTheme } from '@src/theme/theme'
import { isIOS } from '@src/vars/platform'
import { ScreenProps } from '@src/navigation/types'

const OTP_PASSWORD_LENGTH = 4;

const OtpVerifyScreen = ({ navigation, route }: ScreenProps<'otp-verify'>) => {
  const action = route.params.action;
  const { colors } = useAppTheme()
  const otpInput = useRef<OtpInputRef>(null)

  const [notMatch, setNotMatch] = useState(false)
  const [disabled, setDisabled] = useState(false)

  const handleLogin = async () => {

  }

  const handleInputChanges = async (text: string) => {
    try {
      if (text.length === OTP_PASSWORD_LENGTH) {
        setDisabled(true)
        if (action === 'login') {
          await handleLogin();
          return
        }
        navigation.replace('registration', { step: 'residency' })
      }
    } catch (e) {
      setNotMatch(true)
      setDisabled(false)
      otpInput.current?.setValue('')
      isIOS && otpInput.current?.focus()
    }
  }

  const theme: OtpInputProps['theme'] = useMemo(
    () => ({
      containerStyle: { width: 'auto', gap: 12 },
      pinCodeTextStyle: { color: colors.textDefault, fontSize: 24 },
      pinCodeContainerStyle: {
        borderRadius: 15,
        borderWidth: 1,
        width: 47,
        borderColor: colors.border,
      },
      focusedPinCodeContainerStyle: {
        borderColor: colors.border,
        borderWidth: 1,
        borderRadius: 15,
      },
      focusedPinCodeContainerOutlineStyle: notMatch
        ? { borderColor: colors.red, borderWidth: 1, borderRadius: 16 }
        : { borderColor: colors.main, borderWidth: 1, borderRadius: 16 },
    }),
    [colors, notMatch],
  )

  return (
    <Box p={16} pt={54} gap={54} alignItems='center'>
      {action !== 'invite' ? (
        <>
          <Text type='h2' children="Подтвердите номер" />
          <Text children="Мы отправили на номер +7 777 777 77 77 код для подтверждения. Введите его ниже" />
        </>
      ) : (
        <Text type='h2' children="Введите код приглашения" />
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
        <Button children="Подтвердить" onPress={() => null} />
        {action === 'phone-verify' && <Button children="Не пришел смс код" type='clear' onPress={() => null} />}
      </Box>
    </Box>
  )
}

export default OtpVerifyScreen
