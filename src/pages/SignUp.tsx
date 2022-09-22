import { FC, useEffect, useState } from "react";
import { Row, Col } from "antd";
import styled from "@emotion/styled";
import Frame from "../assets/images/Frame.svg";

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

const SignUp: FC = () => {
  const [email, setEmail] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPasswrod] = useState<string>("");
  const [enable, setEnable] = useState<boolean>(true);

  useEffect(() => {
    if (
      email !== "" &&
      password !== "" &&
      username !== "" &&
      confirmPassword !== ""
    ) {
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
            Register a new account
          </Text>
          <Text
            marginBottom={7}
            fontSize={14}
            fontWeight={400}
            lineHeight="21px"
            color="#222D3A"
          >
            Username
          </Text>
          <Input
            marginBottom={14}
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <Text
            marginBottom={7}
            fontSize={14}
            fontWeight={400}
            lineHeight="21px"
            color="#222D3A"
          >
            Email
          </Text>
          <Input
            marginBottom={14}
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
            marginBottom={14}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Text
            marginBottom={7}
            fontSize={14}
            fontWeight={400}
            lineHeight="21px"
            color="#222D3A"
          >
            Confirm Password
          </Text>
          <Input
            marginBottom={14}
            value={confirmPassword}
            onChange={(e) => setConfirmPasswrod(e.target.value)}
          />
          <SubmitButton isempty={enable ? 1 : 0}>Sign Up</SubmitButton>
          <Text
            style={{ textAlign: "center" }}
            fontSize={16}
            fontWeight={500}
            lineHeight="24px"
            color="#222D3A"
          >
            Are you a member? <Span>Login</Span>
          </Text>
        </InputContainer>
      </Col>
    </Row>
  );
};

export default SignUp;
