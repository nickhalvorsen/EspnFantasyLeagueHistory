import "./app.css";
import { ThemeProvider } from "./layout/theme-provider.tsx";
import { Nav } from "./layout/nav.tsx";
import ManagerStats from "./managerStats.tsx";
import { Home } from "./home.tsx";
import { useLoadData } from "./data/useLoadData.ts";
import { DelayedLoading } from "./layout/delayedLoading.tsx";
import { HashRouter, Route, Routes } from "react-router-dom";

const App = () => {
  const { isLoading } = useLoadData();
  if (isLoading) {
    return (
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <DelayedLoading isLoading={true} delay={1500}>
          Loading...
        </DelayedLoading>
      </ThemeProvider>
    );
  }
  return (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <HashRouter>
          <Nav />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/managers/:manager" element={<ManagerStats />} />
          </Routes>
        </HashRouter>
      </ThemeProvider>
    </>
  );
};

export default App;
