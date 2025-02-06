import React, { useState } from 'react';
import { InputWithButton } from '../ui/InputAndButton';
import { Box, Button, Text } from '@src/ui';
import { useLocalization } from '@src/translations/i18n';

export const CounterOfferScreen = () => {
	const { t } = useLocalization()

	const [transportCost, setTransportCost] = useState('');
	const [downtimePayment, setDowntimePayment] = useState('');
	const [paymentDeferral, setPaymentDeferral] = useState('');

	return (
		<Box flex={1} p={15} gap={20}  >
			<Box gap={7}>
				<Text children={t('route-of-delivery')} type='body_500' />

				<Box>
					<InputWithButton
						placeholder={t('cost-of-delivery')}
						value={transportCost}
						onChangeText={setTransportCost}
						buttonText={t('tenge')}
					/>
				</Box>
				
				<Box>
					<InputWithButton
						placeholder={t('downtime-pay')}
						value={downtimePayment}
						onChangeText={setDowntimePayment}
						buttonText={[t('tenge'), t('per-day')]}
					/>
				</Box>
				<Box>
					<InputWithButton
						placeholder={t('deferred-payment')}
						value={paymentDeferral}
						onChangeText={setPaymentDeferral}
						buttonText={t('calendar-days')}
					/>
				</Box>
			</Box>

			<Button children={t('send-counteroffer')} />
		</Box>
	);
};