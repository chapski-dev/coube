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
      h={72}
      onPress={onPress}
      pr={8}
      pl={8}
      borderWidth={1}
      borderRadius={15}
      borderColor={selected ? colors.main : colors.disabled}
      row
      gap={8}
      alignItems="center"
      w="full"
      >
      <TickIcon color={selected ? colors.main : colors.disabled} />
      <Text children={children} />
    </Box>
  );
};

export default Select;
