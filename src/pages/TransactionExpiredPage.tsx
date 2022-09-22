import styled from "@emotion/styled";
import { Col, Row } from "antd";
import transactionExpired from "../assets/images/transactionExpired.svg";
import { actionNavigateTo } from "../routings/actionNavigator";
import { ROUTE_HOME } from "../routings/constants/routes";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { mq } from "../assets/mediaQueries";

const Container = styled("div")(
  mq({
    margin: "auto",
    marginTop: [20, 40],
    width: ["100vw", 1200],
    padding: [24, 0],
  })
);

const RowMobile = styled(Row)(
  mq({
    display: ["block", "none"],
  })
);

const RowDesktop = styled(Row)(
  mq({
    display: ["none", "flex"],
  })
);

const ImageCatalog = styled("div")(
  mq({
    width: [325, 600],
    height: [217, 400],
    backgroundImage: `url(${transactionExpired})`,
    backgroundSize: "contain",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    margin: "auto",
    marginBottom: [36, "auto"],
  })
);

interface IText {
  fontSize: number;
  fontWeight: number;
  lineHeight: string;
  isBold?: boolean;
  color?: string;
  marginBottom?: number;
  marginTop?: number;
  isClickable?: boolean;
}

const Text = styled("div")(
  ({
    fontSize,
    fontWeight,
    lineHeight,
    isBold,
    marginBottom = 0,
    marginTop = 0,
    color = "#252525",
    isClickable,
  }: IText) =>
    mq({
      fontSize,
      fontFamily: isBold ? "Poppins-Bold" : "Poppins",
      fontWeight,
      lineHeight,
      color,
      textAlign: ["left", "center"],
      marginBottom,
      marginTop,
      cursor: isClickable ? "pointer" : "auto",
    })
);

const Span = styled("span")(({ link }: { link: boolean }) => ({
  fontFamily: "Poppins",
  fontWeight: 600,
  fontSize: 16,
  lineHeight: "24px",
  color: link ? "#4964DF" : "#4F4F4F",
}));

const SubmitButton = styled("button")(
  mq({
    backgroundColor: "#4964DF",
    color: "#fff",
    width: ["100%", 206],
    height: 45,
    borderRadius: 4,
    fontWeight: 600,
    fontsize: 14,
    lineHeight: "21px",
    fontFamily: "Poppins",
    border: "none",
    ":hover": {
      backgroundColor: "#fff",
      color: "#4964DF",
      border: "1px solid #4964DF",
    },
  })
);

const CustomCol = styled(Col)({
  margin: "auto",
  textAlign: "center",
});

const TransactionExpired = () => {
  const dispatch = useAppDispatch();
  return (
    <Container>
      <RowMobile>
        <CustomCol span={24}>
          <ImageCatalog />
          <Text
            fontSize={32}
            lineHeight="48px"
            fontWeight={700}
            marginBottom={12}
          >
            Oh Sorry!
          </Text>
          <Text
            fontSize={16}
            lineHeight="24px"
            fontWeight={400}
            color="#4F4F4F"
          >
            Your transaction has expired.
          </Text>
          <Text
            fontSize={16}
            lineHeight="24px"
            fontWeight={400}
            marginBottom={30}
            color="#4F4F4F"
          >
            If you wish to trade-in again click the button below
          </Text>
          <SubmitButton onClick={() => dispatch(actionNavigateTo(ROUTE_HOME))}>
            Trade-In Again
          </SubmitButton>
          <Text
            fontSize={16}
            lineHeight="24px"
            fontWeight={400}
            marginTop={30}
            color="#4F4F4F"
          >
            Questions?
          </Text>
          <Text
            fontSize={16}
            lineHeight="24px"
            fontWeight={400}
            marginBottom={30}
            color="#4F4F4F"
          >
            You may email us at{" "}
            <a href="mailto: support@pcstradein.com">
              <Span link={true}>support@pcstradein.com</Span>
            </a>{" "}
            or contact us thru this number{" "}
            <a href="tel: +657 908 908">
              <Span link={false}>+657 908 908</Span>
            </a>
          </Text>
        </CustomCol>
      </RowMobile>
      <RowDesktop>
        <CustomCol span={15}>
          <ImageCatalog />
          <Text
            fontSize={32}
            lineHeight="48px"
            fontWeight={700}
            marginBottom={12}
          >
            Oh Sorry!
          </Text>
          <Text
            fontSize={16}
            lineHeight="24px"
            fontWeight={400}
            color="#4F4F4F"
          >
            Your transaction has expired.
          </Text>
          <Text
            fontSize={16}
            lineHeight="24px"
            fontWeight={400}
            marginBottom={30}
            color="#4F4F4F"
          >
            If you wish to trade-in again click the button below
          </Text>
          <SubmitButton onClick={() => dispatch(actionNavigateTo(ROUTE_HOME))}>
            Trade-In Again
          </SubmitButton>
          <Text
            fontSize={16}
            lineHeight="24px"
            fontWeight={400}
            marginTop={30}
            color="#4F4F4F"
          >
            Questions?
          </Text>
          <Text
            fontSize={16}
            lineHeight="24px"
            fontWeight={400}
            marginBottom={30}
            color="#4F4F4F"
          >
            You may email us at{" "}
            <a href="mailto: support@pcstradein.com">
              <Span link={true}>support@pcstradein.com</Span>
            </a>{" "}
            or contact us thru this number{" "}
            <a href="tel: +657 908 908">
              <Span link={false}>+657 908 908</Span>
            </a>
          </Text>
        </CustomCol>
      </RowDesktop>
    </Container>
  );
};

export default TransactionExpired;
