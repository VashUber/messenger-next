import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import { MantineProvider } from "@mantine/core";
import store from "../store";

function MyApp({ Component, pageProps }: AppProps) {
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
