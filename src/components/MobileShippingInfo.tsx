import React from "react";
import { Controller, UseFormReturn } from "react-hook-form";
import styled from "@emotion/styled";
import { Row, Select } from "antd";
import { mq } from "../assets/mediaQueries";
import {
  City,
  Country,
  CustomCol,
  CustomInput,
  CustomSelect,
  ErrorLabel,
  IFormInput,
  State,
  SubmitButton,
  Text,
} from "./ShippingInfo";
import { FormattedMessage } from "react-intl";
import { Ilocale, useLocalization } from "../providers/IntlProvider";
import { WarningOutlined } from "@ant-design/icons";
import { useAppSelector } from "../app/hooks";

const MobileBottomDrawer = React.lazy(
  () => import("../features/MobileBottomEstimateValue")
);

const Form = styled("form")({});

const RowMobile = styled(Row)(
  mq({
    display: ["block", "none"],
    maxWidth: "80vw",
    margin: "auto",
  })
);

const MobileShippingInfo: React.FC<
  Pick<UseFormReturn<IFormInput>, "control" | "handleSubmit" | "formState"> & {
    onSubmit: (data: IFormInput) => void;
    loadingResource: {
      loadingSku: boolean;
      loadingCountries: boolean;
      loadingCities: boolean;
      loadingStates: boolean;
    };
    countries: Country[];
    cities: City[];
    states: State[];
    sku: string;
    handlePreviousClick: () => void;
  }
> = ({
  control,
  handleSubmit,
  onSubmit,
  formState,
  loadingResource,
  countries,
  cities,
  states,
  sku,
  handlePreviousClick,
}) => {
  const { estimateValue, code } = useAppSelector((state) => state.item);
  const [localization] = useLocalization();
  const { errors } = formState;
  return (
    <RowMobile>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <CustomCol span={24}>
          <Text
            marginBottom={32}
            fontSize={24}
            fontWeight={700}
            lineHeight="28px"
            isBold
            color="#333333"
          >
            <FormattedMessage id="SHIPPING_INFO_TITLE" />
          </Text>
          <Text
            marginBottom={8}
            fontSize={14}
            fontWeight={400}
            lineHeight="21px"
            color="#4F4F4F"
          >
            <FormattedMessage id="FIRSTNAME" />
          </Text>
          <Controller
            rules={{ required: true, pattern: /^[a-zA-Z\s]*$/i }}
            render={({ field }) => (
              <CustomInput
                error={errors.firstName}
                {...field}
                width="100%"
                placeholder={
                  localization === Ilocale.EN
                    ? "Enter first name"
                    : "Inserisci il nome"
                }
              />
            )}
            name="firstName"
            control={control}
            defaultValue=""
          />
          <ErrorLabel error={errors.firstName}>
            <WarningOutlined
              style={{
                color: "#eb5757",
                fontSize: 16,
                marginRight: 8,
              }}
            />
            <Text
              fontSize={13}
              fontWeight={400}
              lineHeight="16px"
              color="#EB5757"
            >
              <FormattedMessage id="ERROR_INVALID_INPUT" />
            </Text>
          </ErrorLabel>

          <Text
            marginBottom={8}
            fontSize={14}
            fontWeight={400}
            lineHeight="21px"
            color="#4F4F4F"
          >
            <FormattedMessage id="LASTNAME" />
          </Text>
          <Controller
            rules={{ required: true, pattern: /^[a-zA-Z\s]*$/i }}
            render={({ field }) => (
              <CustomInput
                error={errors.lastName}
                {...field}
                width="100%"
                placeholder={
                  localization === Ilocale.EN
                    ? "Enter last name"
                    : "Inserisci il cognome"
                }
              />
            )}
            name="lastName"
            control={control}
            defaultValue=""
          />
          <ErrorLabel error={errors.lastName}>
            <WarningOutlined
              style={{
                color: "#eb5757",
                fontSize: 16,
                marginRight: 8,
              }}
            />
            <Text
              fontSize={13}
              fontWeight={400}
              lineHeight="16px"
              color="#EB5757"
            >
              <FormattedMessage id="ERROR_INVALID_INPUT" />
            </Text>
          </ErrorLabel>

          <Text
            marginBottom={8}
            fontSize={14}
            fontWeight={400}
            lineHeight="21px"
            color="#4F4F4F"
          >
            <FormattedMessage id="STREET_ADDRESS" />
          </Text>
          <Controller
            render={({ field }) => (
              <CustomInput
                {...field}
                width="100%"
                placeholder={
                  localization === Ilocale.EN
                    ? "Enter street address"
                    : "Inserisci l'indirizzo"
                }
              />
            )}
            name="street1"
            control={control}
            defaultValue=""
          />
          <ErrorLabel error={errors.street1}>
            <WarningOutlined
              style={{
                color: "#eb5757",
                fontSize: 16,
                marginRight: 8,
              }}
            />
            <Text
              fontSize={13}
              fontWeight={400}
              lineHeight="16px"
              color="#EB5757"
            >
              <FormattedMessage id="ERROR_INVALID_INPUT" />
            </Text>
          </ErrorLabel>

          <Text
            marginBottom={8}
            fontSize={14}
            fontWeight={400}
            lineHeight="21px"
            color="#4F4F4F"
          >
            <FormattedMessage id="APARTMENT_BUILDING" />
          </Text>
          <Controller
            render={({ field }) => (
              <CustomInput
                {...field}
                width="100%"
                placeholder={
                  localization === Ilocale.EN
                    ? "Enter info here"
                    : "Inserisci le informazioni qui"
                }
              />
            )}
            name="apartment"
            control={control}
            defaultValue=""
          />
          <ErrorLabel error={errors.apartment}>
            <WarningOutlined
              style={{
                color: "#eb5757",
                fontSize: 16,
                marginRight: 8,
              }}
            />
            <Text
              fontSize={13}
              fontWeight={400}
              lineHeight="16px"
              color="#EB5757"
            >
              <FormattedMessage id="ERROR_INVALID_INPUT" />
            </Text>
          </ErrorLabel>

          <Text
            marginBottom={8}
            fontSize={14}
            fontWeight={400}
            lineHeight="21px"
            color="#4F4F4F"
          >
            <FormattedMessage id="COUNTRY" />
          </Text>
          <Controller
            rules={{
              required: true,
            }}
            render={({ field }) => (
              <CustomSelect
                loading={loadingResource!.loadingCountries}
                disabled={!countries || loadingResource!.loadingCountries}
                {...field}
                width="100%"
                showSearch
                placeholder={
                  localization === Ilocale.EN
                    ? "Select Country"
                    : "Seleziona il Stato"
                }
                optionFilterProp="children"
                filterOption={(input: string, option: any) =>
                  (option!.children as unknown as string).includes(input)
                }
                filterSort={(optionA: any, optionB: any) =>
                  (optionA!.children as unknown as string)
                    .toLowerCase()
                    .localeCompare(
                      (optionB!.children as unknown as string).toLowerCase()
                    )
                }
              >
                {countries?.map(
                  (country: { id: string; code: string; name: String }) => (
                    <Select.Option value={country.code}>
                      {country.name}
                    </Select.Option>
                  )
                )}
              </CustomSelect>
            )}
            name="country"
            control={control}
            defaultValue=""
          />
          <ErrorLabel error={errors.country}>
            <WarningOutlined
              style={{
                color: "#eb5757",
                fontSize: 16,
                marginRight: 8,
              }}
            />
            <Text
              fontSize={13}
              fontWeight={400}
              lineHeight="16px"
              color="#EB5757"
            >
              <FormattedMessage id="ERROR_INVALID_INPUT" />
            </Text>
          </ErrorLabel>

          <Text
            marginBottom={8}
            fontSize={14}
            fontWeight={400}
            lineHeight="21px"
            color="#4F4F4F"
          >
            <FormattedMessage id="STATE" />
          </Text>
          <Controller
            rules={{
              required: true,
            }}
            name="state"
            render={({ field }) => (
              <CustomSelect
                loading={loadingResource!.loadingStates}
                disabled={
                  !states ||
                  loadingResource!.loadingStates ||
                  loadingResource!.loadingCountries
                }
                {...field}
                width="100%"
                showSearch
                placeholder={
                  localization === Ilocale.EN
                    ? "Enter State"
                    : "Entra nello Provincia"
                }
                optionFilterProp="children"
                filterOption={(input: string, option: any) =>
                  (option!.children as unknown as string).includes(input)
                }
                filterSort={(optionA: any, optionB: any) =>
                  (optionA!.children as unknown as string)
                    .toLowerCase()
                    .localeCompare(
                      (optionB!.children as unknown as string).toLowerCase()
                    )
                }
              >
                {states?.map((state: State) => (
                  <Select.Option key={state.id} value={state.name}>
                    {state.name}
                  </Select.Option>
                ))}
              </CustomSelect>
            )}
            control={control}
            defaultValue=""
          />
          <ErrorLabel error={errors.state}>
            <WarningOutlined
              style={{
                color: "#eb5757",
                fontSize: 16,
                marginRight: 8,
              }}
            />
            <Text
              fontSize={13}
              fontWeight={400}
              lineHeight="16px"
              color="#EB5757"
            >
              <FormattedMessage id="ERROR_INVALID_INPUT" />
            </Text>
          </ErrorLabel>

          <Text
            marginBottom={8}
            fontSize={14}
            fontWeight={400}
            lineHeight="21px"
            color="#4F4F4F"
          >
            <FormattedMessage id="CITY" />
          </Text>
          <Controller
            rules={{
              required: true,
            }}
            name="city"
            render={({ field }) => (
              // <CustomSelect
              //   loading={loadingResource!.loadingCities}
              //   disabled={
              //     !cities ||
              //     loadingResource!.loadingCities ||
              //     loadingResource!.loadingCountries
              //   }
              //   {...field}
              //   width="100%"
              //   showSearch
              //   mode="tags"
              //   placeholder={
              //     localization === Ilocale.EN ? "Enter City" : "Entra in Città"
              //   }
              //   optionFilterProp="children"
              //   filterOption={(input: string, option: any) =>
              //     (option!.children as unknown as string).includes(input)
              //   }
              //   filterSort={(optionA: any, optionB: any) =>
              //     (optionA!.children as unknown as string)
              //       .toLowerCase()
              //       .localeCompare(
              //         (optionB!.children as unknown as string).toLowerCase()
              //       )
              //   }
              // >
              //   {cities?.map((city: City) => (
              //     <Select.Option key={city.id} value={city.name}>
              //       {city.name}
              //     </Select.Option>
              //   ))}
              // </CustomSelect>
              <CustomInput
                {...field}
                width="100%"
                disabled={
                  !cities ||
                  loadingResource!.loadingCities ||
                  loadingResource!.loadingCountries
                }
                placeholder={
                  localization === Ilocale.EN ? "Enter City" : "Entra in Città"
                }
              />
            )}
            control={control}
            defaultValue=""
          />
          <ErrorLabel error={errors.city}>
            <WarningOutlined
              style={{
                color: "#eb5757",
                fontSize: 16,
                marginRight: 8,
              }}
            />
            <Text
              fontSize={13}
              fontWeight={400}
              lineHeight="16px"
              color="#EB5757"
            >
              <FormattedMessage id="ERROR_INVALID_INPUT" />
            </Text>
          </ErrorLabel>

          <Text
            marginBottom={8}
            fontSize={14}
            fontWeight={400}
            lineHeight="21px"
            color="#4F4F4F"
          >
            <FormattedMessage id="POSTAL_CODE" />
          </Text>
          <Controller
            rules={{
              required: true,
            }}
            render={({ field }) => (
              <CustomInput
                {...field}
                width="100%"
                placeholder={
                  localization === Ilocale.EN
                    ? "Enter postal code"
                    : "Inserisci il codice postale"
                }
              />
            )}
            name="zip"
            control={control}
            defaultValue=""
          />
          <ErrorLabel error={errors.zip}>
            <WarningOutlined
              style={{
                color: "#eb5757",
                fontSize: 16,
                marginRight: 8,
              }}
            />
            <Text
              fontSize={13}
              fontWeight={400}
              lineHeight="16px"
              color="#EB5757"
            >
              <FormattedMessage id="ERROR_INVALID_INPUT" />
            </Text>
          </ErrorLabel>

          <Text
            marginBottom={8}
            fontSize={14}
            fontWeight={400}
            lineHeight="21px"
            color="#4F4F4F"
          >
            <FormattedMessage id="PHONE_NUMBER" />
          </Text>
          <Controller
            rules={{
              required: true,
              pattern: /^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s\./0-9]*$/g,
            }}
            render={({ field }) => (
              <CustomInput
                {...field}
                error={errors.phone}
                width="100%"
                placeholder={
                  localization === Ilocale.EN
                    ? "Ex 0978 234589"
                    : "Ex 0978 234589"
                }
              />
            )}
            name="phone"
            control={control}
            defaultValue=""
          />
          <ErrorLabel error={errors.phone}>
            <WarningOutlined
              style={{
                color: "#eb5757",
                fontSize: 16,
                marginRight: 8,
              }}
            />
            <Text
              fontSize={13}
              fontWeight={400}
              lineHeight="16px"
              color="#EB5757"
            >
              <FormattedMessage id="ERROR_INVALID_INPUT" />
            </Text>
          </ErrorLabel>

          <Text
            marginBottom={8}
            fontSize={14}
            fontWeight={400}
            lineHeight="21px"
            color="#4F4F4F"
          >
            <FormattedMessage id="EMAIL_ADDRESS" />
          </Text>
          <Controller
            rules={{
              required: true,
              pattern:
                /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
            }}
            render={({ field }) => (
              <CustomInput
                {...field}
                error={errors.email}
                width="100%"
                placeholder={
                  localization === Ilocale.EN
                    ? "Enter email address"
                    : "Inserisci l'indirizzo email"
                }
              />
            )}
            name="email"
            control={control}
            defaultValue=""
          />
          <ErrorLabel error={errors.email}>
            <WarningOutlined
              style={{
                color: "#eb5757",
                fontSize: 16,
                marginRight: 8,
              }}
            />
            <Text
              fontSize={13}
              fontWeight={400}
              lineHeight="16px"
              color="#EB5757"
            >
              <FormattedMessage id="ERROR_INVALID_INPUT" />
            </Text>
          </ErrorLabel>

          <MobileBottomDrawer
            loading={false}
            showCalculated={estimateValue}
            sku={sku}
            value={estimateValue}
            code={code}
          />
        </CustomCol>
        <SubmitButton color="#4964DF" onClick={handlePreviousClick}>
          <FormattedMessage id="PREVIOUS" />
        </SubmitButton>
        <SubmitButton
          type="submit"
          // onClick={VerifyShippingAdrress}
          isbuttonenable={true}
          isnext={1}
        >
          <FormattedMessage id="SAVE_CONTINUE" />
        </SubmitButton>
      </Form>
    </RowMobile>
  );
};

export default MobileShippingInfo;
