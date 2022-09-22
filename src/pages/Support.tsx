import { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { Col, Row } from "antd";
import { mq } from "../assets/mediaQueries";
import ReactMarkdown from "react-markdown";
import { useLocalization } from "../providers/IntlProvider";
import { GetSupportData } from "../services/query";
import { useQuery } from "react-query";
import Loader from "../features/loader";

const Container = styled("div")(
  mq({
    margin: "auto",
    marginTop: [20, 40],
    maxWidth: ["100vw", "auto"],
    width: ["100%", 1200],
    padding: "0 24px",
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
    wordBreak: "break-word",
  })
);

const CustomCol = styled(Col)({
  margin: "auto",
  textAlign: "left",
});

const Support = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const getSize = () => {
    setIsMobile(window.innerWidth <= 768);
  };

  const [locale] = useLocalization();
  const { isLoading, data, refetch } = useQuery("SupportData", () =>
    GetSupportData({
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

  useEffect(() => {
    const links = document.getElementsByTagName("a");
    let len = links.length;

    for (let i = 0; i < len; i++) {
      links[i].target = "_blank";
    }
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
            marginBottom={24}
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

export default Support;
