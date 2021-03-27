import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// Components and Pages
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import Home from "./components/Home";
//Styles
import "./App.css";
import GlobalStyles from "./components/GlobalStyles";

const App = () => {
  return (
    <>
      <Router>
        <GlobalStyles />
        <Switch>
          <Route path="/" exact>
            <div className="App">
              <Header />
              <Home />
            </div>
          </Route>
        </Switch>
        <Footer />
      </Router>
    </>
  );
};

export default App;
