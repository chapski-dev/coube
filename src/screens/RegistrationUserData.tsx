import { ScreenProps } from '@src/navigation/types';
import { useAppTheme } from '@src/theme/theme';
import { Box, Button, Input, Text } from '@src/ui';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

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
  citizenship: string;
}

const RegistrationUserData = ({ navigation, route }: ScreenProps<'registration-user-data'>) => {
  const { insets } = useAppTheme();
  const form = useForm<ResidentFormValues | NonResidentFormValues>();

  const handleContinue = (values: ResidentFormValues | NonResidentFormValues) => {
    navigation.navigate('intro', values);
  };
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
            <Input label="Введите ИИН *" required placeholder="____________" />
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
              name="name"
              render={({ field: { value, onBlur, onChange } }) => (
                <Input label="Имя" value={value} onChange={onChange} onBlur={onBlur} />
              )}
            />
            <Controller
              control={form.control}
              name="surname"
              render={({ field: { value, onBlur, onChange } }) => (
                <Input label="Фамилия" value={value} onChange={onChange} onBlur={onBlur} />
              )}
            />

            <Input label="Отчество" />
            <Input label="Телефон " />
            <Input label="Гражданство" wrapperStyle={{ paddingBottom: 24 }} />
            <Box gap={8}>
              <Text type="h3" children="Данные паспорта" />
              <Box w="full" row gap={8}>
                <Input label="Номер паспорта" />
                <Input label="Дата выдачи" />
              </Box>
              <Input label="Кем выдан" />
              <Input label="Действителен до" />
            </Box>
          </Box>
        </>
      );
    }
  };

  return (
    <KeyboardAwareScrollView contentContainerStyle={{
      flexGrow: 1,
      paddingHorizontal: 16,
      alignItems: 'center',
      paddingBottom: insets.bottom,
    }}>
      {renderContent()}
      <Button children="Далее" onPress={form.handleSubmit(handleContinue)} />
    </KeyboardAwareScrollView>
  );
};

export default RegistrationUserData;
