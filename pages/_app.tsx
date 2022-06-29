import "styles/globals.css";
import type { AppProps } from "next/app";
import { ThemeProvider } from "@mui/material/styles";
import { defaultTheme } from "styles/theme/defaultTheme";
import { store } from "@/redux/store";
import { Provider } from "react-redux";
import { ErrorBoundary } from "react-error-boundary";
import ErrorFallbackComponent from "components/ErrorFallbackComponent";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <ErrorBoundary
        FallbackComponent={ErrorFallbackComponent}
        onReset={() => {
          window.location.reload();
        }}
      >
        <ThemeProvider theme={defaultTheme}>
          <Component {...pageProps} />
        </ThemeProvider>
      </ErrorBoundary>
    </Provider>
  );
}
export default MyApp;
