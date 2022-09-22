import { FC } from "react";
import styled from "@emotion/styled";
import { ROUTE_HOME } from "../routings/constants/routes";
import { actionNavigateTo } from "../routings/actionNavigator";
import { useAppDispatch } from "../app/hooks";
import { mq } from "../assets/mediaQueries";

const ErrorPageContainer = styled("div")(({ theme }) => ({
  width: "100%",
  height: "100vh",
  display: "flex",
  flexDirection: "column",
  textAlign: "center",
  alignItems: "center",
  justifyContent: "center",
  margin: "auto",
}));

interface ErrorIconPops {
  icon: string;
}

const ErrorIcon = styled("div")(({ icon }: ErrorIconPops) =>
  mq({
    width: [300, 600],
    height: [200, 400],
    backgroundImage: `url(${icon})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  })
);

const ErrorMessage = styled("p")(({ theme }) => ({
  fontSize: 16,
}));

const Container = styled("div")({
  margin: 0,
  overflow: "none",
});

const ButtonContainer = styled("div")({
  display: "flex",
  justifyContent: "center",
  marginTop: "52px",
});

const SubmitButton = styled("button")(
  mq({
    backgroundColor: "#4964DF",
    border: "1px solid #4964DF",
    pointerEvents: "auto",
    color: "#fff",
    width: ["100%", 206, 206],
    height: [40, 45, 45],
    borderRadius: 4,
    fontWeight: 600,
    fontsize: 14,
    lineHeight: "21px",
    fontFamily: "Poppins",
    margin: "auto",
    ":hover": {
      backgroundColor: "#fff",
      color: "#4964DF",
      border: "1px solid #4964DF",
    },
  })
);

const Heading = styled("h1")({
  fontSize: 36,
  margin: "20px 40px",
});

interface ErrorPageProps {
  errorType: {
    errorId: string;
    errorAltText: string;
    errorTitle: string;
    errorMessage: string;
    errorButtonTitle: string;
    errorIcon: string;
  };
}

const ErrorPage: FC<ErrorPageProps> = ({ errorType }) => {
  const dispatch = useAppDispatch();

  return (
    <Container data-testid="errorPageContainer">
      <ErrorPageContainer>
        <ErrorIcon icon={errorType.errorIcon} />
        <Heading>{errorType.errorTitle}</Heading>
        {errorType.errorMessage.split("<br>").map((message, i) => {
          return <ErrorMessage key={i}>{message}</ErrorMessage>;
        })}
        <ButtonContainer>
          <SubmitButton onClick={() => dispatch(actionNavigateTo(ROUTE_HOME))}>
            {errorType.errorButtonTitle}
          </SubmitButton>
        </ButtonContainer>
      </ErrorPageContainer>
    </Container>
  );
};

export default ErrorPage;
