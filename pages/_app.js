import { QueryClientProvider, QueryClient } from "react-query";
import "../styles/globals.css";
import { store } from "../redux/store";
import { Provider } from "react-redux";

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }) {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <Component {...pageProps} />;
      </Provider>
    </QueryClientProvider>
  );
}

export default MyApp;
