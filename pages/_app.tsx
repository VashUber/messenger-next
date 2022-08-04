import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { MantineProvider } from "@mantine/core";
import store from "../store";
import { setUser } from "../store/slice/user";

function MyApp({ Component, pageProps }: AppProps) {
  if (typeof window !== "undefined") {
    store.dispatch(setUser());
  }

  return (
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      theme={{
        colorScheme: "dark",
      }}
    >
      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </MantineProvider>
  );
}

export default MyApp;
