import styled from "@emotion/styled";
import { Spin } from "antd";

const FullPageSpinnerContainer = styled("div")({
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
});

export const FullPageSpinner = () => (
    <FullPageSpinnerContainer>
        <Spin spinning />
    </FullPageSpinnerContainer>
);
