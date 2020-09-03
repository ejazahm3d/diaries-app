import { Provider } from "react-redux";
import store from "../src/store";
import { ThemeProvider, CSSReset } from "@chakra-ui/core";
import { setupServer } from "../src/services/mirage/server";

if (process.env.NODE_ENV === "development") {
  setupServer();
}

const MyApp = ({ Component, pageProps }) => {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <CSSReset />
        <Component {...pageProps} />
      </ThemeProvider>
    </Provider>
  );
};

export default MyApp;
