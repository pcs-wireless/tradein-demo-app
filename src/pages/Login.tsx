import { FC, useEffect, useState } from "react";
import { Row, Col } from "antd";
import styled from "@emotion/styled";
import Frame from "../assets/images/Frame.svg";
import { FormattedMessage } from "react-intl";

const SideFrare = styled("div")({
  width: "100%",
  height: "100vh",
  backgroundImage: `url(${Frame})`,
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
  backgroundPosition: "center",
});

const InputContainer = styled("div")({
  width: 400,
  height: "auto",
  fontFamily: "Poppins",
  padding: 10,
});

const Text = styled("div")(
  ({
    fontSize,
    fontWeight,
    lineHeight,
    color,
    marginBottom = 0,
  }: {
    fontSize: number;
    fontWeight: number;
    lineHeight: string;
    color: string;
    marginBottom?: number;
  }) => ({
    fontSize,
    fontWeight,
    lineHeight,
    color,
    marginBottom,
  })
);

const Input = styled("input")(({ marginBottom }: { marginBottom: number }) => ({
  width: 380,
  height: 45,
  borderRadius: 4,
  border: "1px solid #BDBDBD",
  padding: 8,
  marginBottom,
}));

const Link = styled("div")({
  color: "#4964DF",
  fontSize: 16,
  lineHeight: "24px",
  fontWeight: 400,
  textAlign: "right",
  marginBottom: 34,
});

const SubmitButton = styled("button")(
  ({ isempty }: { isempty: boolean | number }) => ({
    width: 380,
    height: 50,
    borderRadius: 4,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    color: "#ffffff",
    backgroundColor: isempty ? "#C9C7C5" : "#4964DF",
    pointerEvents: isempty ? "none" : "auto",
    marginBottom: 38,
    border: "none",
    ":hover": {
      backgroundColor: "#fff",
      color: "#4964DF",
      border: "1px solid #4964DF",
    },
  })
);

const Span = styled("span")({
  fontSize: 16,
  fontWeight: 500,
  lineHeight: "24px",
  color: "#4964DF",
});

const Login: FC = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [enable, setEnable] = useState<boolean>(true);

  useEffect(() => {
    if (email !== "" && password !== "") {
      setEnable(false);
    } else {
      setEnable(true);
    }
  }, [email, password]);

  return (
    <Row>
      <Col span={8} style={{ maxWidth: 410 }}>
        <SideFrare />
      </Col>
      <Col
        span={16}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <InputContainer>
          <Text
            marginBottom={28}
            fontSize={28}
            fontWeight={700}
            lineHeight="42px"
            color="#222D3A"
          >
            <FormattedMessage id="LOGIN_TITLE" />
          </Text>
          <Text
            marginBottom={7}
            fontSize={14}
            fontWeight={400}
            lineHeight="21px"
            color="#222D3A"
          >
            Email Address
          </Text>
          <Input
            marginBottom={16}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Text
            marginBottom={7}
            fontSize={14}
            fontWeight={400}
            lineHeight="21px"
            color="#222D3A"
          >
            Password
          </Text>
          <Input
            marginBottom={10}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Link>Forgot Password?</Link>
          <SubmitButton isempty={enable ? 1 : 0}>Login</SubmitButton>
          <Text
            style={{ textAlign: "center" }}
            fontSize={16}
            fontWeight={500}
            lineHeight="24px"
            color="#222D3A"
          >
            Don't have an account? <Span>Sign Up</Span>
          </Text>
        </InputContainer>
      </Col>
    </Row>
  );
};

export default Login;
