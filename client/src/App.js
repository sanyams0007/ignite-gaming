import { useEffect } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// Components and Pages
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import Home from "./components/Home";
import GameDetail from "./components/product/GameDetail";
import Profile from "./components/user/Profile";
import UpdateProfile from "./components/user/UpdateProfile";
import UpdatePassword from "./components/user/UpdatePassword";
import ForgotPassword from "./components/user/ForgotPassword";
import ResetPassword from "./components/user/ResetPassword";
import Login from "./components/user/Login";
import Register from "./components/user/Register";
import ProtectedRoute from "./components/route/ProtectedRoute";

//Styles
import "./App.css";
import { ThemeProvider } from "@material-ui/core/styles";
import theme from "./components/muiTheme";
import Grid from "@material-ui/core/Grid";

import { loadUser } from "./actions/userActions";
import store from "./store";

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <>
      <ThemeProvider theme={theme}>
        <Router>
          <Grid
            container
            alignContent="space-between"
            style={{ height: "100%" }}
          >
            <Grid item xs={12}>
              <Header />
            </Grid>
            <Grid item xs={12} container style={{ border: "2px solid red" }}>
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
                <Route path="/login" exact>
                  <Login />
                </Route>
                <Route path="/register" exact>
                  <Register />
                </Route>
                <Route path="/password/forgot" exact>
                  <ForgotPassword />
                </Route>
                <Route path="/password/reset/:token" exact>
                  <ResetPassword />
                </Route>

                <ProtectedRoute path="/me" exact component={Profile} />
                <ProtectedRoute
                  path="/me/update"
                  exact
                  component={UpdateProfile}
                />
                <ProtectedRoute
                  path="/password/update"
                  exact
                  component={UpdatePassword}
                />
              </Switch>
            </Grid>
            <Grid item xs={12}>
              <Footer />
            </Grid>
          </Grid>
        </Router>
      </ThemeProvider>
    </>
  );
};

export default App;
