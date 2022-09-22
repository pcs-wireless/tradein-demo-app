import { useState, FC, useEffect, Fragment } from "react";
import { Row, Col, Checkbox, Input, Modal, Button } from "antd";
import styled from "@emotion/styled";
import { useAppSelector, useAppDispatch } from "../app/hooks";
import { actionNavigateTo } from "../routings/actionNavigator";
import { ROUTES_THANKYOU_PAGE, ROUTE_HOME } from "../routings/constants/routes";
import { resetInput } from "./itemSlice";
import { CONFIRM_TRADE } from "../services/query";
import { useMutation } from "@apollo/client";
import { mq } from "../assets/mediaQueries";
import { FormattedMessage } from "react-intl";
import dateFormat from "dateformat";
import ServerError from "../assets/images/ServerError.svg";
import Loader from "../features/loader";
import CellPhone from "../assets/images/CellPhone.svg";
import laptop from "../assets/images/laptop.svg";
import watch from "../assets/images/watch.svg";
import tablet from "../assets/images/tablet.svg";
import {
  Phone,
  Tablet,
  Laptop,
  Phones,
  Tablets,
  Laptops,
} from "../routings/constants/devicesNames";

const Container = styled("div")(
  mq({
    margin: "auto",
    marginTop: 40,
    minWidth: ["100%", "100%", 900],
    padding: "0 25px",
  })
);

const RowMobile = styled(Row)(
  mq({
    display: ["block", "none"],
  })
);

const RowDesktop = styled(Row)(
  mq({
    display: ["none", "block"],
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
      textAlign: [isClickable ? "center !important" : "left", "left"],
      marginBottom,
      marginTop,
      cursor: isClickable ? "pointer" : "auto",
    })
);

const CustomCheckbox = styled(Checkbox)(
  mq({
    marginRight: 12,
    ".ant-checkbox-checked .ant-checkbox-inner::after": {
      transform: "rotate(45deg) scale(2) translate(-22%, -41%) !important",
    },
    ".ant-checkbox-inner": {
      width: 24,
      height: 24,
    },
  })
);

interface ISpan {
  color?: string;
  fontSize: number;
  link?: boolean;
}
const Span = styled("span")(({ color, fontSize, link }: ISpan) => ({
  fontFamily: "Poppins",
  fontWeight: 400,
  fontSize,
  lineHeight: "21px",
  color,
  cursor: link ? "pointer" : "auto",
  a: {
    color,
  },
}));

interface IButton {
  color?: string;
  isnext?: boolean | string;
  isbuttonenable?: any;
  cancel?: any;
}

const SubmitButton = styled("button")(
  ({ color = "#fff", isnext, isbuttonenable, cancel }: IButton) =>
    mq({
      backgroundColor:
        isnext && isbuttonenable ? "#4964DF" : isnext ? "#C9C7C5" : "#fff",
      border:
        isnext && !isbuttonenable
          ? "#C9C7C5"
          : cancel
          ? "1px solid #4964DF"
          : "1px solid #4964DF",
      pointerEvents: !isbuttonenable && isnext ? "none" : "auto",
      color,
      cursor: "pointer",
      minWidth: 128,
      width: ["100%", "auto"],
      marginBottom: [16, 0],
      height: 40,
      borderRadius: 4,
      fontWeight: 600,
      fontsize: 14,
      lineHeight: "21px",
      fontFamily: "Poppins",
      marginRight: 20,
      padding: "0 16px",
      ".ant-btn:hover, .ant-btn:focus": {
        backgroundColor: "initial !important",
      },
      ":hover": {
        backgroundColor: "#fff",
        color: "#4964DF",
        border: "1px solid #4964DF",
      },
    })
);

interface IUnOrderedList {
  marginLeft?: number;
}

const UnOrderedList = styled("ul")(({ marginLeft = 0 }: IUnOrderedList) => ({
  marginLeft,
}));

interface List {
  marginBottom?: number;
  fontSize: number;
  lineHeight: string;
}

const List = styled("li")(
  ({ marginBottom = 0, fontSize, lineHeight }: List) => ({
    marginBottom,
    fontFamily: "Poppins",
    fontWeight: 400,
    fontSize,
    lineHeight,
  })
);

const CustomCol = styled(Col)(
  mq({
    margin: "auto",
    display: "flex",
    alignItems: ["normal", "center"],
    marginBottom: 32,
  })
);

interface IImage {
  device: string;
}
const ImageCatalog = styled("div")(({ device }: IImage) => ({
  width: 100,
  height: 100,
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
  backgroundPosition: "center",
}));

const Line = styled("div")({
  height: 1,
  width: "100%",
  backgroundColor: "#E0E0E0",
  marginBottom: 25,
});

const CheckBoxLabel = styled("div")(
  mq({
    display: "flex",
    alignItems: ["baseline", "start"],
    marginBottom: [30, 41],
  })
);

const RadioLabel = styled("div")(
  mq({
    display: "flex",
    alignItems: "flex-start",
    marginBottom: [20, 20],
  })
);

const CustomDiv = styled("div")(
  mq({
    display: "flex",
    flexDirection: "column",
    marginLeft: 10,
  })
);

const TradeInDetails = styled("div")(
  mq({
    display: "grid",
    gridTemplateColumns: ["auto", "auto auto"],
    gridColumnGap: [30, 40],
  })
);

const PopupButton = styled("button")(({ iscancel }: { iscancel?: any }) => ({
  width: 90,
  height: 32,
  borderRadius: 4,
  border: "1px solid #4964DF",
  color: iscancel ? "#ffffff" : "#4964DF",
  backgroundColor: iscancel ? "#4964DF" : "#ffffff",
  fontSize: 12,
  lineHeight: "18px",
  fontWeight: 600,
  margin: 5,
  cursor: "pointer",
  ":hover": {
    fontWeight: 700,
  },
}));

const ButtonContainer = styled("div")(
  mq({
    display: ["block", "flex"],
    alignItems: "center",
  })
);

const CustomModal = styled(Modal)({
  height: 138,
  textAlign: "center",
});

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

const ConfirmTrade: FC = () => {
  const dispatch = useAppDispatch();
  const [acceptTerms1, setAcceptTerms1] = useState<boolean>(false);
  const [acceptTerms2, setAcceptTerms2] = useState<boolean>(false);
  const [acceptTerms3, setAcceptTerms3] = useState<boolean>(false);
  const [acceptTerms4, setAcceptTerms4] = useState<boolean>(false);
  const { model, estimateValue, code, storage, color, device, createdInput } =
    useAppSelector<null | any>((state) => state.item);
  const [isAllTermsAccepted, setAllTermsAccepted] = useState(false);
  const [isTablet, setIsTablet] = useState(
    window.innerWidth > 768 && window.innerWidth < 992
  );
  const [modal, setModal] = useState<boolean>(false);
  const [
    ConfirmTradeIn,
    { data: tradeInResponse, loading: loadingTradeIn, error },
  ] = useMutation(CONFIRM_TRADE);

  const getSize = () => {
    setIsTablet(window.innerWidth > 768 && window.innerWidth < 992);
  };

  useEffect(() => {
    window.addEventListener("resize", getSize);
    return () => window.removeEventListener("resize", getSize);
  });

  const ConfrimTradeIn = () => {
    ConfirmTradeIn({
      variables: {
        createTradeInInput: {
          ...createdInput,
        },
      },
    });
  };

  useEffect(() => {
    if (!loadingTradeIn) {
      if (tradeInResponse?.createTradeIn?.success) {
        dispatch(
          actionNavigateTo(ROUTES_THANKYOU_PAGE, {
            tranid: tradeInResponse?.createTradeIn?.tradeIn?.id,
          })
        );
      }
    }
  }, [loadingTradeIn, tradeInResponse]);

  const resetCreatedTrade = (route: string) => {
    dispatch(resetInput());
    dispatch(actionNavigateTo(route));
    setModal(false);
  };

  const handleOpenModal = () => {
    setModal(!modal);
  };

  useEffect(() => {
    if (estimateValue >= 500) {
      if (acceptTerms1)
        if (acceptTerms2)
          if (acceptTerms3) if (acceptTerms4) setAllTermsAccepted(true);
    } else {
      if (acceptTerms4) setAllTermsAccepted(true);
    }
  }, [acceptTerms1, acceptTerms2, acceptTerms3, acceptTerms4]);

  if (loadingTradeIn) {
    return <Loader />;
  }

  if (
    error ||
    tradeInResponse?.createTradeIn?.success === false ||
    estimateValue === null
  ) {
    return (
      <ErrorContainer>
        <ErrorIcon />
        <Text
          fontSize={32}
          fontWeight={700}
          lineHeight="48px"
          marginBottom={12}
          isClickable
        >
          500
        </Text>
        <Text
          fontSize={18}
          fontWeight={600}
          lineHeight="22px"
          marginBottom={5}
          isClickable
        >
          <FormattedMessage id="INTERNAL_SERVER_ERROR" />
        </Text>
        <Text
          fontSize={14}
          fontWeight={400}
          lineHeight="18px"
          marginBottom={56}
          isClickable
        >
          <FormattedMessage id="INTERNAL_SERVER_ERROR_TEXT" />
        </Text>
        <SubmitButton
          isnext
          isbuttonenable
          onClick={() => dispatch(actionNavigateTo(ROUTE_HOME))}
        >
          <FormattedMessage id="BACK_TO_HOME" />
        </SubmitButton>
      </ErrorContainer>
    );
  }

  return (
    <Container>
      <Fragment>
        <RowMobile>
          <Col span={24}>
            {estimateValue >= 500 ? (
              <>
                <Text
                  marginBottom={30}
                  fontSize={26}
                  fontWeight={700}
                  isBold
                  lineHeight="39px"
                  color="#333333"
                >
                  <FormattedMessage id="TRADE_IN_DETAILS" />
                </Text>
                <TradeInDetails>
                  <div>
                    <Text
                      marginBottom={2}
                      fontSize={16}
                      fontWeight={400}
                      lineHeight="22px"
                      color="#495057"
                    >
                      <FormattedMessage id="DATE" />
                    </Text>
                    <Text
                      marginBottom={30}
                      fontSize={16}
                      fontWeight={600}
                      lineHeight="22px"
                      color="#212529"
                    >
                      {dateFormat(new Date(), "mmmm dS, yyyy")}
                    </Text>
                  </div>

                  <div>
                    <Text
                      marginBottom={2}
                      fontSize={16}
                      fontWeight={400}
                      lineHeight="22px"
                      color="#495057"
                    >
                      <FormattedMessage id="PCS_ADDRESS" />
                    </Text>
                    <Text
                      marginBottom={30}
                      fontSize={16}
                      fontWeight={600}
                      lineHeight="22px"
                      color="#212529"
                    >
                      11 Vreeland Road, Florham Park, New Jersey, USA 07932
                    </Text>
                  </div>

                  <div>
                    <Text
                      marginBottom={2}
                      fontSize={16}
                      fontWeight={400}
                      lineHeight="22px"
                      color="#495057"
                    >
                      <FormattedMessage id="CUSTOMER_NAME" />
                    </Text>
                    <Text
                      marginBottom={30}
                      fontSize={16}
                      fontWeight={600}
                      lineHeight="22px"
                      color="#212529"
                    >
                      {`${createdInput.customer.firstName} ${createdInput.customer.lastName}`}
                    </Text>
                  </div>

                  <div>
                    <Text
                      marginBottom={2}
                      fontSize={16}
                      fontWeight={400}
                      lineHeight="22px"
                      color="#495057"
                    >
                      <FormattedMessage id="CUSTOMER_ADDRESS" />
                    </Text>
                    <Text
                      marginBottom={30}
                      fontSize={16}
                      fontWeight={600}
                      lineHeight="22px"
                      color="#212529"
                    >
                      {`${createdInput.customer.addresses[0].address1}, ${createdInput.customer.addresses[0].stateOrProvince}`}
                    </Text>
                  </div>
                </TradeInDetails>
              </>
            ) : (
              <>
                <Text
                  marginBottom={10}
                  fontSize={26}
                  fontWeight={700}
                  isBold
                  lineHeight="39px"
                  color="#333333"
                >
                  <FormattedMessage id="CONFIRM_TRADE_TITLE" />
                </Text>
                <Text
                  marginBottom={24}
                  fontSize={16}
                  fontWeight={400}
                  lineHeight="24px"
                  color="#4F4F4F"
                >
                  <FormattedMessage id="CONFIRM_TRADE_TEXT" />
                </Text>
              </>
            )}
            <Text
              marginBottom={30}
              fontSize={18}
              fontWeight={600}
              isBold
              lineHeight="27px"
              color="#333333"
            >
              <FormattedMessage id="DEVICE_TO_TRADE" />
            </Text>
            <CustomCol>
              <Col span={10}>
                <ImageCatalog device={device} />
              </Col>
              <Col span={14}>
                <Text
                  fontSize={14}
                  fontWeight={600}
                  isBold
                  lineHeight="21px"
                  color="#4F4F4F"
                >
                  <FormattedMessage id="MODEL" />
                </Text>
                <Text
                  marginBottom={16}
                  fontSize={14}
                  fontWeight={400}
                  lineHeight="21px"
                  color="#4F4F4F"
                >
                  {model}, {storage}
                </Text>
                {estimateValue >= 500 ? (
                  <Col span={14}>
                    <Text
                      fontSize={14}
                      fontWeight={500}
                      isBold
                      lineHeight="21px"
                      color="#828282"
                    >
                      Quantity
                    </Text>
                    <Text
                      marginBottom={16}
                      fontSize={28}
                      fontWeight={600}
                      lineHeight="42px"
                      color="#333333"
                    >
                      1
                    </Text>
                  </Col>
                ) : (
                  ""
                )}
                <Text
                  fontSize={14}
                  fontWeight={500}
                  lineHeight="21px"
                  color="#828282"
                >
                  <FormattedMessage id="ESTIMATED_VALUE" />
                </Text>
                <Text
                  marginBottom={0}
                  fontSize={22}
                  fontWeight={600}
                  lineHeight="33px"
                  color="#333333"
                >
                  <FormattedMessage
                    id="ESTIMATED_VALUE_PRICE"
                    values={{
                      value: estimateValue,
                      symbol: code === "EUR" ? "€" : "$",
                    }}
                  />
                  {/* <Span fontSize={12} color="#000000">
                    {code}
                  </Span> */}
                </Text>
              </Col>
            </CustomCol>
            {estimateValue < 500 && (
              <>
                <Line />
                <Text
                  marginBottom={9}
                  fontSize={18}
                  fontWeight={600}
                  lineHeight="27px"
                  color="#333333"
                >
                  <FormattedMessage id="GAMESTOP_REDEEM" />
                </Text>
                <Text
                  marginBottom={30}
                  fontSize={16}
                  fontWeight={400}
                  lineHeight="24px"
                  color="#4F4F4F"
                >
                  <FormattedMessage id="GAMESTOP_REDEEMABLE" />
                </Text>
              </>
            )}
            {/* <Radio.Group className="confirm-trade-radio">
              <RadioLabel>
                <Radio value={1} />
                <CustomDiv>
                  <Text
                    marginBottom={2}
                    fontSize={16}
                    fontWeight={700}
                    lineHeight="24px"
                    color="#000000"
                  >
                    <FormattedMessage id="REDEEM_NON_GS" />
                  </Text>
                  <Text
                    marginBottom={2}
                    fontSize={16}
                    fontWeight={400}
                    lineHeight="24px"
                    color="#4F4F4F"
                  >
                    <FormattedMessage id="REDEEM_80" />
                  </Text>
                </CustomDiv>
              </RadioLabel>

              <RadioLabel>
                <Radio value={2} />
                <CustomDiv>
                  <Text
                    marginBottom={2}
                    fontSize={16}
                    fontWeight={700}
                    lineHeight="24px"
                    color="#000000"
                  >
                    <FormattedMessage id="REDEEM_GS" />
                  </Text>
                  <Text
                    marginBottom={2}
                    fontSize={16}
                    fontWeight={400}
                    lineHeight="24px"
                    color="#4F4F4F"
                  >
                    <FormattedMessage id="REDEEM_100" />
                  </Text>
                </CustomDiv>
              </RadioLabel>
            </Radio.Group> */}
            <Line />
            {/* <Text
              marginBottom={21}
              fontSize={16}
              fontWeight={400}
              lineHeight="24px"
              color="#4F4F4F"
            >
              <FormattedMessage id="VISIT" />{" "}
              <Span fontSize={16} color="#4964DF" link>
                <a href="#/faq" target="_blank">
                  <FormattedMessage id="SUPPORT" />
                </a>
              </Span>{" "}
              <FormattedMessage id="COMPLETE_TERMS" />{" "}
            </Text> */}
            {estimateValue >= 500 && (
              <CheckBoxLabel className="terms-condition">
                <CustomCheckbox
                  onClick={() => setAcceptTerms1(!acceptTerms1)}
                />
                <Text
                  fontSize={16}
                  fontWeight={400}
                  lineHeight="24px"
                  color="#4F4F4F"
                >
                  <FormattedMessage id="TERMS_AND_CONDITION_500_VALUE_1" />
                </Text>
              </CheckBoxLabel>
            )}
            {estimateValue >= 500 && (
              <CheckBoxLabel className="terms-condition">
                <CustomCheckbox
                  onClick={() => setAcceptTerms2(!acceptTerms2)}
                />
                <Text
                  fontSize={16}
                  fontWeight={400}
                  lineHeight="24px"
                  color="#4F4F4F"
                >
                  <FormattedMessage id="TERMS_AND_CONDITION_500_VALUE_2" />
                </Text>
              </CheckBoxLabel>
            )}
            {estimateValue >= 500 && (
              <CheckBoxLabel className="terms-condition">
                <CustomCheckbox
                  onClick={() => setAcceptTerms3(!acceptTerms3)}
                />
                <Text
                  fontSize={16}
                  fontWeight={400}
                  lineHeight="24px"
                  color="#4F4F4F"
                >
                  <FormattedMessage id="TERMS_AND_CONDITION_500_VALUE_3" />
                </Text>
              </CheckBoxLabel>
            )}
            <CheckBoxLabel className="terms-condition">
              <CustomCheckbox onClick={() => setAcceptTerms4(!acceptTerms4)} />
              <Text
                fontSize={16}
                fontWeight={400}
                lineHeight="24px"
                color="#4F4F4F"
              >
                {estimateValue >= 500 ? (
                  <FormattedMessage id="TERMS_AND_CONDITION_500_VALUE_4" />
                ) : (
                  <>
                    <FormattedMessage id="ACCEPT_TRADE" />{" "}
                    <Span fontSize={16} color="#4964DF" link>
                      <a href="#/termsandcondition" target="_blank">
                        <FormattedMessage id="TERMS_AND_CONDITION" />
                      </a>
                    </Span>
                    .
                  </>
                )}
              </Text>
            </CheckBoxLabel>
            <ButtonContainer>
              <SubmitButton
                onClick={() => setModal(true)}
                color="#4964DF"
                cancel={1}
              >
                <FormattedMessage id="CANCEL_TRADE" />
              </SubmitButton>
              <SubmitButton
                onClick={ConfrimTradeIn}
                isbuttonenable={isAllTermsAccepted ? 1 : 0}
                isnext="true"
              >
                {<FormattedMessage id="ACCEPT_TRADEIN" />}
              </SubmitButton>
              {/* <Text
                marginBottom={40}
                onClick={() => resetCreatedTrade(ROUTE_HOME)}
                fontSize={14}
                fontWeight={600}
                lineHeight="21px"
                color="#4964DF"
                isClickable
              >
                <FormattedMessage id="START_OVER" />
              </Text> */}
            </ButtonContainer>
          </Col>
        </RowMobile>
        <RowDesktop>
          <Col
            span={16}
            style={{ margin: "auto", maxWidth: isTablet ? "100%" : "auto" }}
          >
            {estimateValue >= 500 ? (
              <>
                <Text
                  marginBottom={40}
                  fontSize={26}
                  fontWeight={700}
                  isBold
                  lineHeight="39px"
                  color="#333333"
                >
                  <FormattedMessage id="TRADE_IN_DETAILS" />
                </Text>
                <TradeInDetails>
                  <div>
                    <Text
                      marginBottom={2}
                      fontSize={16}
                      fontWeight={400}
                      lineHeight="22px"
                      color="#495057"
                    >
                      <FormattedMessage id="DATE" />
                    </Text>
                    <Text
                      marginBottom={40}
                      fontSize={16}
                      fontWeight={600}
                      lineHeight="22px"
                      color="#212529"
                    >
                      {dateFormat(new Date(), "mmmm dS, yyyy")}
                    </Text>
                  </div>

                  <div>
                    <Text
                      marginBottom={2}
                      fontSize={16}
                      fontWeight={400}
                      lineHeight="22px"
                      color="#495057"
                    >
                      <FormattedMessage id="PCS_ADDRESS" />
                    </Text>
                    <Text
                      marginBottom={40}
                      fontSize={16}
                      fontWeight={600}
                      lineHeight="22px"
                      color="#212529"
                    >
                      11 Vreeland Road, Florham Park, New Jersey, USA 07932
                    </Text>
                  </div>

                  <div>
                    <Text
                      marginBottom={2}
                      fontSize={16}
                      fontWeight={400}
                      lineHeight="22px"
                      color="#495057"
                    >
                      <FormattedMessage id="CUSTOMER_NAME" />
                    </Text>
                    <Text
                      marginBottom={12}
                      fontSize={16}
                      fontWeight={600}
                      lineHeight="22px"
                      color="#212529"
                    >
                      {`${createdInput.customer.firstName} ${createdInput.customer.lastName}`}
                    </Text>
                  </div>

                  <div>
                    <Text
                      marginBottom={2}
                      fontSize={16}
                      fontWeight={400}
                      lineHeight="22px"
                      color="#495057"
                    >
                      <FormattedMessage id="CUSTOMER_ADDRESS" />
                    </Text>
                    <Text
                      marginBottom={2}
                      fontSize={16}
                      fontWeight={600}
                      lineHeight="22px"
                      color="#212529"
                    >
                      {`${createdInput.customer.addresses[0].address1}, ${createdInput.customer.addresses[0].stateOrProvince}`}
                    </Text>
                  </div>
                </TradeInDetails>
              </>
            ) : (
              <>
                <Text
                  marginBottom={10}
                  fontSize={26}
                  fontWeight={700}
                  isBold
                  lineHeight="39px"
                  color="#333333"
                >
                  <FormattedMessage id="CONFIRM_TRADE_TITLE" />
                </Text>
                <Text
                  marginBottom={24}
                  fontSize={16}
                  fontWeight={400}
                  lineHeight="24px"
                  color="#4F4F4F"
                >
                  <FormattedMessage id="CONFIRM_TRADE_TEXT" />
                </Text>
              </>
            )}
            <Text
              marginTop={45}
              marginBottom={29}
              fontSize={18}
              fontWeight={600}
              isBold
              lineHeight="27px"
              color="#333333"
            >
              <FormattedMessage id="DEVICE_TO_TRADE" />
            </Text>
            <CustomCol>
              <Col span={6} style={{ maxWidth: 112 }}>
                <ImageCatalog device={device} />
              </Col>
              <Col
                span={estimateValue >= 500 ? 9 : 13}
                style={{ minWidth: 422 }}
              >
                <Text
                  fontSize={14}
                  fontWeight={600}
                  isBold
                  lineHeight="21px"
                  color="#4F4F4F"
                >
                  <FormattedMessage id="MODEL" />
                </Text>
                <Text
                  fontSize={14}
                  fontWeight={400}
                  lineHeight="21px"
                  color="#4F4F4F"
                >
                  {model}, {storage}
                </Text>
                {/* <Text fontSize={14} fontWeight={400} lineHeight="21px" color="#4F4F4F">2020 M1 256GB</Text> */}
              </Col>
              {estimateValue >= 500 ? (
                <Col span={5}>
                  <Text
                    fontSize={14}
                    fontWeight={500}
                    isBold
                    lineHeight="21px"
                    color="#828282"
                  >
                    Quantity
                  </Text>
                  <Text
                    marginBottom={0}
                    fontSize={28}
                    fontWeight={600}
                    lineHeight="42px"
                    color="#333333"
                  >
                    1
                  </Text>
                </Col>
              ) : (
                ""
              )}
              <Col span={5}>
                <Text
                  fontSize={14}
                  fontWeight={500}
                  lineHeight="21px"
                  color="#828282"
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
                  {/* <Span fontSize={14} color="#000000">
                    {code}
                  </Span> */}
                </Text>
              </Col>
            </CustomCol>
            {estimateValue < 500 && (
              <>
                <Line />
                <Text
                  marginBottom={9}
                  fontSize={18}
                  fontWeight={600}
                  lineHeight="27px"
                  color="#333333"
                >
                  <FormattedMessage id="GAMESTOP_REDEEM" />
                </Text>
                <Text
                  marginBottom={30}
                  fontSize={16}
                  fontWeight={400}
                  lineHeight="24px"
                  color="#4F4F4F"
                >
                  <FormattedMessage id="GAMESTOP_REDEEMABLE" />
                </Text>
              </>
            )}
            {/*<Radio.Group className="confirm-trade-radio">
              <RadioLabel>
                <Radio value={1} />
                <CustomDiv>
                  <Text
                    marginBottom={2}
                    fontSize={16}
                    fontWeight={700}
                    lineHeight="24px"
                    color="#000000"
                  >
                    <FormattedMessage id="REDEEM_NON_GS" />
                  </Text>
                  <Text
                    marginBottom={2}
                    fontSize={16}
                    fontWeight={400}
                    lineHeight="24px"
                    color="#4F4F4F"
                  >
                    <FormattedMessage id="REDEEM_80" />
                  </Text>
                </CustomDiv>
              </RadioLabel>

              <RadioLabel>
                <Radio value={2} />
                <CustomDiv>
                  <Text
                    marginBottom={2}
                    fontSize={16}
                    fontWeight={700}
                    lineHeight="24px"
                    color="#000000"
                  >
                    <FormattedMessage id="REDEEM_GS" />
                  </Text>
                  <Text
                    marginBottom={2}
                    fontSize={16}
                    fontWeight={400}
                    lineHeight="24px"
                    color="#4F4F4F"
                  >
                    <FormattedMessage id="REDEEM_100" />
                  </Text>
                </CustomDiv>
              </RadioLabel>
            </Radio.Group> */}
            <Line />
            {/* <Text
              marginBottom={21}
              fontSize={16}
              fontWeight={400}
              lineHeight="24px"
              color="#4F4F4F"
            >
              <FormattedMessage id="VISIT" />{" "}
              <Span fontSize={16} color="#4964DF" link>
                <a href="#/faq" target="_blank">
                  <FormattedMessage id="SUPPORT" />
                </a>
              </Span>{" "}
              <FormattedMessage id="COMPLETE_TERMS" />{" "}
            </Text> */}
            {estimateValue >= 500 && (
              <CheckBoxLabel className="terms-condition">
                <CustomCheckbox
                  onClick={() => setAcceptTerms1(!acceptTerms1)}
                />
                <Text
                  fontSize={16}
                  fontWeight={400}
                  lineHeight="24px"
                  color="#4F4F4F"
                >
                  <FormattedMessage id="TERMS_AND_CONDITION_500_VALUE_1" />
                </Text>
              </CheckBoxLabel>
            )}
            {estimateValue >= 500 && (
              <CheckBoxLabel className="terms-condition">
                <CustomCheckbox
                  onClick={() => setAcceptTerms2(!acceptTerms2)}
                />
                <Text
                  fontSize={16}
                  fontWeight={400}
                  lineHeight="24px"
                  color="#4F4F4F"
                >
                  <FormattedMessage id="TERMS_AND_CONDITION_500_VALUE_2" />
                </Text>
              </CheckBoxLabel>
            )}
            {estimateValue >= 500 && (
              <CheckBoxLabel className="terms-condition">
                <CustomCheckbox
                  onClick={() => setAcceptTerms3(!acceptTerms3)}
                />
                <Text
                  fontSize={16}
                  fontWeight={400}
                  lineHeight="24px"
                  color="#4F4F4F"
                >
                  <FormattedMessage id="TERMS_AND_CONDITION_500_VALUE_3" />
                </Text>
              </CheckBoxLabel>
            )}
            <CheckBoxLabel className="terms-condition">
              <CustomCheckbox onClick={() => setAcceptTerms4(!acceptTerms4)} />
              <Text
                fontSize={16}
                fontWeight={400}
                lineHeight="24px"
                color="#4F4F4F"
              >
                {estimateValue >= 500 ? (
                  <FormattedMessage id="TERMS_AND_CONDITION_500_VALUE_4" />
                ) : (
                  <>
                    <FormattedMessage id="ACCEPT_TRADE" />{" "}
                    <Span fontSize={16} color="#4964DF" link>
                      <a href="#/termsandcondition" target="_blank">
                        <FormattedMessage id="TERMS_AND_CONDITION" />
                      </a>
                    </Span>
                    .
                  </>
                )}
              </Text>
            </CheckBoxLabel>
            <ButtonContainer>
              <SubmitButton
                onClick={() => setModal(true)}
                color="#4964DF"
                cancel={1}
              >
                <FormattedMessage id="CANCEL_TRADE" />
              </SubmitButton>
              <SubmitButton
                onClick={ConfrimTradeIn}
                isbuttonenable={isAllTermsAccepted ? 1 : 0}
                isnext="true"
              >
                {<FormattedMessage id="ACCEPT_TRADEIN" />}
              </SubmitButton>
              {/* <Text
                onClick={() => resetCreatedTrade(ROUTE_HOME)}
                fontSize={14}
                fontWeight={600}
                lineHeight="21px"
                color="#4964DF"
                isClickable
              >
                <FormattedMessage id="START_OVER" />
              </Text> */}
            </ButtonContainer>
          </Col>
        </RowDesktop>
      </Fragment>
      <CustomModal
        className="cancel"
        visible={modal}
        onOk={handleOpenModal}
        onCancel={handleOpenModal}
        footer={null}
        width={289}
      >
        <Text
          fontSize={14}
          lineHeight="20px"
          fontWeight={400}
          style={{ textAlign: "center" }}
          marginBottom={25}
          color="#000000"
        >
          <FormattedMessage id="CONTINUE_TRADE_QUESTION" />
        </Text>
        <PopupButton onClick={() => resetCreatedTrade(ROUTE_HOME)}>
          <FormattedMessage id="YES" />
        </PopupButton>
        <PopupButton iscancel onClick={() => setModal(false)}>
          <FormattedMessage id="NO" />
        </PopupButton>
      </CustomModal>
    </Container>
  );
};

export default ConfirmTrade;
