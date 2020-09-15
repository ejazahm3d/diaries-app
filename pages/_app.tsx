import { Provider } from "react-redux";
import { store, persistor } from "../src/store";
import { ThemeProvider, CSSReset } from "@chakra-ui/core";
import { setupServer } from "../src/services/mirage/server";
import "../src/index.css";
import { PersistGate } from "redux-persist/integration/react";

// if (process.env.NODE_ENV === "development") {
//   setupServer();
// }

const MyApp = ({ Component, pageProps }) => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <ThemeProvider>
          <CSSReset />
          <Component {...pageProps} />
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
};

export default MyApp;
