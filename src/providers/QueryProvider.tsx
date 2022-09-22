import { FC } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
const queryClient = new QueryClient();

const QueryProvider: FC = ({ children }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

export default QueryProvider;
