import styled from "@emotion/styled";
import { Col, Row } from "antd";
import offerAccepted from "../assets/images/acceptedOffer.svg";
import { mq } from "../assets/mediaQueries";
import { FormattedMessage } from "react-intl";

const Container = styled("div")(
  mq({
    margin: "auto",
    marginTop: [20, 20, 40],
    width: ["90vw", "90vw", 1200],
    padding: [24, 24, 0],
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
    width: [82, 82, 82],
    height: [82, 82, 82],
    position: ["initial", "initial", "absolute"],
    margin: ["auto", "auto", "none"],
    right: 20,
    backgroundImage: `url(${offerAccepted})`,
    backgroundSize: "contain",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "right",
    marginBottom: [36, 36, "auto"],
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
      textAlign: "left",
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

const OfferAccepted = () => {
  return (
    <Container>
      <RowMobile>
        <Col span={24}>
          <ImageCatalog />
          <Text
            fontSize={32}
            lineHeight="40px"
            fontWeight={700}
            marginBottom={12}
          >
            <FormattedMessage id="OFFER_ACCEPTED_TITLE" />
          </Text>
          <Text
            fontSize={16}
            lineHeight="24px"
            fontWeight={400}
            marginBottom={30}
            color="#4F4F4F"
          >
            <FormattedMessage id="OFFER_ACCEPTED_TEXT" />
          </Text>
          <Text
            fontSize={16}
            lineHeight="24px"
            fontWeight={400}
            marginBottom={30}
            color="#4F4F4F"
          >
            <FormattedMessage
              id="OFFER_ACCEPTED_TEXT_WITH_EMAIL"
              values={{
                email: (
                  <a href="mailto: PCSWirelessTradeIn@PCSWW.com">
                    <Span link={true}>PCSWirelessTradeIn@PCSWW.com</Span>
                  </a>
                ),
              }}
            />
          </Text>
        </Col>
      </RowMobile>
      <RowDesktop>
        <Col span={8}>
          <ImageCatalog />
        </Col>
        <Col span={10}>
          <Text
            fontSize={24}
            lineHeight="36px"
            fontWeight={500}
            marginBottom={12}
          >
            <FormattedMessage id="OFFER_ACCEPTED_TITLE" />
          </Text>
          <Text
            fontSize={16}
            lineHeight="24px"
            fontWeight={400}
            marginBottom={30}
            color="#4F4F4F"
          >
            <FormattedMessage id="OFFER_ACCEPTED_TEXT" />
          </Text>
          <Text
            fontSize={16}
            lineHeight="24px"
            fontWeight={400}
            marginBottom={30}
            color="#4F4F4F"
          >
            <FormattedMessage
              id="OFFER_ACCEPTED_TEXT_WITH_EMAIL"
              values={{
                email: (
                  <a href="mailto: PCSWirelessTradeIn@PCSWW.com">
                    <Span link={true}>PCSWirelessTradeIn@PCSWW.com</Span>
                  </a>
                ),
              }}
            />
          </Text>
        </Col>
      </RowDesktop>
    </Container>
  );
};

export default OfferAccepted;
