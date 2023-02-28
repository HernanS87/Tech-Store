import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import { AdminContextProvider, AuthContextProvider } from "./context";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthContextProvider>
        <AdminContextProvider>
          <App />
        </AdminContextProvider>
      </AuthContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
