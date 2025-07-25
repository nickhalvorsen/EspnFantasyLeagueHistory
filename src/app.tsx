import "./app.css";
import { ThemeProvider } from "./theme-provider";
import { Nav } from "./nav";
import { Route } from "wouter";
import ManagerStats from "./managerStats.tsx";
import { Home } from "./home.tsx";
import { useLoadData } from "./useData.ts";
import { Footer } from "./footer.tsx";

const App = () => {
  useLoadData();
  return (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Nav leagueName="XFL :POG:" />
        <Route path="/" component={Home} />
        <Route path="/managers/:manager">
          {(params) => <ManagerStats manager={params.manager} />}
        </Route>
        <Footer />
      </ThemeProvider>
    </>
  );
};

export default App;
