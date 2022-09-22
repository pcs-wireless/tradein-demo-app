import styled from "@emotion/styled";
import { useAppSelector } from "../app/hooks";
import "@lottiefiles/lottie-player";

const Loader = styled("div")(({ show }: { show: boolean }) => ({
  display: show ? "flex" : "none",
  width: "100vw",
  height: "100vh",
  alignItems: "center",
  position: "fixed",
  zIndex: 9,
  top: 0,
  left: 0,
  backgroundColor: "rgb(255 255 255 / 60%)",
}));

const Spinner = () => {
  const { showSpinner } = useAppSelector((state) => state.item);
  return (
    <Loader show={showSpinner}>
      <lottie-player
        autoplay
        loop
        mode="normal"
        src="https://assets3.lottiefiles.com/packages/lf20_v89m3qxi.json"
        style={{ width: 160, margin: "auto" }}
      ></lottie-player>
    </Loader>
  );
};

export default Spinner;
