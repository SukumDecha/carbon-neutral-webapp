"use client";

import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactNode } from "react";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "../../../stores/store";

const queryClient = new QueryClient();

interface ClientProvidersProps {
  children: ReactNode;
}

const ClientProviders = ({ children }: ClientProvidersProps) => {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          {children}
          <ReactQueryDevtools initialIsOpen={false} />
        </PersistGate>
      </Provider>
    </QueryClientProvider>
  );
};

export default ClientProviders;
