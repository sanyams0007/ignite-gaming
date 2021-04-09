import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// Components and Pages
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import Home from "./components/Home";
import GameDetail from "./components/product/GameDetail";

//Styles
import GlobalStyles from "./components/GlobalStyles";

const App = () => {
  return (
    <>
      <Router>
        <GlobalStyles />
        <div className="App">
          <Header />
          <Switch>
            <Route path="/" exact>
              <Home />
            </Route>
            <Route path="/search/:keyword">
              <Home />
            </Route>
            <Route path="/product/:id" exact>
              <GameDetail />
            </Route>
          </Switch>
          <Footer />
        </div>
      </Router>
    </>
  );
};

export default App;
