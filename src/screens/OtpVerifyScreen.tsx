import React, { useMemo, useRef, useState } from 'react'
import { OtpInput, OtpInputProps, OtpInputRef } from 'react-native-otp-entry'

import { ScreenProps } from '@src/navigation/types'
import { useAppTheme } from '@src/theme/theme'
import { useLocalization } from '@src/translations/i18n'
import { Box, Button, Text } from '@src/ui'
import { isIOS } from '@src/vars/platform'

const OTP_PASSWORD_LENGTH = 4;

const OtpVerifyScreen = ({ navigation, route }: ScreenProps<'otp-verify'>) => {
  const { t } = useLocalization()

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
      containerStyle: { gap: 12, width: 'auto' },
      focusedPinCodeContainerOutlineStyle: notMatch
        ? { borderColor: colors.red, borderRadius: 16, borderWidth: 1 }
        : { borderColor: colors.main, borderRadius: 16, borderWidth: 1 },
      focusedPinCodeContainerStyle: {
        borderColor: colors.border,
        borderRadius: 15,
        borderWidth: 1,
      },
      pinCodeContainerStyle: {
        borderColor: colors.border,
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
          <Box>
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
        <Button children="Подтвердить" onPress={() => null} />
        {action === 'phone-verify' && <Button children="Не пришел смс код" type='clear' onPress={() => null} />}
      </Box>
    </Box>
  )
}

export default OtpVerifyScreen
