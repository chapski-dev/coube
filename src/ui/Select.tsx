import React from 'react';
import TickIcon from '@assets/svg/tick-fill.svg';

import { useAppTheme } from '@src/theme/theme';

import { Box } from './Box';
import { Text } from './Text';

interface SelectProps {
  selected?: boolean;
  children?: string;
  onPress?: () => void;
}
const Select = ({
  selected,
  children,
  onPress,
}: SelectProps) => {
  const { colors } = useAppTheme();

  return (
    <Box
      onPress={onPress}
      pr={8}
      pl={8}
      borderWidth={0}
      borderRadius={15}
      borderColor={selected ? colors.main : colors.disabled}
      row
      gap={8}
      alignItems="center"
      w="full"
      >
      <Box w={15} h={15} borderColor={colors.grey} borderWidth={1} alignItems='center' justifyContent='center' borderRadius={5} >
        <TickIcon color={selected ? colors.main : colors.disabled} width={15} height={15} />
      </Box>
      <Text color='black' fontWeight={400} children={children} />
    </Box>
  );
};

export default Select;