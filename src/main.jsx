import { createRoot } from "react-dom/client";
import App from "./App.jsx";

// import { Provider as ReduxProvider } from "react-redux";
import { Provider as ReduxProvider } from "@/contexts/ReduxContext.jsx";

import store from "@/store/index";

console.log(store);

createRoot(document.getElementById("root")).render(
  <ReduxProvider store={store}>
    <App />
  </ReduxProvider>
);
