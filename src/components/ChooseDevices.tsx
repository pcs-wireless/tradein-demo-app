import React, { FC, useEffect, useState } from "react";
import styled from "@emotion/styled";
import smartphone from "../assets/images/smartphone.svg";
import smartphoneWhite from "../assets/images/smartphone-white.svg";
import tablet from "../assets/images/tablet.svg";
import tabletWhite from "../assets/images/tablet-white.svg";
import laptop from "../assets/images/laptop.svg";
import laptopWhite from "../assets/images/laptop-white.svg";
import watch from "../assets/images/watch.svg";
import watchWhite from "../assets/images/watch-white.svg";
import accessDenied from "../assets/images/accessDenied.svg";
import {
  ROUTE_GET_QUOTE_LAPTOP,
  ROUTE_GET_QUOTE_PHONE,
  ROUTE_GET_QUOTE_WATCH,
  ROUTE_HOME,
} from "../routings/constants/routes";
import { actionNavigateTo } from "../routings/actionNavigator";
import { useDispatch } from "react-redux";
import { chooseDevice, setCountries } from "./itemSlice";
import { mq } from "../assets/mediaQueries";
import Loader from "../features/loader";
import {
  Phone,
  Tablet,
  Laptop,
  Wearable,
} from "../routings/constants/devicesNames";
import { FormattedMessage } from "react-intl";
import { GET_DEVICES } from "../services/query";
import { useQuery } from "@apollo/client";
import { getPartnerId } from "../utils";

const Container = styled("div")(
  mq({
    textAlign: "left",
    margin: "auto",
    width: [360, "auto", "90vw"],
    maxWidth: 808,
    padding: ["0 24px", "0 24px", 0],
  })
);

const DevicesContainer = styled("div")(
  ({ devicesLength }: { devicesLength: number }) =>
    mq({
      display: "grid",
      gridTemplateColumns: [
        `repeat(2, 156px)`,
        `repeat(${devicesLength}, auto)`,
        `repeat(${devicesLength}, 186px)`,
      ],
      gridTemplateRows: [155, 192, 201],
      justifyContent: "center",
      alignContent: "stretch",
      alignItems: "center",
      gridGap: [16, 20],
      marginTop: [35, 78],
      marginBottom: [130, 228],
    })
);

const DeviceOption = styled("div")(
  mq({
    border: "2px solid #E0E0E0",
    boxSizing: "border-box",
    boxShadow: "0px 2px 6px rgba(0, 0, 0, 0.08)",
    borderRadius: 8,
    width: [156, 186],
    height: [155, 201],
    display: "grid",
    alignContent: "space-evenly",
    justifyItems: "center",
    alignItems: "center",
    cursor: "pointer",
    ":hover": {
      border: "2px solid #4964DF",
      backgroundColor: "#4964DF",
      color: "#fff !important",
    },
  })
);

interface IText {
  fontSize: number;
  fontWeight: number;
  lineHeight: string;
  isBold?: boolean;
  color?: string;
  isClickable?: boolean;
  isCenter?: boolean;
  marginBottom?: number;
}

const Text = styled("div")(
  ({
    fontSize,
    fontWeight,
    lineHeight,
    marginBottom = 0,
    isBold,
    isClickable,
    isCenter,
    color = "#252525",
  }: IText) => ({
    fontSize,
    fontFamily: isBold ? "Poppins-Bold" : "Poppins",
    fontWeight,
    lineHeight,
    marginBottom,
    color,
    textAlign: isCenter ? "center" : "justify",
    cursor: isClickable ? "pointer" : "auto",
  })
);

const Title = styled("div")(
  mq({
    fontFamily: "Poppins-Bold",
    marginTop: [66, 129],
    fontSize: [20, 26],
    lineHeight: ["24px", "31px"],
    fontWeight: [600, "bold"],
    left: [16, 0],
  })
);

const DeviceIcon = styled("div")(
  ({
    src,
    iswhite,
    curr,
  }: {
    src: string;
    iswhite: boolean | number;
    curr: string;
  }) => ({
    height: 72,
    width: "100%",
    backgroundImage:
      iswhite && src === laptop && curr === laptop
        ? `url(${laptopWhite})`
        : iswhite && src === smartphone && curr === smartphone
        ? `url(${smartphoneWhite})`
        : iswhite && src === tablet && curr === tablet
        ? `url(${tabletWhite})`
        : iswhite && src === watch && curr === watch
        ? `url(${watchWhite})`
        : `url(${src})`,
    backgroundSize: "contain",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    ":hover": {
      color: "#fff",
    },
  })
);

const DevicesText = styled("div")({
  fontFamily: "Poppins",
  fontSize: 20,
  lineHeight: "23px",
  fontWeight: 500,
});

const ErrorContainer = styled("div")({
  width: "100%",
  textAlign: "center",
});

const ErrorIcon = styled("div")(
  mq({
    backgroundImage: `url(${accessDenied})`,
    width: [300, 600],
    height: [200, 400],
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    margin: "auto",
  })
);

const SubmitButton = styled("button")(
  mq({
    backgroundColor: "#4964DF",
    border: "1px solid #4964DF",
    pointerEvents: "auto",
    color: "#fff",
    width: ["100%", 206, 206],
    height: [40, 45, 45],
    borderRadius: 4,
    fontWeight: 600,
    fontsize: 14,
    lineHeight: "21px",
    fontFamily: "Poppins",
    margin: "auto",
    ":hover": {
      backgroundColor: "#fff",
      color: "#4964DF",
      border: "1px solid #4964DF",
    },
  })
);

const ChooseDevices: FC = () => {
  const { loading, error, data } = useQuery(GET_DEVICES, {
    variables: { partnerId: getPartnerId() },
    notifyOnNetworkStatusChange: true,
  });

  const dispatch = useDispatch();
  const [iswhite, setIswhite] = useState<boolean>(false);
  const [curr, setCurr] = useState<string>("");

  const handleSubmit = (name: any, id: any) => {
    dispatch(chooseDevice({ name, id }));

    if (name.indexOf(Phone) > -1)
      dispatch(actionNavigateTo(ROUTE_GET_QUOTE_PHONE));
    if (name.indexOf(Laptop) > -1)
      dispatch(actionNavigateTo(ROUTE_GET_QUOTE_LAPTOP));
    if (name.indexOf(Tablet) > -1)
      dispatch(actionNavigateTo(ROUTE_GET_QUOTE_PHONE));
    if (name.indexOf(Wearable) > -1)
      dispatch(actionNavigateTo(ROUTE_GET_QUOTE_WATCH));
  };

  useEffect(() => {
    if (!loading && data) {
      dispatch(
        setCountries({
          code: data?.partner?.countries[0]?.code,
          currency: data?.partner?.countries[0]?.currencies[0]?.code,
        })
      );
    }
  }, [loading, data]);

  if (error) {
    return (
      <ErrorContainer>
        <ErrorIcon />
        <Text
          fontSize={32}
          fontWeight={700}
          lineHeight="48px"
          marginBottom={12}
          isCenter
        >
          403
        </Text>
        <Text
          fontSize={15}
          fontWeight={400}
          lineHeight="22px"
          marginBottom={52}
          isCenter
        >
          <FormattedMessage id="403_TEXT" />
        </Text>
        <SubmitButton onClick={() => dispatch(actionNavigateTo(ROUTE_HOME))}>
          <FormattedMessage id="BACK_TO_HOME" />
        </SubmitButton>
      </ErrorContainer>
    );
  }

  return !loading ? (
    <Container>
      <Title>
        <FormattedMessage id="CHOOSE_DEVICE" />
      </Title>
      <DevicesContainer devicesLength={data.partner.devices.length}>
        {data.partner.devices.map(
          (item: { id: React.Key | null | undefined; category: string }) => {
            return (
              <DeviceOption
                key={item.id}
                onClick={() => handleSubmit(item.category, item.id)}
                onMouseEnter={() => {
                  setIswhite(true);
                  setCurr(
                    item.category.indexOf(Phone) > -1
                      ? smartphone
                      : item.category.indexOf(Tablet) > -1
                      ? tablet
                      : item.category.indexOf(Laptop) > -1
                      ? laptop
                      : watch
                  );
                }}
                onMouseLeave={() => {
                  setIswhite(false);
                  setCurr("");
                }}
              >
                <DeviceIcon
                  curr={curr}
                  iswhite={iswhite ? 1 : 0}
                  src={
                    item.category.indexOf(Phone) > -1
                      ? smartphone
                      : item.category.indexOf(Tablet) > -1
                      ? tablet
                      : item.category.indexOf(Laptop) > -1
                      ? laptop
                      : watch
                  }
                />
                <DevicesText>{item.category}</DevicesText>
              </DeviceOption>
            );
          }
        )}
      </DevicesContainer>
    </Container>
  ) : (
    <Loader />
  );
};

export default ChooseDevices;
