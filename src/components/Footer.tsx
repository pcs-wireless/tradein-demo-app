import { FC, useState, useEffect } from "react";
import styled from "@emotion/styled";
import { Layout } from "antd";
import {
  ROUTE_PHONE_DEVICE_CONDITION,
  ROUTE_WATCH_DEVICE_CONDITION,
  ROUTE_TABLET_DEVICE_CONDITION,
  ROUTES_DEVICE_CONDITION,
  ROUTES_SHIPPING_INFO,
  ROUTE_LOGIN,
  ROUTE_SIGNUP,
} from "../routings/constants/routes";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { mq } from "../assets/mediaQueries";
import { useLocalization } from "../providers/IntlProvider";
import { GetFooterData } from "../services/query";
import { useQuery } from "react-query";

const { Footer } = Layout;

const Container = styled(Footer)(
  ({
    hasbottompadding,
    hasestimate,
    display,
  }: {
    hasbottompadding: any | null;
    hasestimate: any | null;
    display: boolean | number;
  }) =>
    mq({
      display: display ? "flex" : "none",
      alignItems: "center",
      background: "#fff",
      backgroundRepeat: "no-repeat",
      padding: hasbottompadding
        ? ["26px 24px 237px", 0]
        : hasestimate
        ? ["26px 24px 140px", "auto"]
        : ["26px 24px 50px", "auto"],
      height: [36, 113],
      textAlign: "center",
      margin: "auto",
    })
);

const Text = styled("div")(
  mq({
    fontFamily: "Poppins",
    fontWeight: 400,
    fontSize: [12, "inherit"],
    lineHeight: ["18px", "19.5px"],
  })
);

const Span = styled("span")({
  fontFamily: "Poppins",
  fontWeight: 400,
  fontSize: [12, "inherit"],
  lineHeight: ["18px", "19.5px"],
  cursor: "pointer",
  color: "#4964DF",
});

const FooterPage: FC = () => {
  const { estimateValue } = useAppSelector((state) => state.item);
  const [display, setDisplay] = useState<boolean>(true);
  const { type } = useAppSelector((state) => state.location);
  const [locale] = useLocalization();
  const { isLoading, data, refetch } = useQuery("FooterData", () =>
    GetFooterData({
      locale: locale,
    })
  );

  const inCludedRoutes = [
    ROUTE_PHONE_DEVICE_CONDITION,
    ROUTE_WATCH_DEVICE_CONDITION,
    ROUTE_TABLET_DEVICE_CONDITION,
    ROUTES_DEVICE_CONDITION,
    ROUTES_SHIPPING_INFO,
  ];

  useEffect(() => {
    refetch();
  }, [locale, isLoading]);

  useEffect(() => {
    if (type === ROUTE_LOGIN || type === ROUTE_SIGNUP) {
      setDisplay(false);
    } else {
      setDisplay(true);
    }
  }, [type]);

  const checkRouteForPaddingBottom = () => {
    return inCludedRoutes.includes(type);
  };

  return !isLoading ? (
    <Container
      display={display ? 1 : 0}
      hasbottompadding={estimateValue && checkRouteForPaddingBottom() ? 1 : 0}
      hasestimate={checkRouteForPaddingBottom() ? 1 : 0}
    >
      <Text>
        {data?.data[0]?.attributes?.copyright}
        <Span
          onClick={() =>
            window.open(window.location.origin + "/#/privacypolicy")
          }
        >
          {data?.data[0]?.attributes?.privacyPolicy}
        </Span>{" "}
        {data?.data[0]?.attributes?.conjunction}{" "}
        <Span
          onClick={() =>
            window.open(window.location.origin + "/#/termsandcondition")
          }
        >
          {data?.data[0]?.attributes?.termsAndConditions}
        </Span>
      </Text>
    </Container>
  ) : (
    <div />
  );
};

export default FooterPage;
