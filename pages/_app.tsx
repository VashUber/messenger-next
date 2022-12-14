import { Provider } from "react-redux";
import { MantineProvider, Global } from "@mantine/core";
import store from "../store";
import { AppPropsWithLayout } from "../types";

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      theme={{
        colorScheme: "dark",
      }}
    >
      <Global
        styles={() => ({
          main: {
            maxHeight: "100vh !important",
          },
        })}
      />
      <Provider store={store}>
        {getLayout(<Component {...pageProps} />)}
      </Provider>
    </MantineProvider>
  );
}

export default MyApp;
