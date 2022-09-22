import { useState, FC, useEffect } from "react";
import { Row, Col, Select } from "antd";
import styled from "@emotion/styled";
import { useForm } from "react-hook-form";
import { useAppSelector, useAppDispatch } from "../app/hooks";
import {
  ROUTES_CONFIRM_TRADE,
  ROUTES_DEVICE_CONDITION,
  ROUTE_HOME,
} from "../routings/constants/routes";
import { actionNavigateTo } from "../routings/actionNavigator";
import { updateShippingInfo, setCreatedInput } from "./itemSlice";
import { mq } from "../assets/mediaQueries";
import {
  GET_CITIES,
  GET_DEVICE_SKU,
  GET_PARTNER,
  GET_STATE_OR_PROVINCES,
} from "../services/query";
import { useLazyQuery, useQuery } from "@apollo/client";
import { getPartnerId } from "../utils";
import ServerError from "../assets/images/ServerError.svg";
import MobileShippingInfo from "./MobileShippingInfo";
import DesktopShippingInfo from "./DesktopShippingInfo";
import { FormattedMessage } from "react-intl";

const Container = styled("div")(
  mq({
    margin: "auto",
    marginTop: 40,
    maxWidth: 1000,
    width: ["90vw", "auto"],
    padding: ["0 24px", "0 24px", 0],
  })
);

const ErrorContainer = styled("div")({
  width: "100%",
  textAlign: "center",
});

const ErrorIcon = styled("div")(
  mq({
    backgroundImage: `url(${ServerError})`,
    width: [300, 600],
    height: [200, 400],
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    margin: "auto",
  })
);

export const RowDesktop = styled(Row)(
  mq({
    display: ["none", "flex"],
  })
);

export interface IText {
  fontSize: number;
  fontWeight: number;
  lineHeight: string;
  isBold?: boolean;
  color?: string;
  marginBottom?: number;
  marginTop?: number;
  isClickable?: boolean;
  isCenter?: boolean;
}

export const Text = styled("div")(
  ({
    fontSize,
    fontWeight,
    lineHeight,
    isBold,
    marginBottom = 0,
    marginTop = 0,
    color = "#252525",
    isClickable,
    isCenter,
  }: IText) => ({
    fontSize,
    fontFamily: isBold ? "Poppins-Bold" : "Poppins",
    fontWeight,
    lineHeight,
    color,
    textAlign: isCenter ? "center" : "left",
    marginBottom,
    marginTop,
    cursor: isClickable ? "pointer" : "auto",
  })
);

export const EstimatedValue = styled("div")({
  width: 151,
  height: 83,
  borderRadius: 4,
  border: "1px solid #2F80ED80",
  backgroundColor: "rgba(47, 128, 237, 0.08)",
  padding: 10,
});

export const Span = styled("span")({
  fontFamily: "Poppins",
  fontWeight: 400,
  fontSize: 14,
  lineHeight: "21px",
});

export interface IButton {
  color?: string;
  isnext?: number | string;
  isbuttonenable?: boolean | string;
}

const Form = styled("form")({});

export const SubmitButton = styled("button")(
  ({ color = "#fff", isnext, isbuttonenable }: IButton) =>
    mq({
      backgroundColor:
        isnext && isbuttonenable ? "#4964DF" : isnext ? "#C9C7C5" : "#fff",
      border: isnext && !isbuttonenable ? "#C9C7C5" : "1px solid #4964DF",
      pointerEvents: !isbuttonenable && isnext ? "none" : "auto",
      color,
      width: ["100%", "auto"],
      minWidth: 128,
      height: [45, 40],
      padding: "0 30px",
      borderRadius: 4,
      fontWeight: 600,
      fontsize: 14,
      lineHeight: "21px",
      fontFamily: "Poppins",
      marginBottom: 16,
      marginRight: [0, 20],
      cursor: "pointer",
      ":hover": {
        backgroundColor: "#fff",
        color: "#4964DF",
        border: "1px solid #4964DF",
      },
    })
);

interface ICustomInput {
  width: number | any;
  error?: number | any;
}

export const CustomInput = styled("input")(({ width, error }: ICustomInput) =>
  mq({
    width,
    height: 45,
    fontSize: 14,
    fontWeight: 400,
    padding: 12,
    fontFamily: "Poppins",
    marginBottom: error ? 24 : [17, 20],
    border: error ? "1px solid #EB5757" : "1px solid #828282",
    borderRadius: 4,
    maxWidth: 598,
  })
);

export const CustomCol = styled(Col)(
  mq({
    maxWidth: ["100%", 309],
  })
);

interface ICustomSelect {
  width: number | string;
  error?: number | any;
}

export const CustomSelect = styled(Select)(
  ({ width, error }: ICustomSelect) => ({
    width,
    height: 45,
    marginBottom: 20,
    maxWidth: 598,
    border: error ? "1px solid #EB5757" : "none",
    ".ant-select-selector": {
      height: "45px !important",
      display: "flex",
      alignItems: "center",
    },
    ".ant-select-selection-search-input": {
      height: "45px !important",
    },
  })
);

export const ErrorLabel = styled("div")(
  ({ error }: { error: any | number }) => ({
    display: error ? "flex" : "none",
    alignItems: "center",
    marginBottom: 24,
  })
);

export type Country = { id: string; code: string; name: String };
export type State = { id: string; name: String };
export type City = { id: string; name: String };

export interface IFormInput {
  firstName: string;
  lastName: string;
  apartment: string;
  email: string;
  street1: string;
  city: string;
  state: string;
  zip: string;
  phone: string;
  country: string;
}

const ShippingInfo: FC = () => {
  const dispatch = useAppDispatch();

  const { control, formState, handleSubmit, watch } = useForm<IFormInput>();

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [isTablet, setIsTablet] = useState(
    window.innerWidth > 768 && window.innerWidth < 992
  );

  const {
    deviceId,
    manufacturerId,
    modelId,
    storageId,
    carrierId,
    colorId,
    countries: { code: countryCode, currency },
  } = useAppSelector((state) => state.item.ids);

  const {
    loading: loadingSku,
    data: sku,
    error: errorSku,
  } = useQuery(GET_DEVICE_SKU, {
    variables: {
      deviceId,
      manufacturerId,
      modelId,
      storageId,
      carrierId,
      colorId,
    },
    notifyOnNetworkStatusChange: true,
  });

  const {
    loading: loadingCountries,
    data: partnerData,
    error: errorPartner,
  } = useQuery(GET_PARTNER, {
    variables: {
      partnerId: getPartnerId(),
    },
    notifyOnNetworkStatusChange: true,
  });

  const [
    queryStates,
    { loading: loadingStates, data: statesData, error: statesError },
  ] = useLazyQuery(GET_STATE_OR_PROVINCES, {
    notifyOnNetworkStatusChange: true,
  });

  const [
    queryCities,
    { loading: loadingCities, data: citiesData, error: citiesError },
  ] = useLazyQuery(GET_CITIES, {
    notifyOnNetworkStatusChange: true,
  });

  useEffect(() => {
    const subscription = watch((value) => {
      const { country } = value;
      if (!loadingCountries && partnerData && country) {
        const selectedCountry = partnerData.partner.countries.find(
          (countryItem: Country) => countryItem.code === country
        );
        queryStates({
          variables: {
            pageSize: 1000,
            countryId: parseFloat(selectedCountry.id),
          },
        });

        queryCities({
          variables: {
            pageSize: 1000,
            countryId: parseFloat(selectedCountry.id),
          },
        });
      }
    });
    return () => subscription.unsubscribe();
  }, [loadingCountries, partnerData, queryStates, watch, queryCities]);

  const onSubmit = (data: IFormInput) => {
    if (data) {
      dispatch(
        setCreatedInput({
          ...data,
          partnerId: getPartnerId(),
          currency: currency,
          countryCode: countryCode,
        })
      );
      VerifyShippingAdrress();
    }
  };

  const getSize = () => {
    setIsMobile(window.innerWidth <= 768);
    setIsTablet(window.innerWidth > 768 && window.innerWidth < 992);
  };

  useEffect(() => {
    window.addEventListener("resize", getSize);
    return () => window.removeEventListener("resize", getSize);
  });

  const handlePreviousClick = () => {
    dispatch(actionNavigateTo(ROUTES_DEVICE_CONDITION));
  };

  const VerifyShippingAdrress = () => {
    dispatch(updateShippingInfo(true));
    dispatch(actionNavigateTo(ROUTES_CONFIRM_TRADE));
  };

  if (errorSku || errorPartner || statesError || citiesError) {
    return (
      <ErrorContainer>
        <ErrorIcon />
        <Text
          fontSize={32}
          fontWeight={700}
          lineHeight="48px"
          marginBottom={12}
          isClickable
          isCenter
        >
          500
        </Text>
        <Text
          fontSize={18}
          fontWeight={600}
          lineHeight="22px"
          marginBottom={5}
          isClickable
          isCenter
        >
          <FormattedMessage id="INTERNAL_SERVER_ERROR" />
        </Text>
        <Text
          fontSize={14}
          fontWeight={400}
          lineHeight="18px"
          marginBottom={56}
          isClickable
          isCenter
        >
          <FormattedMessage id="INTERNAL_SERVER_ERROR_TEXT" />
        </Text>
        <SubmitButton
          isnext={1}
          isbuttonenable
          onClick={() => dispatch(actionNavigateTo(ROUTE_HOME))}
        >
          <FormattedMessage id="BACK_TO_HOME" />
        </SubmitButton>
      </ErrorContainer>
    );
  }

  if (!loadingSku) {
    return (
      <Container>
        <>
          {isMobile ? (
            <MobileShippingInfo
              formState={formState}
              control={control}
              handleSubmit={handleSubmit}
              onSubmit={onSubmit}
              loadingResource={{
                loadingSku,
                loadingCountries,
                loadingCities,
                loadingStates,
              }}
              cities={citiesData?.cities?.data}
              countries={partnerData?.partner.countries}
              states={statesData?.statesOrProvinces.data}
              handlePreviousClick={() => handlePreviousClick()}
              sku={sku?.productNearestMatch?.product?.sku}
            />
          ) : (
            <DesktopShippingInfo
              formState={formState}
              control={control}
              handleSubmit={handleSubmit}
              onSubmit={onSubmit}
              loadingResource={{
                loadingSku,
                loadingCountries,
                loadingCities,
                loadingStates,
              }}
              cities={citiesData?.cities?.data}
              countries={partnerData?.partner.countries}
              states={statesData?.statesOrProvinces.data}
              handlePreviousClick={() => handlePreviousClick()}
              sku={sku?.productNearestMatch?.product?.sku}
              isTablet={isTablet}
            />
          )}
        </>
      </Container>
    );
  }
  return null;
};

export default ShippingInfo;
