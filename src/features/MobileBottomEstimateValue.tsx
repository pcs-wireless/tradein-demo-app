import { useState } from "react";
import { Row, Col } from "antd";
import styled from "@emotion/styled";
import {
  Phone,
  Tablet,
  Laptop,
  Phones,
  Laptops,
  Tablets,
} from "../routings/constants/devicesNames";
import cellPhone from "../assets/images/CellPhone.svg";
import watch from "../assets/images/watch.svg";
import tablet from "../assets/images/tablet.svg";
import { mq } from "../assets/mediaQueries";
import { useAppSelector } from "../app/hooks";
import { FormattedMessage } from "react-intl";

interface IImageCatalog {
  bg: string;
}

const ImageCatalog = styled("div")(({ bg }: IImageCatalog) =>
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

const MobileEstimateDrawer = styled("div")(
  mq({
    width: "100vw",
    height: ["auto", 118],
    maxHeight: 175,
    backgroundColor: "#F8F8F8",
    position: "fixed",
    bottom: 0,
    left: 0,
    ".ant-row": {
      padding: "20px 24px 0",
    },
  })
);

const MobileEstimateValue = styled("div")({
  width: "100%",
  height: 62,
  backgroundColor: "rgba(47, 128, 237, 0.08)",
  borderTop: "1px solid #4964DF",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-around",
});

const SKU = styled(Text)({
  wordBreak: "break-word",
  paddingRight: 5,
});

const MobileBottomDrawer = ({
  showCalculated,
  sku,
  value,
  code,
  loading,
}: {
  showCalculated: any;
  sku: any | null;
  value: any | null;
  code: any | null;
  loading: any;
}) => {
  const { model, storage, color, image } = useAppSelector<null | any>(
    (state) => state.item
  );
  const { device } = useAppSelector((state) => state.item);
  const [placeholder] = useState<string>(
    device != null
      ? device === Phone || device === Phones
        ? cellPhone
        : device === Laptop || device === Laptops
        ? Laptop
        : device === Tablet || device === Tablets
        ? tablet
        : watch
      : ""
  );

  return (
    <MobileEstimateDrawer>
      <Row>
        <Col span={8}>
          <ImageCatalog bg={image || placeholder} />
        </Col>
        <Col span={8}>
          <Text
            marginBottom={0}
            fontSize={12}
            fontWeight={600}
            lineHeight="18px"
            isBold
            color="#333333"
          >
            SKU:
          </Text>
          <SKU
            marginBottom={0}
            fontSize={12}
            fontWeight={400}
            lineHeight="18px"
            color="#333333"
          >
            {sku}
          </SKU>
        </Col>
        <Col span={8}>
          <Text
            marginBottom={0}
            fontSize={12}
            fontWeight={600}
            lineHeight="18px"
            isBold
            color="#333333"
          >
            <FormattedMessage id="MODEL" />
          </Text>
          <Text
            marginBottom={0}
            fontSize={12}
            fontWeight={400}
            lineHeight="18px"
            color="#333333"
          >
            {model}, {storage}, {color}
          </Text>
        </Col>
      </Row>
      {showCalculated && (
        <MobileEstimateValue>
          <Text
            marginBottom={0}
            fontSize={12}
            fontWeight={600}
            lineHeight="18px"
            isBold
            color="#333333"
          >
            <FormattedMessage id="ESTIMATED_VALUE" />
          </Text>
          <Text
            marginBottom={0}
            fontSize={28}
            fontWeight={600}
            lineHeight="42px"
            isBold
            color="#333333"
          >
            {loading ? (
              "calculating.."
            ) : (
              <>
                <FormattedMessage
                  id="ESTIMATED_VALUE_PRICE"
                  values={{ value: value, symbol: code === "EUR" ? "€" : "$" }}
                />
                {/* <Span>{code}</Span> */}
              </>
            )}
          </Text>
        </MobileEstimateValue>
      )}
    </MobileEstimateDrawer>
  );
};

export default MobileBottomDrawer;
