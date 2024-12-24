import AppRoutes from "./routes/AppRoutes.jsx";
import {BrowserRouter} from "react-router";
import {ThemeProvider} from "./components/theme-provider.jsx";

const App = () => {
    return (
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <BrowserRouter>
            <AppRoutes />
        </BrowserRouter>
        </ThemeProvider>
    );
};

export default App;