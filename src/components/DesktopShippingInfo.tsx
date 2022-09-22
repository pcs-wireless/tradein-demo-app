import React from "react";
import { Controller, UseFormReturn } from "react-hook-form";
import styled from "@emotion/styled";
import { Col, Row, Select } from "antd";
import {
  City,
  Country,
  CustomCol,
  CustomInput,
  CustomSelect,
  ErrorLabel,
  EstimatedValue,
  IFormInput,
  RowDesktop,
  State,
  SubmitButton,
  Text,
} from "./ShippingInfo";
import { FormattedMessage } from "react-intl";
import { Ilocale, useLocalization } from "../providers/IntlProvider";
import { WarningOutlined } from "@ant-design/icons";
import { useAppSelector } from "../app/hooks";
import {
  Phone,
  Tablet,
  Laptop,
  Phones,
  Tablets,
  Laptops,
} from "../routings/constants/devicesNames";
import CellPhone from "../assets/images/CellPhone.svg";
import laptop from "../assets/images/laptop.svg";
import watch from "../assets/images/watch.svg";
import tablet from "../assets/images/tablet.svg";

interface IImageCatalog {
  device: string | null;
}

export const ImageCatalog = styled("div")(({ device }: IImageCatalog) => ({
  width: "auto",
  height: 124,
  marginBottom: 17,
  backgroundImage: `url(${
    device === Phone || device === Phones
      ? CellPhone
      : device === Tablet || device === Tablets
      ? tablet
      : device === Laptop || device === Laptops
      ? laptop
      : watch
  })`,
  backgroundSize: "contain",
  backgroundRepeat: "no-repeat",
}));

const Form = styled("form")({});

const DesktopShippingInfo: React.FC<
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
    isTablet: boolean;
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
  isTablet,
}) => {
  const { estimateValue, code, storage, device, model } = useAppSelector(
    (state) => state.item
  );
  const [localization] = useLocalization();

  const { errors } = formState;
  return (
    <RowDesktop className="shipping-info">
      <Col style={{ padding: "0 10px" }} span={8}>
        <ImageCatalog device={device} />
        <Text
          marginBottom={8}
          fontSize={15}
          fontWeight={700}
          lineHeight="22px"
          isBold
          color="#333333"
        >
          <FormattedMessage id="MODEL" />
        </Text>
        <Text
          marginBottom={20}
          fontSize={15}
          fontWeight={500}
          lineHeight="22px"
          color="#4F4F4F"
        >
          {model}, {storage}
        </Text>
        <EstimatedValue>
          <Text
            marginBottom={0}
            fontSize={14}
            fontWeight={600}
            lineHeight="21px"
            color="#333333"
          >
            <FormattedMessage id="ESTIMATED_VALUE" />
          </Text>
          <Text
            marginBottom={0}
            fontSize={28}
            fontWeight={600}
            lineHeight="42px"
            color="#333333"
          >
            <FormattedMessage
              id="ESTIMATED_VALUE_PRICE"
              values={{
                value: estimateValue,
                symbol: code === "EUR" ? "€" : "$",
              }}
            />
            {/* <Span>{code}</Span> */}
          </Text>
        </EstimatedValue>
      </Col>
      <Col span={16} style={{ marginBottom: 84 }}>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Text
            marginBottom={10}
            fontSize={26}
            fontWeight={700}
            lineHeight="39px"
            isBold
            color="#333333"
          >
            <FormattedMessage id="SHIPPING_INFO_TITLE" />
          </Text>
          <Text
            marginBottom={32}
            fontSize={16}
            fontWeight={400}
            lineHeight="24px"
            color="#4F4F4F"
          >
            <FormattedMessage id="SHIPPING_PAGE_TEXT" />
          </Text>
          <Row style={{ marginBottom: 40 }}>
            <CustomCol span={12}>
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
                    {...field}
                    error={errors.firstName}
                    width={isTablet ? "90%" : 289}
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
            </CustomCol>

            <CustomCol span={12}>
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
                    width={isTablet ? "90%" : 289}
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
            </CustomCol>

            <Col span={24}>
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
                    width={isTablet ? "95%" : "100%"}
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
                    width={isTablet ? "95%" : "100%"}
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
            </Col>

            <CustomCol span={12}>
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
                name="country"
                render={({ field }) => (
                  <CustomSelect
                    loading={loadingResource!.loadingCountries}
                    disabled={!countries || loadingResource!.loadingCountries}
                    {...field}
                    width={isTablet ? "90%" : 289}
                    showSearch
                    placeholder={
                      localization === Ilocale.EN
                        ? "Select Country"
                        : "Seleziona il stato"
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
                    {countries?.map((country: Country) => (
                      <Select.Option key={country.id} value={country.code}>
                        {country.name}
                      </Select.Option>
                    ))}
                  </CustomSelect>
                )}
                control={control}
                // defaultValue=""
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
            </CustomCol>

            <CustomCol span={12}>
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
                      loadingResource.loadingCountries
                    }
                    {...field}
                    width={isTablet ? "90%" : 289}
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
                // defaultValue=""
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
            </CustomCol>

            <CustomCol span={12}>
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
                  //   width={isTablet ? "90%" : 289}
                  //   showSearch
                  //   mode="tags"
                  //   placeholder={
                  //     localization === Ilocale.EN
                  //       ? "Enter City"
                  //       : "Entra in Città"
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
                    disabled={
                      !cities ||
                      loadingResource!.loadingCities ||
                      loadingResource!.loadingCountries
                    }
                    error={errors.city}
                    width={isTablet ? "90%" : 289}
                    placeholder={
                      localization === Ilocale.EN
                        ? "Enter City"
                        : "Entra in Città"
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
            </CustomCol>

            <CustomCol span={12}>
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
                rules={{ required: true }}
                render={({ field }) => (
                  <CustomInput
                    {...field}
                    error={errors.zip}
                    width={isTablet ? "90%" : 289}
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
            </CustomCol>

            <CustomCol span={12}>
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
                    width={isTablet ? "90%" : 289}
                    placeholder="Ex 0978 234589"
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
            </CustomCol>

            <CustomCol span={12}>
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
                    width={isTablet ? "90%" : 289}
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
            </CustomCol>
          </Row>
          <SubmitButton onClick={handlePreviousClick} color="#4964DF">
            <FormattedMessage id="PREVIOUS" />
          </SubmitButton>
          <SubmitButton type="submit" isbuttonenable={true} isnext={1}>
            <FormattedMessage id="SAVE_CONTINUE" />
          </SubmitButton>
        </Form>
      </Col>
    </RowDesktop>
  );
};

export default DesktopShippingInfo;
