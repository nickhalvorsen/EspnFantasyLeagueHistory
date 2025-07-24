import "./app.css";
import { ThemeProvider } from "./theme-provider";
import { Nav } from "./nav";
import { Link, Route } from "wouter";
import ManagerStats from "./managerStats.tsx";
import { Home } from "./home.tsx";

const App = () => {
  return (
    <>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Nav leagueName="XFL :POG:" />
        <Route path="/" component={Home} />
        <Route path="/managers/:manager">
          {(params) => <ManagerStats manager={params.manager} />}
        </Route>
      </ThemeProvider>
    </>
  );
};

export default App;
