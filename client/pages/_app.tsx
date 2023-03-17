import AuthProvider from "@/src/providers/auth-provider/AuthProvider";
import { TypeComponentAuthFields } from "@/src/providers/auth-provider/auth-page.types";
import { store, persistor } from "@/src/store";
import "@/styles/globals.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

const queryClient = new QueryClient();

export default function App({
  Component,
  pageProps,
}: AppProps & TypeComponentAuthFields) {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <AuthProvider Component={{ isOnlyUser: Component.isOnlyUser }}>
            <Component {...pageProps} />
          </AuthProvider>
        </PersistGate>
      </Provider>
    </QueryClientProvider>
  );
}
