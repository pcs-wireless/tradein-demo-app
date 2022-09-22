import { FC } from "react";
import "@lottiefiles/lottie-player";
import { useAppSelector } from "../app/hooks";
import { ROUTE_HOME } from "../routings/constants/routes";

const Style2 = {
  width: 160,
  margin: "auto",
  marginTop: 200,
};

const Style3 = {
  width: 160,
};

const Loader: FC = () => {
  const { type } = useAppSelector((state) => state.location);

  return (
    <lottie-player
      autoplay
      loop
      mode="normal"
      // src="https://assets3.lottiefiles.com/packages/lf20_v89m3qxi.json"
      src="https://assets6.lottiefiles.com/packages/lf20_hc8xlcwy.json"
      style={type === ROUTE_HOME ? Style3 : Style2}
    ></lottie-player>
  );
};

export default Loader;
