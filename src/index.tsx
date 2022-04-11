// React 18 ver
import { createRoot } from "react-dom/client";
import App from "./App";
// import { ThemeProvider } from "styled-components";
// import { DarkMode, LightMode, Theme } from "./theme";
import { QueryClientProvider, QueryClient } from "react-query";

const rootElement = document.querySelector("#root");
if (!rootElement) throw new Error("Failed to find the root element");
const root = createRoot(rootElement);

const queryClient = new QueryClient();

root.render(
    <QueryClientProvider client={queryClient}>
        <App />
    </QueryClientProvider>
);
