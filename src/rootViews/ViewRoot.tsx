import { lazy, Suspense, FC } from "react";
import styled from "@emotion/styled";
import { mq } from "../assets/mediaQueries";

const Loader = lazy(() => import("../features/loader"));
const AppRoutes = lazy(() => import("./AppRoutes"));

const ContextLayer = styled("div")(
  mq({
    width: ["auto", "100%", 1200],
    margin: "auto",
    minHeight: ["auto", "65vh"],
    maxWidth: "90vw",
  })
);

interface ViewRootProps {
  location: string;
}

const ViewRoot: FC<ViewRootProps> = ({ location }) => {
  return (
    <ContextLayer className="fade-in">
      <Suspense fallback={<Loader />}>
        <AppRoutes location={location} />
      </Suspense>
    </ContextLayer>
  );
};

export default ViewRoot;
