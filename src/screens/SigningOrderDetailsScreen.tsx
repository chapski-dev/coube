import React from 'react';
import { Image, ScrollView } from 'react-native';
import CompanyLogoIcon from '@assets/svg/company-logo.svg';

import { TransportationRoute } from '@src/components/TransportationRoute';
import { extendedOrderDetails } from '@src/mocks/extended-order-details';
import { useAppTheme } from '@src/theme/theme';
import { useLocalization } from '@src/translations/i18n';
import { OrderStatusEnum } from '@src/types/order';
import { Box, Button, Text } from '@src/ui';
import { Accordion } from '@src/ui/Accordion';

import { RouteObjectType } from './TransportationsDetailsScreen';

export type SigningTransportationDetails = {
  order_status: OrderStatusEnum;
  distance: string;
  performer: string;
  bin: string;
  company_name: string;
  general_director_name: string;
  legal_adress: string;
  actual_adress: string;
  phone: string;
  email: string;
  general_director_email: string;
  account_number: string;
  bank: string;
  bik: string;
  cargo_name: string;
  cargo_type: string;
  tare_type: string;
  cargo_weight_gross: string;
  cargo_volume_gross: string;
  additional_cargo_information: string;
  transportation_route: RouteObjectType[];
  moving_service: string;
  documents: string;
  order_number: string;
  transportation_period?: string;
};

export const SigningOrderDetailsScreen = () => {
  const { t } = useLocalization();
  const { colors, insets } = useAppTheme();

  const {
    distance,
    performer,
    bin,
    company_name,
    general_director_name,
    legal_adress,
    actual_adress,
    phone,
    email,
    general_director_email,
    account_number,
    bank,
    bik,
    cargo_name,
    cargo_type,
    tare_type,
    cargo_weight_gross,
    cargo_volume_gross,
    additional_cargo_information,
    transportation_route,
    moving_service,
    documents,
  } = extendedOrderDetails;

  return (
    <ScrollView
      contentContainerStyle={{ gap: 5, paddingBottom: insets.bottom }}
    >
      <Box alignItems="center" justifyContent="center" pt={10}>
        <Image
          source={require('@assets/png/map-for-transportation-details.png')}
        />
      </Box>

      <Box justifyContent="flex-end" row px={20}>
        <Text children={t('distance')} />
        <Text children=": " />
        <Text type="body_500" children={distance} />
      </Box>

      <Accordion label={t('company-information')} open>
        <Box row>
          <CompanyLogoIcon />
          <Box>
            <Text children={t('performer')} />
            <Text children={performer} />
          </Box>
        </Box>
        <Text type="body_500" children={t('about-company')} />
        <Box py={10} gap={10}>
          <Box>
            <Text children={t('bin')} />
            <Text type="body_500" children={bin} />
          </Box>
          <Box h={1} w="full" backgroundColor={colors.grey} />
          <Box>
            <Text children={t('company')} />
            <Text type="body_500" children={company_name} />
          </Box>
          <Box h={1} w="full" backgroundColor={colors.grey} />
          <Box>
            <Text children={t('general-director')} />
            <Text type="body_500" children={general_director_name} />
          </Box>
          <Box h={1} w="full" backgroundColor={colors.grey} />
          <Box>
            <Text children={t('general-director')} />
            <Text type="body_500" children={general_director_email} />
          </Box>
          <Box h={1} w="full" backgroundColor={colors.grey} />
          <Box>
            <Text children={t('legal-adress')} />
            <Text type="body_500" children={legal_adress} />
          </Box>
          <Box h={1} w="full" backgroundColor={colors.grey} mb={10} />

          <Text type="body_500" children={t('company-contact-details')} />

          <Box>
            <Text children={t('actual-adress')} />
            <Text type="body_500" children={actual_adress} />
          </Box>
          <Box h={1} w="full" backgroundColor={colors.grey} />
          <Box>
            <Text children={t('phone')} />
            <Text type="body_500" children={phone} />
          </Box>
          <Box h={1} w="full" backgroundColor={colors.grey} />
          <Box>
            <Text children={t('email')} />
            <Text type="body_500" children={email} />
          </Box>
          <Box h={1} w="full" backgroundColor={colors.grey} />
          <Box>
            <Text children={t('general-director')} />
            <Text type="body_500" children={general_director_email} />
          </Box>
          <Box h={1} w="full" backgroundColor={colors.grey} mb={10} />
          <Text type="body_500" children={t('bank-details')} />

          <Box>
            <Text children={t('account-number')} />
            <Text type="body_500" children={account_number} />
          </Box>
          <Box h={1} w="full" backgroundColor={colors.grey} />
          <Box>
            <Text children={t('bank')} />
            <Text type="body_500" children={bank} />
          </Box>
          <Box h={1} w="full" backgroundColor={colors.grey} />
          <Box>
            <Text children={t('bik')} />
            <Text type="body_500" children={bik} />
          </Box>
          <Box h={1} w="full" backgroundColor={colors.grey} mb={15} />
          <Box gap={5}>
            <Text
              color={colors.black}
              children={t('certificate-of-registration')}
            />
            <Text
              fontWeight="bold"
              color={colors.light_green}
              children={t('document-verified')}
            />
            <Button type="outline" children={t('download')} />
          </Box>
          <Box h={1} w="full" backgroundColor={colors.grey} mb={15} />
          <Box gap={5}>
            <Text
              color={colors.black}
              children={t('order-on-appointment-of-the-general-director')}
            />
            <Text
              fontWeight="bold"
              color={colors.light_green}
              children={t('document-verified')}
            />
            <Button type="outline" children={t('download')} />
          </Box>
          <Box h={1} w="full" backgroundColor={colors.grey} mb={15} />
          <Box gap={5}>
            <Text
              color={colors.black}
              children={t('articles-of-association')}
            />
            <Text
              fontWeight="bold"
              color={colors.light_green}
              children={t('document-verified')}
            />
            <Box row flexGrow={1} gap={5}>
              <Button
                wrapperStyle={{ flex: 1 }}
                type="outline"
                children={t('download')}
              />
              <Button
                wrapperStyle={{ flex: 1 }}
                type="outline"
                children={t('substitute')}
              />
            </Box>
            <Box h={1} w="full" backgroundColor={colors.grey} />
          </Box>
        </Box>
      </Accordion>

      <Accordion label={t('cargo-information')} open>
        <Box py={10} gap={10}>
          <Box>
            <Text children={t('cargo-name')} />
            <Text type="body_500" children={cargo_name} />
          </Box>

          <Box>
            <Text children={t('cargo-type')} />
            <Text type="body_500" children={cargo_type} />
          </Box>

          <Box>
            <Text children={t('loading-container-type')} />
            <Text type="body_500" children={tare_type} />
          </Box>

          <Box>
            <Box>
              <Text children={t('cargo-weight-brutto')} />
              <Text type="body_500" children={cargo_weight_gross} />
            </Box>
            <Box>
              <Text children={t('cargo-volume-brutto')} />
              <Text type="body_500" children={cargo_volume_gross} />
            </Box>
          </Box>

          <Box>
            <Text children={t('additional-cargo-info')} />
            <Text type="body_500" children={additional_cargo_information} />
          </Box>
        </Box>
      </Accordion>

      <Accordion label={t('route')}>
        <TransportationRoute transportation_route={transportation_route} />
      </Accordion>

      {/* <Accordion label={t('additional-info')}>
        <Box>
          <Text type="body_500" children={t('porter-service')} />
          <Box>
            <Box row>
              <Text children={t('number-of-people')} />
              <Text children=": " />
            </Box>
            <Text type="body_500" children={moving_service} />
          </Box>
        </Box>
      </Accordion> */}

      {/* <Accordion label={t('documents')}>
        <Box row gap={10}>
          <Image source={require('@assets/png/pdf-file.png')} />
          <Box>
            <Text type="body_500" children={t('waybill')} />
            <Text type="body_500" children={documents} fontWeight={400} />
          </Box>
        </Box>
      </Accordion> */}

      <Box p={10} gap={10}>
        <Button children={t('sign-a-contract')} backgroundColor="green" />
      </Box>
    </ScrollView>
  );
};
