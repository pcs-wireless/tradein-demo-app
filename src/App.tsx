import { lazy, Suspense } from "react";
import { Layout } from "antd";
import { ApolloProvider } from "@apollo/client";
import client from "./services/query";
import QueryProvider from "./providers/QueryProvider";
import IntlProvider from "./providers/IntlProvider";

const AppRoot = lazy(() => import("./rootViews/AppRoot"));
const ThemeRoot = lazy(() => import("./rootViews/ThemeRoot"));
const PageHeader = lazy(() => import("./components/PageHeader"));
const FooterPage = lazy(() => import("./components/Footer"));

const App = () => (
  <ApolloProvider client={client}>
    <QueryProvider>
      <IntlProvider>
        <ThemeRoot>
          <Suspense fallback={<div />}>
            <Layout style={{ background: "#ffffff" }}>
              <PageHeader />
              <AppRoot />
              <FooterPage />
            </Layout>
          </Suspense>
        </ThemeRoot>
      </IntlProvider>
    </QueryProvider>
  </ApolloProvider>
);

export default App;
