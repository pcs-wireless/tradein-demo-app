import { FC, useState, useEffect } from "react";
import { Row, Col, Select } from "antd";
import styled from "@emotion/styled";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { ROUTES_DEVICE_CONDITION } from "../routings/constants/routes";
import { actionNavigateTo } from "../routings/actionNavigator";
import ModelSelectBox from "../features/ModelSelectbox";
import ManufacturerSelectBox from "../features/ManufacturerSelectbox";
import CarrierSelectBox from "../features/CarrierSelectBox";
import { mq } from "../assets/mediaQueries";
import { FormattedMessage } from "react-intl";

const Container = styled(Row)(
  mq({
    width: ["100%", 598],
    padding: [24, 0],
    margin: "40px auto",
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
    })
);

interface ISubmitButton {
  isempty?: any;
}

const SubmitButton = styled("button")(({ isempty }: ISubmitButton) =>
  mq({
    backgroundColor: isempty ? "#C9C7C5" : "#4964DF",
    pointerEvents: isempty ? "none" : "auto",
    color: "#FFFFFF",
    width: ["100%", 186],
    height: 45,
    borderRadius: 4,
    fontWeight: 600,
    fontSize: 14,
    lineHeight: "21px",
    fontFamily: "Poppins",
    marginTop: 40,
    border: "none",
    ":hover": {
      backgroundColor: "#fff",
      color: "#4964DF",
      border: "1px solid #4964DF",
    },
  })
);

const CustomSelect = styled(Select)(
  mq({
    width: ["100%", 598],
    height: 45,
    ".ant-select-selector": {
      height: "45px !important",
      display: "flex",
      alignItems: "center",
    },
    ".ant-select-selection-search-input": {
      height: "45px !important",
    },
  })
);

const GetQuoteWatch: FC = () => {
  const dispatch = useAppDispatch();
  const { manufacturerId, modelId } = useAppSelector((state) => state.item.ids);
  const { device, manufacturer, model, color, carrier } = useAppSelector(
    (state) => state.item
  );
  const [disable, setDisable] = useState<boolean>(true);

  useEffect(() => {
    manufacturer && model && carrier && setDisable(false);
  }, [manufacturer, model, color, carrier]);

  return (
    <Container className="get-quote">
      <Col span={24}>
        <Text
          marginBottom={16}
          fontSize={26}
          fontWeight={700}
          lineHeight="39px"
          isBold
          color="#333333"
        >
          <FormattedMessage
            values={{ device: "watch" }}
            id="GET_INSTANT_QUOTE_TITLE"
          />
        </Text>
        <Text
          marginBottom={36}
          fontSize={16}
          fontWeight={400}
          lineHeight="22px"
          color="#4F4F4F"
        >
          <FormattedMessage id="GET_INSTANT_QUOTE_DESC" />
        </Text>

        <Text
          marginBottom={8}
          fontSize={16}
          fontWeight={400}
          lineHeight="24px"
          color="#4F4F4F"
        >
          <FormattedMessage id="SELECT_MANUFATURER" />
        </Text>
        <ManufacturerSelectBox />

        <Text
          marginBottom={8}
          marginTop={20}
          fontSize={16}
          fontWeight={400}
          lineHeight="24px"
          color="#4F4F4F"
        >
          <FormattedMessage id="SELECT_MODEL" />
        </Text>
        {!manufacturerId && device ? (
          <CustomSelect placeholder={<FormattedMessage id="SELECT_MODEL" />} />
        ) : (
          <ModelSelectBox />
        )}

        <Text
          marginBottom={8}
          marginTop={20}
          fontSize={16}
          fontWeight={400}
          lineHeight="24px"
          color="#4F4F4F"
        >
          <FormattedMessage id="SELECT_CARRIER" />
        </Text>
        {!modelId && device ? (
          <CustomSelect
            placeholder={<FormattedMessage id="SELECT_CARRIER" />}
          />
        ) : (
          <CarrierSelectBox />
        )}

        {/* <Text
          marginBottom={8}
          marginTop={20}
          fontSize={16}
          fontWeight={400}
          lineHeight="24px"
          color="#4F4F4F"
        >
          <FormattedMessage id="SELECT_COLOR" />
        </Text>
        {!modelId && device === Watch ? (
          <CustomSelect placeholder={<FormattedMessage id="SELECT_COLOR" />} />
        ) : (
          <ColorSelectBox />
        )} */}
      </Col>
      <SubmitButton
        isempty={disable ? 1 : 0}
        onClick={() => dispatch(actionNavigateTo(ROUTES_DEVICE_CONDITION))}
      >
        <FormattedMessage id="START_QUOTE" />
      </SubmitButton>
    </Container>
  );
};

export default GetQuoteWatch;
