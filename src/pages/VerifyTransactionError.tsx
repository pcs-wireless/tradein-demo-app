import { FC } from "react";
import styled from "@emotion/styled";
import { mq } from "../assets/mediaQueries";
import ServerError from "../assets/images/ServerError.svg";
import { actionNavigateTo } from "../routings/actionNavigator";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { ROUTE_HOME } from "../routings/constants/routes";
import { FormattedMessage } from "react-intl";

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

interface Button {
  color?: string;
  isnext?: boolean | string;
  isbuttonenable?: any;
  cancel?: any;
}

const SubmitButton = styled("button")(
  ({ color = "#fff", isnext, isbuttonenable, cancel }: Button) =>
    mq({
      backgroundColor:
        isnext && isbuttonenable ? "#4964DF" : isnext ? "#C9C7C5" : "#fff",
      border:
        isnext && !isbuttonenable
          ? "#C9C7C5"
          : cancel
          ? "1px solid #EB5757"
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

const VerifyTransactionError: FC = () => {
  const dispatch = useAppDispatch();
  const { message } = useAppSelector<null | any>(
    (state) => state.location.query
  );

  return (
    <ErrorContainer>
      <ErrorIcon />
      <Text
        fontSize={18}
        fontWeight={600}
        lineHeight="22px"
        marginBottom={40}
        isClickable
      >
        {message}
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
};

export default VerifyTransactionError;
