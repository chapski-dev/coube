import { ScreenProps } from '@src/navigation/types';
import { useAppTheme } from '@src/theme/theme';
import { Box, Button, Input, Text } from '@src/ui';
import React, { useCallback, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { modal } from '@src/ui/Layouts/ModalLayout';
import { useMaskedInputProps } from 'react-native-mask-input';
import { phoneMask } from '@src/utils';
import DatePicker from '@src/ui/DatePicker';

interface ResidentFormValues {
  phone: string;
  iin: string
}

interface NonResidentFormValues {
  phone: string;
  iin: string;
  firstName: string;
  surname: string;
  middleName: string;
  pasportIssuedBy: string;
  pasportDateIssued: string;
  pasportNumber: string;
  pasportValidUntil: string;
  citizenship: string;
}

const RegistrationUserData = ({ navigation, route }: ScreenProps<'registration-user-data'>) => {
  const { insets, colors } = useAppTheme();

  const form = useForm<ResidentFormValues | NonResidentFormValues>({
    defaultValues: {
      pasportValidUntil: new Date().toLocaleDateString(),
    }
  });
  const [dateValidUntil, setDateValidUntil] = useState(new Date());
  const [dateIssued, setDateIssued] = useState(new Date());


  const handleContinue = (values: ResidentFormValues | NonResidentFormValues) => {
    navigation.navigate('otp-verify', { action: 'phone-verify' });
  };

  const onChangeDateValidUntil = useCallback(
    (_, newDate: Date) => {
      const selectedDate = newDate || dateValidUntil;
      setDateValidUntil(newDate)
      form.setValue('pasportValidUntil', selectedDate.toLocaleDateString())
      modal()?.closeModal?.()
    }, [dateValidUntil, form],
  );

  const onChangeDateIssued = useCallback(
    (_, newDate: Date) => {
      const selectedDate = newDate || dateIssued;
      setDateIssued(newDate)
      form.setValue('pasportDateIssued', selectedDate.toLocaleDateString())
      modal()?.closeModal?.()
    }, [dateIssued, form],
  );


  const maskedInputProps = useMaskedInputProps({
    mask: phoneMask,
    onChangeText: (val) => form.setValue('phone', val),
    value: form.watch().phone,
  });

  const renderContent = () => {
    if (route.params.resident) {
      return (
        <>
          <Box alignItems="center" mb={60}>
            <Text type="h1" children="Регистрация" />
            <Text fontSize={18} children="Введите номер телефона и ИИН" />
          </Box>

          <Box w="full" mb={24} gap={16}>
            <Input label="Введите телефон" required placeholder="+7" />
            <Input label="Введите ИИН" required placeholder="____________" />
          </Box>
        </>
      );
    } else {
      return (
        <>
          <Box alignItems="center" mb={16}>
            <Text type="h1" children="Регистрация" />
            <Text fontSize={18} children="Введите данные для регистрации" />
          </Box>
          <Box w="full" mb={24} gap={8}>
            <Controller
              control={form.control}
              name="firstName"
              render={({ field: { value, onBlur, onChange } }) => (
                <Input label="Имя" value={value} onChangeText={onChange} onBlur={onBlur} />
              )}
            />
            <Controller
              control={form.control}
              name="surname"
              render={({ field: { value, onBlur, onChange } }) => (
                <Input label="Фамилия" value={value} onChangeText={onChange} onBlur={onBlur} />
              )}
            />
            <Controller
              control={form.control}
              name='middleName'
              render={({ field: { value, onBlur, onChange } }) => (
                <Input label="Отчество" value={value} onChangeText={onChange} onBlur={onBlur} />
              )}
            />
            <Controller
              control={form.control}
              name='phone'
              render={({ field: { onBlur } }) => (
                <Input
                  label="Телефон"
                  onBlur={onBlur}
                  textContentType="telephoneNumber"
                  autoComplete="tel"
                  inputMode="tel"
                  {...maskedInputProps}
                />
              )}
            />
            <Controller
              control={form.control}
              name='citizenship'
              render={({ field: { value, onChange } }) => {
                const handlePickCitizenship = () => navigation.navigate('pick-country', { handlePick: onChange });
                return (
                  <Box mb={24} gap={4} onPress={handlePickCitizenship}>
                    <Text children="Гражданство" />
                    <Box
                      borderWidth={2}
                      pl={8}
                      pr={8}
                      borderColor={colors.border}
                      borderRadius={10}
                      h={50}
                      justifyContent='center'
                    >
                      <Text
                        color={value ? colors.textDefault : colors.disabled}
                        children={value ? value : "Выберите страну"}
                      />
                    </Box>
                  </Box>

                )
              }}
            />
            <Box gap={8}>
              <Text type="h3" children="Данные паспорта" />
              <Box w="full" row gap={8}>
                <Controller
                  control={form.control}
                  name='pasportNumber'
                  render={({ field: { value, onBlur, onChange } }) => (
                    <Input label="Номер паспорта" value={value} onChangeText={onChange} onBlur={onBlur} />
                  )}
                />
                <Controller
                  control={form.control}
                  name='pasportDateIssued'
                  render={({ field: { value } }) => (
                    <DatePicker
                      date={dateIssued}
                      onChangeDate={onChangeDateIssued}
                      label='Дата выдачи'
                      inputValue={value}
                    />
                  )}
                />
              </Box>
              <Controller
                control={form.control}
                name='pasportIssuedBy'
                render={({ field: { value, onBlur, onChange } }) => (
                  <Input label="Кем выдан" value={value} onChangeText={onChange} onBlur={onBlur} />
                )}
              />
              <Controller
                control={form.control}
                name='pasportValidUntil'
                render={({ field: { value } }) => (
                  <DatePicker
                    date={dateValidUntil}
                    onChangeDate={onChangeDateValidUntil}
                    label='Действителен до'
                    inputValue={value}
                  />
                )}
              />
            </Box>
          </Box>
        </>
      );
    }
  };

  return (
    <>
      <KeyboardAwareScrollView contentContainerStyle={{
        flexGrow: 1,
        paddingHorizontal: 16,
        alignItems: 'center',
        paddingBottom: insets.bottom,
      }}>
        {renderContent()}
        <Button children="Далее" onPress={form.handleSubmit(handleContinue)} />
      </KeyboardAwareScrollView>
    </>
  );
};

export default RegistrationUserData;
