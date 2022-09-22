import { lazy, Suspense, FC } from "react";
import styled from "@emotion/styled";
import { mq } from "../assets/mediaQueries.js";

const AppRoutes = lazy(() => import("./AppRoutes"));
const Loader = lazy(() => import("../features/loader"));

const EntryContainer = styled("div")(
  mq({
    margin: "auto",
    marginTop: [120, 120, 134],
    minHeight: "75vh",
  })
);

interface EntryRootProps {
  location: string;
}

const EntryRoot: FC<EntryRootProps> = ({ location }) => (
  <EntryContainer className="fade-in">
    <Suspense
      fallback={
        <div>
          <Loader />
        </div>
      }
    >
      <AppRoutes location={location} />
    </Suspense>
  </EntryContainer>
);

export default EntryRoot;
