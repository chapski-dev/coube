import React from 'react'
import Circle from '@assets/svg/circle.svg';

import { RoutePoint } from '@src/screens/TransportationsDetailsScreen/components/RoutePoint';
import { useAppTheme } from '@src/theme/theme';
import { Box, Text } from '@src/ui';

import { RouteObjectType } from '../screens/TransportationsDetailsScreen/TransportationDetailsScreen';

interface TransportationRouteProps {
  route: RouteObjectType[];
}

export const TransportationRoute: React.FC<TransportationRouteProps> = ({ route }) => {
  const { colors } = useAppTheme();
  return (
    <Box>
          {route.map((data, index) => {
            const lastElement = route.length - 1;
            const isFirstElement = index === 0;
            return (
              <Box row gap={15} key={index}>
                <Box alignItems="center">
                  {isFirstElement ? (
                    <Circle color="dark_grey" />
                  ) : index === lastElement ? (
                    <Circle color="red" />
                  ) : (
                    <Box
                      w={15}
                      h={15}
                      alignItems="center"
                      justifyContent="center"
                      borderColor={colors.dark_grey}
                      borderWidth={1}
                      borderRadius={5}
                    >
                      <Text fontSize={8} color="black" children={index} />
                    </Box>
                  )}
                  {index !== lastElement && (
                    <Box flex={1} w={1} backgroundColor={colors.dark_grey} />
                  )}
                </Box>

                <RoutePoint key={index} {...data} />
              </Box>
            );
          })}
        </Box>
  );
};
