import { FC, useState, useEffect } from "react";
import styled from "@emotion/styled";
import { Col, Row } from "antd";
import ReactMarkdown from "react-markdown";
import { mq } from "../assets/mediaQueries";
import { useLocalization } from "../providers/IntlProvider";
import { GetAboutUsData } from "../services/query";
import { useQuery } from "react-query";
import Loader from "../features/loader";

const Container = styled("div")(
  mq({
    margin: "auto",
    marginTop: 40,
    width: ["100%", 1200],
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

const CustomCol = styled(Col)({
  margin: "auto",
  textAlign: "left",
  padding: "0 24px",
});

const About: FC = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const getSize = () => {
    setIsMobile(window.innerWidth <= 768);
  };
  const [locale] = useLocalization();
  const { isLoading, data, refetch } = useQuery("AboutUsData", () =>
    GetAboutUsData({
      locale: locale,
    })
  );

  useEffect(() => {
    refetch();
  }, [locale, isLoading]);

  useEffect(() => {
    window.addEventListener("resize", getSize);
    return () => window.removeEventListener("resize", getSize);
  });

  if (isLoading) return <Loader />;

  return !isLoading ? (
    <Container>
      <Row>
        <CustomCol span={isMobile ? 24 : 15}>
          <Text
            fontSize={32}
            lineHeight="48px"
            fontWeight={700}
            marginBottom={12}
          >
            <ReactMarkdown>{data?.data[0]?.attributes?.title}</ReactMarkdown>
          </Text>
          <Text
            fontSize={16}
            lineHeight="24px"
            fontWeight={400}
            marginBottom={30}
            color="#4F4F4F"
          >
            <ReactMarkdown>{data?.data[0]?.attributes?.content}</ReactMarkdown>
          </Text>
        </CustomCol>
      </Row>
    </Container>
  ) : (
    <div />
  );
};

export default About;
