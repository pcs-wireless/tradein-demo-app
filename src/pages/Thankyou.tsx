import styled from "@emotion/styled";
import { Col, Row } from "antd";
import OpenEnvelop from "../assets/images/OpenEnvelop.svg";
import { actionNavigateTo } from "../routings/actionNavigator";
import { ROUTE_HOME, ROUTE_CHOOSE_DEVICES } from "../routings/constants/routes";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { resetInput } from "../components/itemSlice";
import { mq } from "../assets/mediaQueries";
import { FormattedMessage } from "react-intl";

const Container = styled("div")(
  mq({
    margin: "auto",
    marginTop: 40,
    width: ["100%", "100%", 1200],
    padding: ["0 24px", "0 24px", "auto"],
    maxWidth: "90vw",
  })
);

const RowMobile = styled(Row)(
  mq({
    display: ["block", "block", "none"],
  })
);

const RowDesktop = styled(Row)(
  mq({
    display: ["none", "none", "flex"],
  })
);

const ImageCatalog = styled("div")(
  mq({
    width: [198, 198, 399],
    height: [166, 166, 334],
    backgroundImage: `url(${OpenEnvelop})`,
    backgroundSize: "contain",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    margin: ["auto", "auto", "initial"],
    marginBottom: [40, 40, 0],
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
  display?: string;
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
    display,
  }: IText) =>
    mq({
      display: display,
      fontSize,
      fontFamily: isBold ? "Poppins-Bold" : "Poppins",
      fontWeight,
      lineHeight,
      color,
      textAlign: "left",
      marginBottom,
      marginTop,
      cursor: isClickable ? "pointer" : "auto",
    })
);

const Span = styled("span")({
  fontFamily: "Poppins",
  fontWeight: 600,
  fontSize: 16,
  lineHeight: "24px",
});

const SubmitButton = styled("button")(
  mq({
    backgroundColor: "#4964DF",
    color: "#fff",
    width: ["100%", "100%", 223],
    height: 45,
    borderRadius: 4,
    fontWeight: 600,
    fontsize: 14,
    lineHeight: "21px",
    fontFamily: "Poppins",
    marginBottom: [30, 30, 0],
    border: "none",
    ":hover": {
      backgroundColor: "#fff",
      color: "#4964DF",
      border: "1px solid #4964DF",
    },
  })
);

const TradeAnother = styled("button")(
  mq({
    backgroundColor: "#fff",
    border: "1px solid #fff",
    color: "#4964DF",
    width: ["100%", "100%", 223],
    height: 45,
    borderRadius: 4,
    fontWeight: 600,
    fontsize: 14,
    lineHeight: "21px",
    fontFamily: "Poppins",
    textDecoration: "underline",
    cursor: "pointer",
  })
);

const Thankyou = () => {
  const dispatch = useAppDispatch();
  const { tranid } = useAppSelector((state) => state.location.payload);
  const { email } = useAppSelector((state) => state.item.createdInput.customer);
  const resetCreatedTrade = (route: string) => {
    dispatch(resetInput());
    dispatch(actionNavigateTo(route));
  };

  return (
    <Container>
      <RowDesktop>
        <Col span={10}>
          <ImageCatalog />
        </Col>
        <Col span={14}>
          <Text
            fontSize={32}
            lineHeight="48px"
            fontWeight={700}
            marginBottom={12}
          >
            <FormattedMessage id="THANK_YOU" />
          </Text>
          <Text
            fontSize={20}
            lineHeight="28px"
            fontWeight={400}
            marginBottom={30}
            color="#4F4F4F"
          >
            <FormattedMessage id="YOUR_TRADE_IN_REQUEST" />
          </Text>
          <Text
            fontSize={16}
            lineHeight="24px"
            fontWeight={400}
            marginBottom={30}
            color="#4F4F4F"
          >
            <FormattedMessage
              id="YOUR_TRANSACTION_NO"
              values={{ transactionNo: <Span>{tranid}</Span> }}
            />
          </Text>
          <Text
            fontSize={16}
            lineHeight="24px"
            fontWeight={400}
            marginBottom={30}
            color="#4F4F4F"
          >
            <FormattedMessage
              id="EMAIL_CONFIRMATION_DESC"
              values={{ email: <Span>{email}</Span> }}
            />
          </Text>
          <Text
            fontSize={16}
            lineHeight="24px"
            fontWeight={400}
            marginBottom={30}
            color="#4F4F4F"
          >
            <FormattedMessage id="QUESTION" />
          </Text>
          <Text
            fontSize={16}
            lineHeight="24px"
            fontWeight={400}
            marginBottom={30}
            color="#4F4F4F"
          >
            <FormattedMessage
              id="EMAIL_US"
              values={{
                email: <Span>support@pcstradein.com</Span>,
                number: <Span>+657 908 908</Span>,
              }}
            />
          </Text>
          <SubmitButton onClick={() => resetCreatedTrade(ROUTE_HOME)}>
            <FormattedMessage id="BACK_TO_HOME" />
          </SubmitButton>
          <TradeAnother onClick={() => resetCreatedTrade(ROUTE_CHOOSE_DEVICES)}>
            <FormattedMessage id="TRADE_ANOTHER_DEVICE" />
          </TradeAnother>
        </Col>
      </RowDesktop>
      <RowMobile>
        <ImageCatalog />
        <Col span={24}>
          <Text
            fontSize={32}
            lineHeight="40px"
            fontWeight={700}
            marginBottom={15}
          >
            <FormattedMessage id="THANK_YOU" />
          </Text>
          <Text
            fontSize={20}
            lineHeight="28px"
            fontWeight={400}
            marginBottom={30}
            color="#4F4F4F"
          >
            <FormattedMessage id="YOUR_TRADE_IN_REQUEST" />
          </Text>
          <Text
            fontSize={16}
            lineHeight="24px"
            fontWeight={400}
            marginBottom={30}
            color="#4F4F4F"
          >
            <FormattedMessage
              id="YOUR_TRANSACTION_NO"
              values={{ transactionNo: <Span>{tranid}</Span> }}
            />
          </Text>
          <Text
            fontSize={16}
            lineHeight="24px"
            fontWeight={400}
            marginBottom={30}
            color="#4F4F4F"
            display="grid"
          >
            <FormattedMessage
              id="EMAIL_CONFIRMATION_DESC"
              values={{ email: <Span>{email}</Span> }}
            />
          </Text>
          <Text
            fontSize={16}
            lineHeight="24px"
            fontWeight={400}
            marginBottom={30}
            color="#4F4F4F"
          >
            <FormattedMessage id="QUESTION" />
          </Text>
          <Text
            fontSize={16}
            lineHeight="24px"
            fontWeight={400}
            marginBottom={30}
            color="#4F4F4F"
          >
            <FormattedMessage
              id="EMAIL_US"
              values={{
                email: <Span>support@pcstradein.com</Span>,
                number: <Span>+657 908 908</Span>,
              }}
            />
          </Text>
          <SubmitButton onClick={() => resetCreatedTrade(ROUTE_HOME)}>
            <FormattedMessage id="BACK_TO_HOME" />
          </SubmitButton>
          <TradeAnother onClick={() => resetCreatedTrade(ROUTE_CHOOSE_DEVICES)}>
            <FormattedMessage id="TRADE_ANOTHER_DEVICE" />
          </TradeAnother>
        </Col>
      </RowMobile>
    </Container>
  );
};

export default Thankyou;
