import React, { ReactNode } from 'react';
import { Box, Text } from '@src/ui';
import DownArrowIcon from '@assets/svg/down-arrow.svg';
import { useState } from 'react';

interface InfoSectionProps {
  title: string;
  content: ReactNode;
}

export const InfoSection: React.FC<InfoSectionProps> = ({ title, content }) => {
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);

  return (
    <Box py={12} onPress={toggleVisibility}>
      <Box row alignItems="center" justifyContent="space-between">
        <Text type="body_500" children={title} />
        <DownArrowIcon />
      </Box>
      {isVisible && <Box>{content}</Box>}
    </Box>
  );
};
