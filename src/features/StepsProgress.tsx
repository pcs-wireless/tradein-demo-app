import { FC } from "react";
import { Row, Col } from "antd";
import { mq } from "../assets/mediaQueries";
import styled from "@emotion/styled";
import { useAppSelector } from "../app/hooks";
import {
  ROUTES_GET_QUOTE,
  ROUTES_DEVICE_CONDITION,
  ROUTES_SHIPPING_INFO,
  ROUTES_CONFIRM_TRADE,
  ROUTE_CHOOSE_DEVICES,
  ROUTE_GET_QUOTE_LAPTOP,
  ROUTE_GET_QUOTE_PHONE,
  ROUTE_GET_QUOTE_WATCH,
} from "../routings/constants/routes";

const Container = styled(Row)(
  mq({
    margin: "auto",
    marginTop: [114, 134],
  })
);

const CustomCol = styled(Col)({
  display: "flex",
  alignItems: "center",
});

interface ICircle {
  isactive: boolean;
  isdone?: boolean;
}

const Circle = styled("div")(({ isactive, isdone }: ICircle) => ({
  borderRadius: "50%",
  width: 32,
  height: 32,
  border: `1px solid ${isactive ? "#4964DF" : "#E0E0E0"}`,
  boxSizing: "border-box",
  textAlign: "center",
  color: isactive ? "#4964DF" : isdone ? "#fff" : "#BDBDBD",
  fontFamily: "Poppins",
  fontSize: 16,
  display: "flex",
  lineHeight: "30px",
  justifyContent: "center",
  backgroundColor: isdone ? "#4964DF" : "#fff",
}));

interface ILine {
  isdone: boolean;
}

const Line = styled("div")(({ isdone }: ILine) => ({
  backgroundColor: isdone ? "#4964DF" : "#F2F2F2",
  height: 2,
  width: 64,
}));

const StepsProgress: FC = () => {
  const { type } = useAppSelector((state) => state.location);
  const { device, model, estimateValue, shippingInfo } = useAppSelector(
    (state) => state.item
  );
  return (
    <Container>
      <CustomCol span={24}>
        <Circle
          isdone={
            device !== null &&
            model !== null &&
            type !== ROUTES_GET_QUOTE &&
            type !== ROUTE_CHOOSE_DEVICES &&
            type !== ROUTE_GET_QUOTE_PHONE &&
            type !== ROUTE_GET_QUOTE_LAPTOP &&
            type !== ROUTE_GET_QUOTE_WATCH
          }
          isactive={
            type === ROUTES_GET_QUOTE ||
            type === ROUTE_CHOOSE_DEVICES ||
            type === ROUTE_GET_QUOTE_PHONE ||
            type === ROUTE_GET_QUOTE_LAPTOP ||
            type === ROUTE_GET_QUOTE_WATCH
          }
        >
          1
        </Circle>
        <Line isdone={device !== null && model !== null} />
        <Circle
          isdone={
            device !== null &&
            model !== null &&
            estimateValue !== null &&
            type !== ROUTES_DEVICE_CONDITION
          }
          isactive={type === ROUTES_DEVICE_CONDITION}
        >
          2
        </Circle>
        <Line
          isdone={
            device !== null &&
            model !== null &&
            estimateValue !== null &&
            type !== ROUTES_DEVICE_CONDITION
          }
        />
        <Circle isdone={shippingInfo} isactive={type === ROUTES_SHIPPING_INFO}>
          3
        </Circle>
        <Line isdone={shippingInfo} />
        <Circle isactive={type === ROUTES_CONFIRM_TRADE}>4</Circle>
      </CustomCol>
    </Container>
  );
};

export default StepsProgress;
