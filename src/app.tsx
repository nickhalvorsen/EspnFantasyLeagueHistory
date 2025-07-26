import "./app.css";
import { ThemeProvider } from "./layout/theme-provider.tsx";
import { Nav } from "./layout/nav.tsx";
import { Route } from "wouter";
import ManagerStats from "./managerStats.tsx";
import { Home } from "./home.tsx";
import { useLoadData } from "./useData.ts";
import { Footer } from "./layout/footer.tsx";

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
