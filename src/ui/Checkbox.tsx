import React from 'react';
import { Text } from './Text';
import { Box } from './Box';
import TickIcon from '@assets/svg/tick-fill.svg';
import { useAppTheme } from '@src/theme/theme';

interface SelectProps {
  selected?: boolean;
  children?: string;
  onPress?: () => void;
}
const Checkbox = ({
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
        {selected && <Box w={5} h={5} backgroundColor={colors.main} borderRadius={1} />}
      </Box>
      <Text color='black' fontWeight={400} children={children} />
    </Box>
  );
};

export default Checkbox;
