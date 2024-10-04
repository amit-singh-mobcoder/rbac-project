import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { RoleProvider } from "./context/Role.jsx";
import { UserProvider } from "./context/User.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RoleProvider>
      <UserProvider>
        <App />
      </UserProvider>
    </RoleProvider>
  </StrictMode>
);
