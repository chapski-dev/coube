/* eslint-disable max-len */
import React from 'react';
import { ScrollView } from 'react-native';
import ArrowIcon from '@assets/svg/arrow-right.svg';
import UploadLogoIcon from '@assets/svg/uploadLogo.svg';
import WarningIcon from '@assets/svg/warning.svg';

import { ScreenProps } from '@src/navigation/types';
import { useAppTheme } from '@src/theme/theme';
import { useLocalization } from '@src/translations/i18n';
import { Box, Button, Text } from '@src/ui';

export const CompanyConfigurationScreen = ({ navigation }: ScreenProps<'company-configuration'>) => {
	const { t } = useLocalization();
	const { colors } = useAppTheme();

	const openBankDetails = () => {
    navigation.push('bank-details');
  };

	const openContactDetails = () => {
    navigation.push('contact-details');
  };

	return (
		<ScrollView>
			<Box pt={20} gap={15} pb={25}>
				<Box w='full' alignItems='center'>
					<UploadLogoIcon />
				</Box>

				<Box gap={7}>
					<Box pl={15}>
						<Text children={t('iin')} />
						<Text type='body_500' children='895 522 622 622' />
					</Box>
					<Box w='full'h={1} backgroundColor={colors.grey} />
					<Box pl={15}>
						<Text children={t('oragnization-name')} />
						<Text type='body_500' children='ТОО «ТрансЛогистик»' />
					</Box>
					<Box w='full'h={1} backgroundColor={colors.grey} />
					<Box pl={15}>
						<Text children={t('general-director')} />
						<Text type='body_500' children='Костин Макар Дамирович' />
					</Box>
					<Box w='full'h={1} backgroundColor={colors.grey} />
					<Box pl={15}>
						<Text children='E-mail' />
						<Text type='body_500' children='Testemail@mail.ru' />
					</Box>
					<Box w='full'h={1} backgroundColor={colors.grey} />
					<Box pl={15}>
						<Text children={t('phone')} />
						<Text type='body_500' children='+7 777 777 77 77' />
					</Box>
					<Box w='full'h={1} backgroundColor={colors.grey} />
				</Box>

				<Box row justifyContent="space-between" alignItems="center" p={15} backgroundColor={colors.white} gap={15} onPress={openBankDetails}>
					<Text color='black' children={t('bank-details')} fontSize={17} />
					<Box row gap={13} alignItems='center'>
						<WarningIcon />
						<ArrowIcon/>
					</Box>
				</Box>

				<Box row justifyContent="space-between" alignItems="center" p={15} backgroundColor={colors.white} gap={15} onPress={openContactDetails}>
					<Text color='black' children={t('contact-details')} fontSize={17} />
					<Box row gap={13} alignItems='center'>
						<WarningIcon />
						<ArrowIcon />
					</Box>
				</Box>

				<Box px={15} gap={15}>

					<Box gap={3}>
						<Box row gap={6}>
							<Text color='black' children={t('certificate-of-registration')} />
							<Text color='red' children='*' />
						</Box>
						<Text color='red' children={t('document-has-not-been-uploaded')} />
						<Button type='outline' children={t('upload-file')} />
					</Box>
					<Box w='full'h={1} backgroundColor={colors.grey} />
					<Box gap={3}>
						<Box row gap={6}>
							<Text color='black' children={t('order-on-appointment-of-the-general-director')} />
							<Text color='red' children='*' />
						</Box>
						<Text color='red' children={t('document-has-not-been-uploaded')} />
						<Button type='outline' children={t('upload-file')} />
					</Box>
					<Box w='full'h={1} backgroundColor={colors.grey} />
					<Box gap={3}>
						<Box row gap={6}>
							<Text color='black' children={t('articles-of-association')} />
							<Text color='red' children='*' />
						</Box>
						<Text color='red' children={t('document-has-not-been-uploaded')} />
						<Button type='outline' children={t('upload-file')} />
					</Box>

					<Box w='full' h={1} backgroundColor={colors.grey} />

				</Box>

				<Box px={15}>
					<Button type='filled' children={t('finalize-the-configuration')} />
				</Box>

			</Box>
		</ScrollView>
	);
};