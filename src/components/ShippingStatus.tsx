import { FC, Fragment, useEffect } from "react";
import { Row, Col, Steps } from "antd";
import styled from "@emotion/styled";
import { mq } from "../assets/mediaQueries";
import laptop from "../assets/images/laptop.svg";
import { useAppSelector, useAppDispatch } from "../app/hooks";
import { TrackTradeStatus } from "../services/query";
import { showSpinner } from "./itemSlice";

const Container = styled(Row)(
  mq({
    width: ["100vw", 598],
    margin: "auto",
    padding: ["0 24px", "auto"],
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

const { Step } = Steps;

const CustomStep = styled(Step)({
  fontFamily: "Poppins",
  color: "#000000",
  fontWeight: 500,
});

interface IText {
  fontSize: number;
  fontWeight: number;
  lineHeight: string;
  isBold?: boolean;
  color?: string;
  marginBottom: number;
  marginTop?: number;
}

const Text = styled("div")(
  ({
    fontSize,
    fontWeight,
    lineHeight,
    isBold,
    marginBottom,
    marginTop = 0,
    color = "#252525",
  }: IText) => ({
    fontSize,
    fontFamily: isBold ? "Poppins-Bold" : "Poppins",
    fontWeight,
    lineHeight,
    color,
    textAlign: "left",
    marginBottom,
    marginTop,
  })
);

const Line = styled("div")({
  width: "100%",
  height: 1,
  border: "1px solid #E0E0E0",
  marginBottom: 21,
});

const ImageCatalog = styled("div")(({ bg }: { bg: string }) =>
  mq({
    width: [100, 129],
    height: [86, 127],
    marginBottom: 16,
    backgroundImage: `url(${bg})`,
    backgroundSize: "contain",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
  })
);

const Span = styled("span")({
  fontSize: 12,
  lineHeight: "18px",
  fontFamily: "Poppins",
  marginLeft: 6,
});

const ShippingStatus: FC = () => {
  const dispatch = useAppDispatch();
  const { tranId, email } = useAppSelector((state) => state.location.payload);
  const status = TrackTradeStatus({ transactionNumber: tranId, email });

  useEffect(() => {
    dispatch(showSpinner(status.loading));
  }, [status]);

  return (
    <Container>
      {status.trackTradeIn && !status.loading ? (
        <Fragment>
          <RowDesktop>
            <Col span={24}>
              <Text
                marginBottom={27}
                fontSize={26}
                fontWeight={700}
                lineHeight="39px"
                isBold
                color="#333333"
              >
                Trade Status Tracking
              </Text>
            </Col>
            <Col span={18}>
              <Text
                marginBottom={0}
                fontSize={18}
                fontWeight={700}
                lineHeight="27px"
                color="#4F4F4F"
              >
                Shipping Kit
              </Text>
              <Text
                marginBottom={42}
                fontSize={26}
                fontWeight={600}
                lineHeight="39px"
                color="#000000"
              >{`Arrives ${new Date(status.trackTradeIn.shippingKitDelivery)
                .toString()
                .slice(0, 10)}`}</Text>
            </Col>
            <Col span={6}>
              <Text
                marginBottom={0}
                fontSize={14}
                fontWeight={700}
                lineHeight="21px"
                color="#4F4F4F"
              >
                Transaction No.
              </Text>
              <Text
                marginBottom={42}
                fontSize={15}
                fontWeight={600}
                lineHeight="30px"
                color="#000000"
              >
                {status.trackTradeIn.transactionNumber}
              </Text>
            </Col>
            <Steps
              current={status.trackTradeIn.status.id}
              labelPlacement="vertical"
            >
              <CustomStep className="trade-status" title="Trade Created" />
              <CustomStep className="trade-status" title="In Transit" />
              <CustomStep className="trade-status" title="Device Received" />
              <CustomStep className="trade-status" title="Device Inspected" />
              <CustomStep className="trade-status" title="Payment Processing" />
            </Steps>
            <Text
              marginBottom={21}
              marginTop={28}
              fontSize={14}
              fontWeight={400}
              lineHeight="20px"
              color="#4F4F4F"
            >
              You can always review your transaction on this page. Updated
              tracking information is available within 24 hours.
            </Text>
            <Line />
            <Col span={24}>
              <Text
                marginBottom={22}
                fontSize={15}
                fontWeight={600}
                lineHeight="22.5px"
                color="#4F4F4F"
              >
                Trade-In details
              </Text>
            </Col>
            <Col span={6}>
              <ImageCatalog
                bg={
                  status.trackTradeIn.product.model.image.mediumSizeSourceURL ||
                  laptop
                }
              />
            </Col>
            <Col span={12}>
              <Text
                marginBottom={0}
                fontSize={14}
                fontWeight={600}
                lineHeight="21px"
                color="#4F4F4F"
              >
                Model:
              </Text>
              {status.trackTradeIn.product.device.name === "Watch" ? (
                <Text
                  marginBottom={0}
                  fontSize={14}
                  fontWeight={400}
                  lineHeight="21px"
                  color="#4F4F4F"
                >{`${status.trackTradeIn.product.model.name}`}</Text>
              ) : (
                <Text
                  marginBottom={0}
                  fontSize={14}
                  fontWeight={400}
                  lineHeight="21px"
                  color="#4F4F4F"
                >{`${status.trackTradeIn.product.model.name}" ${status.trackTradeIn.product.model.storages[0].size}`}</Text>
              )}
            </Col>
            <Col span={6}>
              <Text
                marginBottom={0}
                fontSize={14}
                fontWeight={600}
                lineHeight="21px"
                color="#4F4F4F"
              >
                Estimated value
              </Text>
              <Text
                marginBottom={30}
                fontSize={22}
                fontWeight={600}
                lineHeight="33px"
                color="#333333"
              >
                {`$${status.trackTradeIn.price.value}`}
                <Span>{status.trackTradeIn.price.currency.code}</Span>
              </Text>
            </Col>
            <Col span={24}>
              <Text
                marginBottom={22}
                fontSize={15}
                fontWeight={600}
                lineHeight="22.5px"
                color="#4F4F4F"
              >
                Shipping Information
              </Text>
            </Col>
            <Col span={8}>
              <Text
                marginBottom={22}
                fontSize={14}
                fontWeight={600}
                lineHeight="20px"
                color="#4F4F4F"
              >{`${status.trackTradeIn.firstName} ${status.trackTradeIn.lastName}`}</Text>
              <Text
                marginBottom={22}
                fontSize={14}
                fontWeight={600}
                lineHeight="20px"
                color="#4F4F4F"
              >
                Address
              </Text>
              <Text
                marginBottom={22}
                fontSize={14}
                fontWeight={400}
                lineHeight="20px"
                color="#4F4F4F"
              >{`${status.trackTradeIn.street1}, ${status.trackTradeIn.city}`}</Text>
            </Col>
            <Col span={8}>
              <Text
                marginBottom={22}
                fontSize={14}
                fontWeight={600}
                lineHeight="20px"
                color="#4F4F4F"
              >
                Phone No
              </Text>
              <Text
                marginBottom={22}
                fontSize={14}
                fontWeight={400}
                lineHeight="20px"
                color="#4F4F4F"
              >
                {status.trackTradeIn.phone}
              </Text>
            </Col>
            <Col span={8}>
              <Text
                marginBottom={22}
                fontSize={14}
                fontWeight={600}
                lineHeight="20px"
                color="#4F4F4F"
              >
                Email
              </Text>
              <Text
                marginBottom={22}
                fontSize={14}
                fontWeight={400}
                lineHeight="20px"
                color="#4F4F4F"
              >
                {status.trackTradeIn.email}
              </Text>
            </Col>
          </RowDesktop>
          <RowMobile>
            <Col span={24}>
              <Text
                marginBottom={27}
                fontSize={24}
                fontWeight={700}
                lineHeight="36px"
                isBold
                color="#333333"
              >
                Trade Status Tracking
              </Text>
            </Col>
            <Col span={24}>
              <Text
                marginBottom={0}
                fontSize={16}
                fontWeight={700}
                lineHeight="24px"
                color="#4F4F4F"
              >
                Shipping Kit
              </Text>
              <Text
                marginBottom={42}
                fontSize={24}
                fontWeight={600}
                lineHeight="36px"
                color="#000000"
              >{`Arrives ${new Date(status.trackTradeIn.shippingKitDelivery)
                .toString()
                .slice(0, 10)}`}</Text>
            </Col>
            <Col span={24}>
              <Text
                marginBottom={0}
                fontSize={16}
                fontWeight={700}
                lineHeight="24px"
                color="#4F4F4F"
              >
                Transaction No.
              </Text>
              <Text
                marginBottom={42}
                fontSize={16}
                fontWeight={600}
                lineHeight="30px"
                color="#000000"
              >
                {status.trackTradeIn.transactionNumber}
              </Text>
            </Col>
            <Steps
              className="trade-status"
              current={status.trackTradeIn.status.id}
              responsive={true}
              labelPlacement="vertical"
            >
              <CustomStep title="Trade Created" />
              <CustomStep title="In Transit" />
              <CustomStep title="Device Received" />
              <CustomStep title="Device Inspected" />
              <CustomStep title="Payment Processing" />
            </Steps>
            <Text
              marginBottom={21}
              marginTop={28}
              fontSize={14}
              fontWeight={400}
              lineHeight="20px"
              color="#4F4F4F"
            >
              You can always review your transaction on this page. Updated
              tracking information is available within 24 hours.
            </Text>
            <Line />
            <Col span={24}>
              <Text
                marginBottom={22}
                fontSize={16}
                fontWeight={600}
                lineHeight="24px"
                color="#4F4F4F"
              >
                Trade-In details
              </Text>
            </Col>
            <Col
              span={24}
              style={{ display: "flex", justifyContent: "flex-start" }}
            >
              <ImageCatalog
                bg={
                  status.trackTradeIn.product.model.image.mediumSizeSourceURL ||
                  laptop
                }
              />
              <Col span={12}>
                <Text
                  marginBottom={0}
                  fontSize={14}
                  fontWeight={600}
                  lineHeight="21px"
                  color="#4F4F4F"
                >
                  Model:
                </Text>
                {status.trackTradeIn.product.device.name === "Watch" ? (
                  <Text
                    marginBottom={0}
                    fontSize={14}
                    fontWeight={400}
                    lineHeight="21px"
                    color="#4F4F4F"
                  >{`${status.trackTradeIn.product.model.name}"}`}</Text>
                ) : (
                  <Text
                    marginBottom={0}
                    fontSize={14}
                    fontWeight={400}
                    lineHeight="21px"
                    color="#4F4F4F"
                  >{`${status.trackTradeIn.product.model.name}" ${status.trackTradeIn.product.model.storages[0].size}`}</Text>
                )}

                <Text
                  marginBottom={0}
                  fontSize={14}
                  fontWeight={600}
                  lineHeight="21px"
                  color="#4F4F4F"
                >
                  Estimated value
                </Text>
                <Text
                  marginBottom={30}
                  fontSize={22}
                  fontWeight={600}
                  lineHeight="33px"
                  color="#333333"
                >
                  {`$${status.trackTradeIn.price.value}`}
                  <Span>{status.trackTradeIn.price.currency.code}</Span>
                </Text>
              </Col>
            </Col>
            <Col span={24}>
              <Text
                marginBottom={22}
                fontSize={16}
                fontWeight={600}
                lineHeight="24px"
                color="#4F4F4F"
              >
                Shipping Information
              </Text>
              <Text
                marginBottom={22}
                fontSize={16}
                fontWeight={600}
                lineHeight="20px"
                color="#4F4F4F"
              >{`${status.trackTradeIn.firstName} ${status.trackTradeIn.lastName}`}</Text>
              <Text
                marginBottom={22}
                fontSize={16}
                fontWeight={600}
                lineHeight="20px"
                color="#4F4F4F"
              >
                Address
              </Text>
              <Text
                marginBottom={22}
                fontSize={16}
                fontWeight={400}
                lineHeight="20px"
                color="#4F4F4F"
              >{`${status.trackTradeIn.street1}, ${status.trackTradeIn.city}`}</Text>
              <Text
                marginBottom={22}
                fontSize={16}
                fontWeight={600}
                lineHeight="20px"
                color="#4F4F4F"
              >
                Phone No
              </Text>
              <Text
                marginBottom={22}
                fontSize={16}
                fontWeight={400}
                lineHeight="20px"
                color="#4F4F4F"
              >
                {status.trackTradeIn.phone}
              </Text>
              <Text
                marginBottom={22}
                fontSize={16}
                fontWeight={600}
                lineHeight="20px"
                color="#4F4F4F"
              >
                Email
              </Text>
              <Text
                marginBottom={22}
                fontSize={16}
                fontWeight={400}
                lineHeight="20px"
                color="#4F4F4F"
              >
                {status.trackTradeIn.email}
              </Text>
            </Col>
          </RowMobile>
        </Fragment>
      ) : (
        status.trackTradeIn === null && "TRACKING ID NOT FOUND"
      )}
    </Container>
  );
};

export default ShippingStatus;
