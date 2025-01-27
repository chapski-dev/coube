import React, { useState } from 'react'
import { FlatList } from 'react-native'

import { ScreenProps } from '@src/navigation/types'
import { useAppTheme } from '@src/theme/theme'
import { Box, Input, Text } from '@src/ui'


const countries = [
  { title: 'Россия', value: 'Russia' },
  { title: 'Узбекистан', value: 'Uzbekistan' },
  { title: 'Киргизия', value: 'Kirgiziya' },
  { title: 'Грузия', value: 'Грузия' },
  { title: 'Украина', value: 'Украина' },
  { title: 'Беларусь', value: 'Беларусь' },
];

const PickCountryScreen = ({ navigation, route }: ScreenProps<'pick-country'>) => {
  const { insets } = useAppTheme();
  
  const handlePick = (value: string) => () => {
    route.params.handlePick(value)
    navigation.goBack()
  };

  const [searchInputVal, setSearchInputVal] = useState('')
  const [filtredCountry, setFiltredCountry] = useState(countries);

  const handleFilter = (val: string) => {
    setSearchInputVal(val)
    const filtred = countries.filter((el) => el.title.toLowerCase().includes(val.toLowerCase()))
    setFiltredCountry(filtred);
  }


  return (
    <Box flexGrow={1} pt={insets.top} pl={16} pr={16} gap={24}>
      <Box>
        <Input type='search' value={searchInputVal} onChangeText={handleFilter} placeholder='Введите название страны' />
      </Box>
      <FlatList
        data={filtredCountry}
        keyExtractor={(i) => i.title}
        contentContainerStyle={{ gap: 15, paddingBottom: insets.bottom, width: '100%' }}
        renderItem={({ item }) => (
          <Box onPress={handlePick(item.title)} h={36} justifyContent='center'>
            <Text children={item.title} />
          </Box>
        )}
      />
    </Box>
  )
}

export default PickCountryScreen