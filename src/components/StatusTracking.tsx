import { FC, useEffect, useState } from "react";
import { Row, Col, Input } from "antd";
import styled from "@emotion/styled";
import { actionNavigateTo } from "../routings/actionNavigator";
import { useAppDispatch } from "../app/hooks";
import { mq } from "../assets/mediaQueries";
import { ROUTES_SHIPPING_STATUS } from "../routings/constants/routes";
import { useLazyQuery } from "@apollo/client";
import { VERIFY_TRACNSACTION_NO } from "../services/query";
import { showSpinner } from "./itemSlice";
import { WarningOutlined } from "@ant-design/icons";
import { FormattedMessage } from "react-intl";

const Container = styled(Row)(
  mq({
    width: ["100%", 598],
    margin: ["auto", "120px auto"],
    padding: ["0 24px", 0],
    maxWidth: "90vw",
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
  }: IText) =>
    mq({
      fontSize,
      fontFamily: isBold ? "Poppins-Bold" : "Poppins",
      fontWeight,
      lineHeight,
      color,
      textAlign: ["left", "justify"],
      marginBottom,
      marginTop,
    })
);

const CustomInput = styled(Input)(({ error }: { error?: any }) =>
  mq({
    width: ["100%", 289],
    height: 45,
    border: error ? "1px solid #eb5757" : "",
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
    fontsize: 14,
    lineHeight: "21px",
    fontFamily: "Poppins",
    marginTop: 25,
    border: "none",
    ":hover": {
      backgroundColor: "#fff",
      color: "#4964DF",
      border: "1px solid #4964DF",
    },
  })
);

const ErrorLabel = styled("div")(({ error }: { error: any }) => ({
  display: error ? "flex" : "none",
  alignItems: "center",
  marginTop: 12,
}));

const StatusTracking: FC = () => {
  const dispatch = useAppDispatch();
  const [transactionNumber, setTransactionNumber] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [error, setError] = useState<boolean>(false);
  const [empty, setEmpty] = useState<boolean>(true);

  const [verifyTracking, { called, loading, data }] = useLazyQuery(
    VERIFY_TRACNSACTION_NO,
    {
      variables: { transactionNumber, email },
      notifyOnNetworkStatusChange: true,
    }
  );

  // const handleVerification = async () => {
  //     verifyTracking();
  //     if (called && loading) showSpinner(true);
  //     if (data?.trackTradeIn) {
  //         dispatch(showSpinner(false));
  //         dispatch(actionNavigateTo(ROUTES_SHIPPING_STATUS, { tranId: transactionNumber, email: email }))
  //     }
  //     if (!called && !loading && !data?.trackTradeIn) setError(true);
  // };

  useEffect(() => {
    if (!called) return;
    if (called && loading) dispatch(showSpinner(true));
    if (data?.trackTradeIn) {
      dispatch(showSpinner(false));
      dispatch(
        actionNavigateTo(ROUTES_SHIPPING_STATUS, {
          tranId: transactionNumber,
          email: email,
        })
      );
    }
    if (called && !loading && !data?.trackTradeIn) {
      setError(true);
      dispatch(showSpinner(false));
    }
  }, [called, loading, data]);

  useEffect(() => {
    if (transactionNumber !== "" && email !== "") {
      setEmpty(false);
    } else {
      setEmpty(true);
    }
  }, [transactionNumber, email]);

  // useEffect(() => {
  //     const timeOutId = setTimeout(() => setEmail(email), 500);
  //     console.log(email);
  //     return () => clearTimeout(timeOutId);
  // }, [email]);

  // useEffect(() => {
  //     const timeOutId = setTimeout(() => setTransactionNumber(transactionNumber), 500);
  //     console.log(transactionNumber);
  //     return () => clearTimeout(timeOutId);
  // }, [transactionNumber]);

  return (
    <Container>
      <RowDesktop>
        <Col span={24}>
          <Text
            marginBottom={17}
            fontSize={26}
            fontWeight={700}
            lineHeight="39px"
            isBold
            color="#333333"
          >
            <FormattedMessage id="TRADE_STATUS_TRACKING" />
          </Text>
          <Text
            marginBottom={37}
            fontSize={16}
            fontWeight={400}
            lineHeight="22px"
            color="#4F4F4F"
          >
            <FormattedMessage id="TRADE_STATUS_TRACKING_DESC" />
          </Text>
        </Col>
        <Col span={12}>
          <Text
            marginBottom={8}
            fontSize={14}
            fontWeight={400}
            lineHeight="21px"
            color="#4F4F4F"
          >
            <FormattedMessage id="CONFIRMATION_NUMBER" />
          </Text>
          <CustomInput
            error={error ? 1 : 0}
            onChange={(e) =>
              setTransactionNumber((prev) => (prev = e.target.value))
            }
            value={transactionNumber}
            placeholder="Enter confirmation no."
          />
          <ErrorLabel error={error ? 1 : 0}>
            <WarningOutlined
              style={{ color: "#eb5757", fontSize: 16, marginRight: 8 }}
            />
            <Text
              marginBottom={0}
              fontSize={13}
              fontWeight={400}
              lineHeight="16px"
              color="#EB5757"
            >
              <FormattedMessage id="ERROR_INVALID_INPUT" />
            </Text>
          </ErrorLabel>
        </Col>
        <Col span={12}>
          <Text
            marginBottom={8}
            fontSize={14}
            fontWeight={400}
            lineHeight="21px"
            color="#4F4F4F"
          >
            <FormattedMessage id="EMAIL_ADDRESS" />
          </Text>
          <CustomInput
            onChange={(e) => setEmail((prev) => (prev = e.target.value))}
            value={email}
            placeholder="Enter email address"
          />
        </Col>
        <SubmitButton isempty={empty ? 1 : 0} onClick={() => verifyTracking()}>
          <FormattedMessage id="SUBMIT" />
        </SubmitButton>
      </RowDesktop>
      <RowMobile>
        <Col span={24}>
          <Text
            marginBottom={17}
            fontSize={26}
            fontWeight={700}
            lineHeight="39px"
            isBold
            color="#333333"
          >
            <FormattedMessage id="TRADE_STATUS_TRACKING" />
          </Text>
          <Text
            marginBottom={37}
            fontSize={16}
            fontWeight={400}
            lineHeight="22px"
            color="#4F4F4F"
          >
            <FormattedMessage id="TRADE_STATUS_TRACKING_DESC" />
          </Text>
        </Col>
        <Col span={24}>
          <Text
            marginBottom={8}
            fontSize={14}
            fontWeight={400}
            lineHeight="21px"
            color="#4F4F4F"
          >
            <FormattedMessage id="CONFIRMATION_NUMBER" />
          </Text>
          <CustomInput
            error={error ? 1 : 0}
            onChange={(e) => setTransactionNumber(e.target.value)}
            value={transactionNumber}
            placeholder="Enter confirmation no."
          />
          <ErrorLabel error={error ? 1 : 0}>
            <WarningOutlined
              style={{ color: "#eb5757", fontSize: 16, marginRight: 8 }}
            />
            <Text
              marginBottom={0}
              fontSize={13}
              fontWeight={400}
              lineHeight="16px"
              color="#EB5757"
            >
              <FormattedMessage id="ERROR_INVALID_INPUT" />
            </Text>
          </ErrorLabel>
        </Col>
        <Col span={24}>
          <Text
            marginBottom={8}
            marginTop={17}
            fontSize={14}
            fontWeight={400}
            lineHeight="21px"
            color="#4F4F4F"
          >
            <FormattedMessage id="EMAIL_ADDRESS" />
          </Text>
          <CustomInput
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            placeholder="Enter email address"
          />
        </Col>
        <SubmitButton isempty={empty ? 1 : 0} onClick={() => verifyTracking()}>
          <FormattedMessage id="SUBMIT" />
        </SubmitButton>
      </RowMobile>
    </Container>
  );
};

export default StatusTracking;
