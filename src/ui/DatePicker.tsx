import React, { FC } from 'react'
import MonthPicker, { EventTypes } from 'react-native-month-year-picker'
import CalendarIcon from '@assets/svg/calendar.svg'

import { useAppTheme } from '@src/theme/theme'

import { modal } from './Layouts/ModalLayout'
import { Box } from './Box'
import { Text } from './Text'

type DatePickerProps = {
  label: string,
  date: Date
  onChangeDate: ((event: EventTypes, newDate: Date) => void) | undefined
  inputValue: string;
}
const DatePicker: FC<DatePickerProps> = ({ label, date, onChangeDate, inputValue }) => {

  const { colors } = useAppTheme();

  const openDateModal = () => {
    const Element = <MonthPicker
      onChange={onChangeDate}
      value={date}
      maximumDate={new Date()}
      locale='ru-RU'
      autoTheme={false}
    />

    modal().setupModal?.({
      element: Element,
      justifyContent: 'flex-end',
    })
  }

  return (
    <Box onPress={openDateModal} gap={4}>
      <Text children={label} />
      <Box
        row
        borderWidth={2}
        pl={8}
        pr={8}
        borderColor={colors.border}
        borderRadius={10}
        w={166}
        h={50}
        alignItems='center'
        justifyContent='space-between' >
        <Text children={inputValue} />
        <CalendarIcon />
      </Box>
    </Box>
  )
}

export default DatePicker