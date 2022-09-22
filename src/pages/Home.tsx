import React, { FC, useState, useEffect, lazy } from "react";
import { actionNavigateTo } from "../routings/actionNavigator";
import { useQuery } from "react-query";
import { ROUTE_CHOOSE_DEVICES } from "../routings/constants/routes";
import { useAppDispatch } from "../app/hooks";
import styled from "@emotion/styled";
import { Layout, Modal, Steps, Row, Col } from "antd";
import { mq } from "../assets/mediaQueries";
import { resetInput } from "../components/itemSlice";
import { GetHomePageData } from "../services/query";
import { useLocalization } from "../providers/IntlProvider";

const Loader = lazy(() => import("../features/loader"));

const CustomLoader = styled(Loader)({
  height: "100vw",
  width: "100vw",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

const { Content } = Layout;

const Container = styled(Content)(
  mq({
    margin: "auto",
    textAlign: "center",
    padding: [0, "0 15px", "0 15px"],
    maxWidth: "95vw",
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
  }: IText) =>
    mq({
      fontSize,
      fontFamily: isBold ? "Poppins-Bold" : "Poppins",
      fontWeight,
      lineHeight,
      marginBottom,
      color,
      textAlign: isCenter ? "center" : ["center", "left"],
      cursor: isClickable ? "pointer" : "auto",
    })
);

const ModalTitle = styled("div")(
  mq({
    fontFamily: "Poppins-Bold",
    fontSize: 24,
    lineHeight: "34px",
    fontWeight: 700,
    margin: "18px 32px 24px 0px",
    textAlign: "left",
  })
);

const StartTradeButton = styled("button")(
  ({ ismobile }: { ismobile?: boolean | number }) =>
    mq({
      backgroundColor: "#4964DF",
      color: "#FFFFFF",
      width: ismobile ? 327 : 186,
      height: ismobile ? 45 : 48,
      borderRadius: 4,
      fontWeight: 600,
      fontsize: ismobile ? 14 : 20,
      lineHeight: ismobile ? "21px" : "30px",
      fontFamily: "Poppins",
      margin: ismobile ? "auto" : "inherit",
      marginTop: [25, 21],
      border: "none",
      ":hover": {
        backgroundColor: "#fff",
        color: "#4964DF",
        border: "1px solid #4964DF",
      },
    })
);

const Logo = styled("img")(
  ({ display, src }: { display: boolean | number; src: string }) =>
    mq({
      width: ["100%", "100%", 694],
      height: [303, "100%", 492],
      marginTop: 48,
      display: display ? "block" : "none",
    })
);

const LoaderContainer = styled("div")(
  mq({
    width: ["100%", 694],
    height: 492,
    marginTop: 48,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  })
);

const AnchorContainer = styled("div")(
  mq({
    width: ["100%", 538],
    display: "flex",
    alignItems: "center",
    margin: "auto",
    justifyContent: "space-around",
    marginTop: [25, 40],
    marginBottom: 20,
  })
);

const Icon = styled("img")({
  width: 44,
});

const StepsContainer = styled("div")({
  display: "flex",
});

const CustomCol = styled(Col)({
  display: "flex",
  alignItems: "center",
});

const { Step } = Steps;

const Home: FC = () => {
  const [modal, setModal] = useState<boolean>(false);
  const [localization] = useLocalization();
  const [imageLoader, setImageLoader] = useState<boolean>(true);
  const dispatch = useAppDispatch();
  const [isTablet, setIsTablet] = useState(
    window.innerWidth > 820 && window.innerWidth < 992
  );

  const { isLoading, data, refetch } = useQuery("homePageData", () =>
    GetHomePageData({
      locale: localization,
    })
  );

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 820);
  const getSize = () => {
    setIsMobile(window.innerWidth <= 820);
    setIsTablet(window.innerWidth > 820 && window.innerWidth < 992);
  };

  useEffect(() => {
    refetch();
  }, [refetch, localization]);

  useEffect(() => {
    window.addEventListener("resize", getSize);
    return () => window.removeEventListener("resize", getSize);
  });

  const imageOnLoadHandler = (
    e: React.SyntheticEvent<HTMLImageElement, Event>
  ) => {
    setImageLoader(false);
  };

  const handleStartTradeIn = () => {
    dispatch(resetInput());
    dispatch(actionNavigateTo(ROUTE_CHOOSE_DEVICES));
  };

  if (!isLoading) {
    return (
      <Container>
        <Row style={{ textAlign: "left" }}>
          <CustomCol span={isMobile ? 24 : 12}>
            <Col span={24}>
              <Text
                isBold
                isCenter={isMobile ? true : false}
                fontSize={isMobile ? 32 : isTablet ? 44 : 54}
                lineHeight={isMobile ? "40px" : "64px"}
                fontWeight={700}
              >
                {data?.data[0]?.attributes?.titleOne}
              </Text>
              <Text
                isBold
                isCenter={isMobile ? true : false}
                fontSize={isMobile ? 32 : isTablet ? 44 : 54}
                lineHeight={isMobile ? "40px" : "64px"}
                marginBottom={16}
                fontWeight={700}
              >
                {data?.data[0]?.attributes?.titleTwo}
              </Text>
              <Text
                fontSize={isMobile ? 18 : 24}
                isCenter={isMobile ? true : false}
                lineHeight={isMobile ? "24px" : "36px"}
                fontWeight={500}
                marginBottom={9}
                color="#252525"
              >
                {data?.data[0]?.attributes?.descriptionOne}
              </Text>
              <Text
                fontSize={isMobile ? 16 : 18}
                isCenter={isMobile ? true : false}
                lineHeight="24px"
                fontWeight={isMobile ? 400 : 500}
                color="#585858"
              >
                {data?.data[0]?.attributes?.descriptionTwo}
              </Text>
              {!isMobile && (
                <StartTradeButton onClick={handleStartTradeIn}>
                  {data?.data[0]?.attributes?.startButtonText}
                </StartTradeButton>
              )}
            </Col>
          </CustomCol>
          <CustomCol span={isMobile ? 24 : 12}>
            {imageLoader && (
              <LoaderContainer>
                <Loader />
              </LoaderContainer>
            )}
            <Logo
              src={
                data?.data[0]?.attributes?.devicesImage?.data?.attributes?.url
              }
              onLoad={imageOnLoadHandler}
              display={imageLoader ? 0 : 1}
            />
          </CustomCol>
          {isMobile && (
            <StartTradeButton ismobile={1} onClick={handleStartTradeIn}>
              {data?.data[0]?.attributes?.startButtonText}
            </StartTradeButton>
          )}
        </Row>
        <AnchorContainer>
          <Text
            onClick={() => setModal(!modal)}
            isCenter
            isClickable
            fontSize={isMobile ? 16 : 20}
            lineHeight={isMobile ? "24px" : "30px"}
            fontWeight={600}
            color="#4964DF"
          >
            {data?.data[0]?.attributes?.howItWorks?.buttonText}
          </Text>
          {/* <Text
          onClick={() => dispatch(actionNavigateTo(ROUTES_STATUS_TRACKING))}
          isCenter
          isClickable
          fontSize={isMobile ? 16 : 20}
          lineHeight={isMobile ? "24px" : "30px"}
          fontWeight={600}
          color="#4964DF"
        >
          <FormattedMessage id="TRACK_YOUR_TRADE" />
        </Text> */}
        </AnchorContainer>
        <Modal
          className="home-modal"
          open={modal}
          onOk={() => setModal(!modal)}
          onCancel={() => setModal(!modal)}
          footer={null}
        >
          <ModalTitle>
            {data?.data[0]?.attributes?.howItWorks?.description}
          </ModalTitle>
          <StepsContainer>
            <Steps
              className="how-does-it-work"
              responsive={true}
              direction="vertical"
              size="small"
            >
              {data?.data[0]?.attributes?.howItWorks?.steps?.map(
                (data: {
                  id: string;
                  title: string;
                  description: string;
                  icon: {
                    data: {
                      attributes: {
                        url: string;
                      };
                    };
                  };
                }) => {
                  return (
                    <Step
                      key={data.id}
                      icon={<Icon src={data.icon.data.attributes.url} />}
                      status="process"
                      title={data.title}
                      description={data.description}
                    />
                  );
                }
              )}
            </Steps>
          </StepsContainer>
        </Modal>
      </Container>
    );
  }
  return <CustomLoader />;
};
export default Home;
