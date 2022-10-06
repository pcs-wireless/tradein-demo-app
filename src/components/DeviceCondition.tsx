import { useState, FC, useEffect, Fragment } from "react";
import { Row, Col, Modal } from "antd";
import styled from "@emotion/styled";
import { InfoCircleOutlined } from "@ant-design/icons";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import Loader from "../features/loader";
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
import ineligible from "../assets/images/ineligible.svg";
import {
  addEstimateValue,
  setSKU,
  resetDeviceCondition,
  resetEstimateValue,
} from "./itemSlice";
import { actionNavigateTo } from "../routings/actionNavigator";
import {
  ROUTES_SHIPPING_INFO,
  ROUTE_GET_QUOTE_LAPTOP,
  ROUTE_GET_QUOTE_WATCH,
  ROUTE_GET_QUOTE_PHONE,
  ROUTE_HOME,
} from "../routings/constants/routes";
import {
  GET_DEVICE_SKU,
  GET_DEVICE_QUESTIONARES,
  GET_ESTIMATED_VALUE,
} from "../services/query";
import { mq } from "../assets/mediaQueries";
import MobileBottomDrawer from "../features/MobileBottomEstimateValue";
import CheckboxComponent from "../features/CheckBox";
import { useQuery, useMutation } from "@apollo/client";
import { FormattedMessage } from "react-intl";

import { Ilocale, useLocalization } from "../providers/IntlProvider";
import { getPartnerId } from "../utils";

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
    display: ["none", "flex"],
  })
);

interface IImageCatalog {
  device: string;
}

const ImageCatalog = styled("div")(({ device }: IImageCatalog) =>
  mq({
    width: [100, "auto"],
    height: [86, 124],
    marginBottom: 16,
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
  }: IText) => ({
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

const OptionContainer = styled("div")({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  width: 82,
  // paddingLeft: 4,
});

const YesNoContainer = styled("div")(
  mq({
    display: ["block", "flex"],
    alignItems: "center",
    justifyContent: "space-between",
    width: 110,
    marginBottom: [33, 0],
  })
);

const CustomInfoIcon = styled(InfoCircleOutlined)({
  marginLeft: 4,
});

const EstimatedValue = styled("div")({
  width: 150,
  height: 83,
  borderRadius: 4,
  border: "1px solid #2F80ED80",
  backgroundColor: "rgba(47, 128, 237, 0.08)",
  padding: 10,
});

const Span = styled("span")({
  fontFamily: "Poppins",
  fontWeight: 400,
  fontSize: [12, "inherit"],
  lineHeight: ["18px", "19.5px"],
  cursor: "pointer",
  color: "#4964DF",
});

interface IButton {
  color?: string;
  isnext?: boolean | string;
  isbuttonenable?: any | number;
  noMarginLeft?: boolean | string;
}

const SubmitButton = styled("button")(
  ({ color = "#fff", isnext, isbuttonenable, noMarginLeft }: IButton) =>
    mq({
      backgroundColor:
        isnext && isbuttonenable ? "#4964DF" : isnext ? "#C9C7C5" : "#fff",
      border: isnext && !isbuttonenable ? "#C9C7C5" : "1px solid #4964DF",
      pointerEvents: !isbuttonenable && isnext ? "none" : "auto",
      color,
      width: noMarginLeft ? ["100%", 206] : ["100%", 128],
      height: [44, 40],
      borderRadius: 4,
      fontWeight: 600,
      fontsize: 14,
      lineHeight: "21px",
      fontFamily: "Poppins",
      marginLeft: noMarginLeft ? 0 : [0, 20],
      marginBottom: 16,
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

interface IList {
  marginBottom?: number;
  fontSize: number;
  lineHeight: string;
}

const List = styled("li")(
  ({ marginBottom = 0, fontSize, lineHeight }: IList) => ({
    marginBottom,
    fontFamily: "Poppins",
    fontWeight: 400,
    fontSize,
    lineHeight,
    color: "#4F4F4F",
  })
);

const ErrorContainer = styled("div")(
  mq({
    width: "100%",
    display: ["block", "flex"],
    alignItems: "center",
    justifyContent: "center",
    margin: "40px 0",
  })
);

const ErrorIcon = styled("div")(
  mq({
    backgroundImage: `url(${ineligible})`,
    width: [300, 518],
    height: [256, 413],
    margin: ["40px 0", "auto"],
    display: ["block", "flex"],
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  })
);

const DeviceCondition: FC = () => {
  const dispatch = useAppDispatch();
  const [localization] = useLocalization();
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [modal, setModal] = useState<boolean>(false);
  const { model, storage, device, estimateValue } = useAppSelector<null | any>(
    (state) => state.item
  );
  const {
    deviceId,
    manufacturerId,
    modelId,
    storageId,
    carrierId,
    colorId,
    countries: { code, currency },
  } = useAppSelector((state) => state.item.ids);
  const [showCalculated, setShowCalculated] = useState<boolean>(false);
  const {
    loading: loadingSKU,
    data: sku,
    error: errorGettingSku,
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

  const [questionsLength, setQuestionsLength] = useState<number>(0);
  const {
    question1,
    question2,
    question3,
    question4,
    question5,
    question6,
    question7,
  } = useAppSelector((state) => state.item.deviceCondition.grade);
  const {
    partnerGrade1,
    partnerGrade2,
    partnerGrade3,
    partnerGrade4,
    partnerGrade5,
    partnerGrade6,
    partnerGrade7,
  } = useAppSelector((state) => state.item.deviceDiagnostic);

  const [
    GetEstimatedValue,
    {
      data: deviceValue,
      loading: loadingDeviceValue,
      error: errorEstimatingValue,
    },
  ] = useMutation(GET_ESTIMATED_VALUE);
  const { type: prevRoute } = useAppSelector((state) => state.location.prev);

  const getSize = () => {
    setIsMobile(window.innerWidth <= 768);
  };

  useEffect(() => {
    window.addEventListener("resize", getSize);
    return () => window.removeEventListener("resize", getSize);
  });

  const handleOpenModal = () => {
    setModal(!modal);
  };

  useEffect(() => {
    dispatch(setSKU({ sku: sku?.productNearestMatch?.product?.sku }));
  }, [sku]);

  const { loading, error, data } = useQuery(GET_DEVICE_QUESTIONARES, {
    variables: {
      deviceId: deviceId,
      partnerId: getPartnerId(),
    },
    notifyOnNetworkStatusChange: true,
  });

  const handlePreviousClick = () => {
    if (
      device === Phone ||
      device === Phones ||
      device === Tablet ||
      device === Tablets
    ) {
      dispatch(actionNavigateTo(ROUTE_GET_QUOTE_PHONE));
    } else if (device === Laptop) {
      dispatch(actionNavigateTo(ROUTE_GET_QUOTE_LAPTOP));
    } else {
      dispatch(actionNavigateTo(ROUTE_GET_QUOTE_WATCH));
    }
    if (deviceValue) {
      dispatch(
        addEstimateValue({
          estimateValue: deviceValue?.calculatePrice?.success
            ? deviceValue?.calculatePrice?.price?.value
            : 0,
          code: deviceValue?.calculatePrice?.success
            ? deviceValue?.calculatePrice?.price?.currency
            : "",
        })
      );
    }
  };

  const grades = [
    partnerGrade1,
    partnerGrade2,
    partnerGrade3,
    partnerGrade4,
    partnerGrade5,
    partnerGrade6,
    partnerGrade7,
  ];

  const collectedIds = grades.filter((grade) => grade !== null);

  useEffect(() => {
    if (estimateValue) {
      setShowCalculated(true);
      GetEstimatedValue({
        variables: {
          calculatePriceInput: {
            productId: sku?.productNearestMatch?.product?.id,
            country: code,
            currency: currency,
            partnerGradeIds: collectedIds,
          },
        },
      });
    }
  }, []);

  useEffect(() => {
    if (
      data &&
      questionsLength === collectedIds.length &&
      sku?.productNearestMatch?.product?.id
    ) {
      setShowCalculated(true);
      GetEstimatedValue({
        variables: {
          calculatePriceInput: {
            productId: sku?.productNearestMatch?.product?.id,
            country: code,
            currency: currency,
            partnerGradeIds: collectedIds,
          },
        },
      });
    }
  }, [
    question1,
    question2,
    question3,
    question4,
    question5,
    question6,
    question6,
    question7,
  ]);

  // useEffect(() => {
  //   if (
  //     showCalculated &&
  //     estimateValue !== null &&
  //     prevRoute !== ROUTES_SHIPPING_INFO
  //   ) {
  //     setShowCalculated(false);
  //     dispatch(resetDeviceCondition());
  //   }
  // }, [showCalculated]);

  useEffect(() => {
    data && setQuestionsLength(Object.keys(data?.questionnaires).length);
  }, [data]);

  if (loading) return <Loader />;

  if (
    error ||
    (!sku?.productNearestMatch?.success &&
      !sku?.productNearestMatch?.success &&
      !loadingSKU)
  ) {
    return (
      <ErrorContainer>
        <Col span={isMobile ? 24 : 14}>
          <ErrorIcon />
        </Col>
        <Col span={isMobile ? 24 : 10}>
          <Text
            fontSize={32}
            fontWeight={700}
            lineHeight="48px"
            marginBottom={12}
          >
            403
          </Text>
          <Text
            fontSize={14}
            fontWeight={400}
            lineHeight="22px"
            marginBottom={52}
          >
            {sku?.productNearestMatch?.message ||
              "Your device is ineligible for trade."}
          </Text>
          <SubmitButton
            noMarginLeft
            isnext
            isbuttonenable
            onClick={() => dispatch(actionNavigateTo(ROUTE_HOME))}
          >
            Back to Homepage
          </SubmitButton>
        </Col>
      </ErrorContainer>
    );
  }

  if (sku?.productNearestMatch?.success && !loadingSKU) {
    return (
      <Container>
        <Fragment>
          <RowMobile>
            <Col span={24}>
              {!loading &&
                data?.questionnaires?.map(
                  (
                    item: {
                      id: number;
                      question: [];
                    },
                    _index: any
                  ) => {
                    return (
                      <Col key={_index}>
                        {item.question?.map(
                          (
                            q: {
                              title: string;
                              subtitle: string;
                              list: [];
                              choices: [];
                              locale: string;
                            },
                            index: any
                          ) => {
                            return (
                              <Fragment key={index}>
                                <Text
                                  marginBottom={14}
                                  fontSize={15}
                                  fontWeight={600}
                                  lineHeight="22px"
                                  color="#333333"
                                >
                                  {localization === Ilocale.EN &&
                                    q.locale === "en" &&
                                    q.title}
                                  {localization === Ilocale.IT &&
                                    q.locale === "it" &&
                                    q.title}
                                </Text>
                                <Text
                                  marginBottom={14}
                                  fontSize={14}
                                  fontWeight={400}
                                  lineHeight="22px"
                                  color="#333333"
                                >
                                  {localization === Ilocale.EN &&
                                    q.locale === "en" &&
                                    q.subtitle}
                                  {localization === Ilocale.IT &&
                                    q.locale === "it" &&
                                    q.subtitle}
                                </Text>
                                <UnOrderedList>
                                  {localization === Ilocale.EN &&
                                    q.locale === "en" &&
                                    q?.list?.map((list, index) => {
                                      return (
                                        <List
                                          key={index}
                                          marginBottom={10}
                                          fontSize={14}
                                          lineHeight="22px"
                                        >
                                          {list}
                                        </List>
                                      );
                                    })}
                                  {localization === Ilocale.IT &&
                                    q.locale === "it" &&
                                    q?.list?.map((list, index) => {
                                      return (
                                        <List
                                          key={index}
                                          marginBottom={10}
                                          fontSize={14}
                                          lineHeight="22px"
                                        >
                                          {list}
                                        </List>
                                      );
                                    })}
                                </UnOrderedList>
                                {
                                  <YesNoContainer className="device-condition">
                                    {localization === Ilocale.EN &&
                                      q.locale === "en" &&
                                      q?.choices?.map(
                                        (
                                          choices: {
                                            yesOrNo: string;
                                            display: string;
                                          },
                                          index
                                        ) => {
                                          return (
                                            <div
                                              style={{ display: "grid" }}
                                              key={index}
                                            >
                                              <CheckboxComponent
                                                key={index}
                                                index={`${index}-${_index}`}
                                                partnerId={choices.yesOrNo}
                                                partnerName={choices.display}
                                                value={choices.display}
                                                deviceConditionId={item.id}
                                                deviceConditionGradeId={
                                                  choices.yesOrNo
                                                }
                                              />
                                            </div>
                                          );
                                        }
                                      )}
                                    {localization === Ilocale.IT &&
                                      q.locale === "it" &&
                                      q?.choices?.map(
                                        (
                                          choices: {
                                            yesOrNo: string;
                                            display: string;
                                          },
                                          index
                                        ) => {
                                          return (
                                            <div
                                              style={{ display: "grid" }}
                                              key={index}
                                            >
                                              <CheckboxComponent
                                                key={index}
                                                index={`${index}-${_index}`}
                                                partnerId={choices.yesOrNo}
                                                partnerName={choices.display}
                                                value={choices.display}
                                                deviceConditionId={item.id}
                                                deviceConditionGradeId={
                                                  choices.yesOrNo
                                                }
                                              />
                                            </div>
                                          );
                                        }
                                      )}
                                  </YesNoContainer>
                                }
                              </Fragment>
                            );
                          }
                        )}
                      </Col>
                    );
                  }
                )}
              <Text
                marginBottom={20}
                fontSize={14}
                fontWeight={500}
                lineHeight="22px"
                color="#333333"
              >
                <FormattedMessage id="NEED_ASSISTANCE" />{" "}
                <Span
                  onClick={() => window.open(window.location.origin + "/#/faq")}
                >
                  <FormattedMessage id="CLICK_HERE" />
                </Span>
              </Text>
              <SubmitButton color="#4964DF" onClick={handlePreviousClick}>
                Previous
              </SubmitButton>
              <SubmitButton
                onClick={() => {
                  dispatch(
                    addEstimateValue({
                      productId:
                        deviceValue?.calculatePrice?.price?.product?.id,
                      sku: deviceValue?.calculatePrice?.price?.product?.sku,
                      partnerGradeId:
                        deviceValue?.calculatePrice?.price?.partnerGrade?.id,
                      partnerGrade:
                        deviceValue?.calculatePrice?.price?.partnerGrade?.name,
                      value: deviceValue?.calculatePrice?.price?.value,
                      priceEffectivityDate: new Date(
                        deviceValue?.calculatePrice?.price?.effectivityDate
                      ).toISOString(),
                      estimateValue: deviceValue?.calculatePrice?.price?.value,
                      code: deviceValue?.calculatePrice?.price?.currency,
                    })
                  );
                  dispatch(actionNavigateTo(ROUTES_SHIPPING_INFO));
                }}
                isbuttonenable={
                  showCalculated && deviceValue?.calculatePrice?.success ? 1 : 0
                }
                isnext="true"
              >
                Next
              </SubmitButton>
              <MobileBottomDrawer
                loading={loadingDeviceValue}
                showCalculated={showCalculated}
                sku={sku?.productNearestMatch?.product?.sku}
                value={
                  deviceValue?.calculatePrice?.success
                    ? deviceValue?.calculatePrice?.price?.value
                    : 0
                }
                code={
                  deviceValue?.calculatePrice?.success
                    ? deviceValue?.calculatePrice?.price?.currency
                    : ""
                }
              />
            </Col>
          </RowMobile>
          <RowDesktop>
            <Col span={6}>
              <ImageCatalog device={device} />
              <Text
                marginBottom={8}
                fontSize={14}
                fontWeight={700}
                lineHeight="22px"
                color="#333333"
              >
                <FormattedMessage id="MODEL" />
              </Text>
              <Text
                marginBottom={20}
                fontSize={14}
                fontWeight={500}
                lineHeight="22px"
                color="#4F4F4F"
                style={{ maxWidth: 142 }}
              >
                {model}, {storage}
              </Text>
              {showCalculated && (
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
                    fontSize={loadingDeviceValue ? 16 : 28}
                    fontWeight={600}
                    lineHeight="42px"
                    color="#333333"
                  >
                    {loadingDeviceValue ? (
                      "calculating.."
                    ) : (
                      <>
                        <FormattedMessage
                          id="ESTIMATED_VALUE_PRICE"
                          values={{
                            value: deviceValue?.calculatePrice?.success
                              ? deviceValue?.calculatePrice?.price?.value
                              : 0,
                            symbol:
                              deviceValue?.calculatePrice?.price?.currency ===
                              "EUR"
                                ? "€"
                                : "$",
                          }}
                        />
                        {/* <Span>
                          {deviceValue?.calculatePrice?.price?.currency}
                        </Span> */}
                      </>
                    )}
                  </Text>
                </EstimatedValue>
              )}
            </Col>
            <Col span={18} style={{ marginBottom: 84, paddingRight: 20 }}>
              <Row>
                <Col span={18}>
                  <Text
                    marginBottom={47}
                    fontSize={26}
                    fontWeight={700}
                    lineHeight="39px"
                    isBold
                    color="#333333"
                  >
                    {/* {questions?.loading */}
                    {loading ? (
                      "Loading Device Condition..."
                    ) : (
                      <FormattedMessage id="DEVICE_CONDITION" />
                    )}
                  </Text>
                </Col>
                {/* {questions?.loading && <Loader />} */}
                {loading && <Loader />}
                <Col span={6}>
                  <Text
                    isClickable
                    onClick={handleOpenModal}
                    marginTop={12}
                    fontSize={13}
                    fontWeight={500}
                    lineHeight="19.5px"
                    color="#4964DF"
                  >
                    <FormattedMessage id="INSPECTION_TIPS" />
                    <CustomInfoIcon />
                  </Text>
                  <OptionContainer>
                    <Text
                      marginTop={20}
                      fontSize={14}
                      fontWeight={500}
                      lineHeight="21px"
                      color="#000000"
                    >
                      <FormattedMessage id="YES" />
                    </Text>
                    <Text
                      marginTop={20}
                      fontSize={14}
                      fontWeight={500}
                      lineHeight="21px"
                      color="#000000"
                    >
                      <FormattedMessage id="NO" />
                    </Text>
                  </OptionContainer>
                </Col>
              </Row>
              {!loading &&
                data?.questionnaires?.map(
                  (
                    item: {
                      id: number;
                      question: [];
                    },
                    _index: any
                  ) => {
                    return (
                      <Row key={_index} style={{ marginBottom: 24 }}>
                        {item?.question?.map(
                          (
                            q: {
                              title: string;
                              subtitle: string;
                              list: [];
                              choices: [];
                              locale: string;
                            },
                            index: any
                          ) => {
                            return (
                              <Fragment key={index}>
                                <Col span={18} style={{ paddingRight: "14%" }}>
                                  <Text
                                    marginBottom={8}
                                    fontSize={15}
                                    fontWeight={600}
                                    lineHeight="22px"
                                    color="#333333"
                                  >
                                    {localization === Ilocale.EN &&
                                      q.locale === "en" &&
                                      q.title}
                                    {localization === Ilocale.IT &&
                                      q.locale === "it" &&
                                      q.title}
                                  </Text>
                                  <Text
                                    marginBottom={8}
                                    fontSize={14}
                                    fontWeight={500}
                                    lineHeight="22px"
                                    color="#333333"
                                  >
                                    {localization === Ilocale.EN &&
                                      q.locale === "en" &&
                                      q.subtitle}
                                    {localization === Ilocale.IT &&
                                      q.locale === "it" &&
                                      q.subtitle}
                                  </Text>
                                  <UnOrderedList>
                                    {localization === Ilocale.EN &&
                                      q.locale === "en" &&
                                      q?.list?.map((list, index) => {
                                        return (
                                          <List
                                            key={index}
                                            marginBottom={10}
                                            fontSize={14}
                                            lineHeight="22px"
                                          >
                                            {list}
                                          </List>
                                        );
                                      })}
                                    {localization === Ilocale.IT &&
                                      q.locale === "it" &&
                                      q?.list?.map((list, index) => {
                                        return (
                                          <List
                                            key={index}
                                            marginBottom={10}
                                            fontSize={14}
                                            lineHeight="22px"
                                          >
                                            {list}
                                          </List>
                                        );
                                      })}
                                  </UnOrderedList>
                                </Col>
                                <Col span={6}>
                                  <YesNoContainer className="device-condition">
                                    {localization === Ilocale.EN &&
                                      q.locale === "en" &&
                                      q?.choices?.map(
                                        (
                                          choices: {
                                            yesOrNo: string;
                                            display: string;
                                          },
                                          index
                                        ) => {
                                          return (
                                            <div
                                              style={{ display: "flex" }}
                                              key={index}
                                            >
                                              <CheckboxComponent
                                                key={index}
                                                index={`${index}-${_index}`}
                                                partnerId={choices.yesOrNo}
                                                partnerName={choices.display}
                                                value={choices.display}
                                                deviceConditionId={item.id}
                                                deviceConditionGradeId={
                                                  choices.yesOrNo
                                                }
                                              />
                                            </div>
                                          );
                                        }
                                      )}
                                    {localization === Ilocale.IT &&
                                      q.locale === "it" &&
                                      q?.choices?.map(
                                        (
                                          choices: {
                                            yesOrNo: string;
                                            display: string;
                                          },
                                          index
                                        ) => {
                                          return (
                                            <div
                                              style={{ display: "flex" }}
                                              key={index}
                                            >
                                              <CheckboxComponent
                                                key={index}
                                                index={`${index}-${_index}`}
                                                partnerId={choices.yesOrNo}
                                                partnerName={choices.display}
                                                value={choices.display}
                                                deviceConditionId={item.id}
                                                deviceConditionGradeId={
                                                  choices.yesOrNo
                                                }
                                              />
                                            </div>
                                          );
                                        }
                                      )}
                                  </YesNoContainer>
                                </Col>
                              </Fragment>
                            );
                          }
                        )}
                      </Row>
                    );
                  }
                )}
              <Text
                marginBottom={20}
                fontSize={14}
                fontWeight={500}
                lineHeight="22px"
                color="#333333"
              >
                <FormattedMessage id="NEED_ASSISTANCE" />{" "}
                <Span
                  onClick={() => window.open(window.location.origin + "/#/faq")}
                >
                  <FormattedMessage id="CLICK_HERE" />
                </Span>
              </Text>
              <SubmitButton
                noMarginLeft
                color="#4964DF"
                onClick={handlePreviousClick}
              >
                <FormattedMessage id="PREVIOUS" />
              </SubmitButton>
              <SubmitButton
                onClick={() => {
                  dispatch(
                    addEstimateValue({
                      productId:
                        deviceValue?.calculatePrice?.price?.product?.id,
                      sku: deviceValue?.calculatePrice?.price?.product?.sku,
                      partnerGradeId:
                        deviceValue?.calculatePrice?.price?.partnerGrade?.id,
                      partnerGrade:
                        deviceValue?.calculatePrice?.price?.partnerGrade?.name,
                      value: deviceValue?.calculatePrice?.price?.value,
                      priceEffectivityDate: new Date(
                        deviceValue?.calculatePrice?.price?.effectivityDate
                      ).toISOString(),
                      estimateValue: deviceValue?.calculatePrice?.price?.value,
                      code: deviceValue?.calculatePrice?.price?.currency,
                    })
                  );
                  dispatch(actionNavigateTo(ROUTES_SHIPPING_INFO));
                }}
                isbuttonenable={
                  showCalculated && deviceValue?.calculatePrice?.success
                }
                isnext="true"
              >
                <FormattedMessage id="NEXT" />
              </SubmitButton>
            </Col>
          </RowDesktop>
        </Fragment>
        <Modal
          open={modal}
          onOk={handleOpenModal}
          onCancel={handleOpenModal}
          footer={null}
        >
          <Text
            marginBottom={26}
            fontSize={24}
            lineHeight="36px"
            fontWeight={600}
          >
            <FormattedMessage id="INSPECTION_TIPS" />
          </Text>
          <UnOrderedList marginLeft={-22}>
            <List fontSize={16} lineHeight="21px" marginBottom={24}>
              <FormattedMessage id="DEVICE_INSPECTION_TIPS_1" />
            </List>
            <List fontSize={16} lineHeight="21px" marginBottom={24}>
              <FormattedMessage id="DEVICE_INSPECTION_TIPS_2" />
            </List>
            <List fontSize={16} lineHeight="21px" marginBottom={24}>
              <FormattedMessage id="DEVICE_INSPECTION_TIPS_3" />
            </List>
          </UnOrderedList>
        </Modal>
      </Container>
    );
  }

  if (!sku?.productNearestMatch?.success && !loadingSKU) {
    return <div>Device Not Available</div>;
  }
  return <Loader />;
};

export default DeviceCondition;
