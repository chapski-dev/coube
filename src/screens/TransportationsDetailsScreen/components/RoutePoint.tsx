import { FC } from 'react';

import { useLocalization } from '@src/translations/i18n';
import { Box, Text } from '@src/ui';

import { RouteObjectType } from '../TransportationDetailsScreen';

export const RoutePoint: FC<RouteObjectType> = ( data ) => {
	const { t } = useLocalization()

	return (
		<Box pb={15}>
			<Box row gap={5} alignItems="center">
				<Text children={t('point')} />
				<Text children={t(data.placeType)} />
			</Box>

			<Text type="body_500" children={data.loadingPoint} />

			<Box>
				<Text children={t('date-and-place-of-unloading')} />
				<Text type="body_500" children={data.dateAndPlaceOfUnloading} />
			</Box>

			<Box row gap={25} >
				<Box>
					<Text children={t('cargo-weight')} />
					<Text type="body_500" children={data.cargoWeight} />
				</Box>
				<Box>
					<Text children={t('cargo-volume')} />
					<Text type="body_500" children={data.cargoVolume} />
				</Box>
			</Box>

			<Box>
				<Text children={t('loading-method')} />
				<Text type="body_500" children={data.loadingMethod} />
			</Box>
		</Box>
	);
};