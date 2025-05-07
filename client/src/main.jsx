import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Provider, useSelector } from "react-redux";
import store from "./redux/store.js";
import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";
import { Toaster } from "./components/ui/sonner";
import LoadingSpinner from "./components/LoadingSpinner";

const persistor = persistStore(store);

const Custom = ({ children }) => {
  const { loading } = useSelector((store) => store.auth);
  return <>{loading ? <LoadingSpinner /> : <>{children}</>}</>;
};

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <Toaster />
      <Custom>
        <PersistGate loading={null} persistor={persistor}>
          <App />
        </PersistGate>
      </Custom>
    </Provider>
  </StrictMode>
);
