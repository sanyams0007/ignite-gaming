import { useEffect, lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ToastContainer } from "material-react-toastify";
import { ThemeProvider } from "@material-ui/core/styles";
//import useAlan from "./components/hooks/useAlan";

// Components
import Header from "./components/layout/Header";
import Home from "./components/Home";
import GameDetail from "./components/product/GameDetail";
import Footer from "./components/layout/Footer";

import ErrorBoundary from "./components/custom/ErrorBoundary";
import ProtectedRoute from "./components/route/ProtectedRoute";

// Pages/Screens
import Login from "./components/user/Login";
import Register from "./components/user/Register";
import Profile from "./components/user/Profile";

// lazy loaded
/* 
import Dashboard from "./components/admin/dashboard/Dashboard";
import UpdateProfile from "./components/user/UpdateProfile";
import UpdatePassword from "./components/user/UpdatePassword";
import ForgotPassword from "./components/user/ForgotPassword";
import ResetPassword from "./components/user/ResetPassword"; 
 */

import Cart from "./components/cart/Cart";
import Checkout from "./components/cart/Checkout";
import OrderSuccess from "./components/cart/OrderSuccess";

import OrdersList from "./components/order/OrdersList";
import OrderDetail from "./components/order/OrderDetail";

//Styles
import "material-react-toastify/dist/ReactToastify.css";
import "./App.css";
import theme from "./components/Theme/muiTheme";
import Grid from "@material-ui/core/Grid";

// Redux / Context
import { loadUser } from "./actions/userActions";
import store from "./store";
import Loader from "./components/layout/Loader";

const Dashboard = lazy(() => import("./components/admin/dashboard/Dashboard"));
const UpdatePassword = lazy(() => import("./components/user/UpdatePassword"));
const ForgotPassword = lazy(() => import("./components/user/ForgotPassword"));
const ResetPassword = lazy(() => import("./components/user/ResetPassword"));
const UpdateProfile = lazy(() => import("./components/user/UpdateProfile"));

const App = () => {
  //useAlan();
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <>
      <ThemeProvider theme={theme}>
        <Router>
          <Header />
          <Grid
            item
            xs={12}
            container
            component="main"
            style={{ flexGrow: "1" }}
          >
            <Switch>
              <ErrorBoundary>
                <Suspense fallback={<Loader />}>
                  <Route path="/" exact>
                    <Home />
                  </Route>
                  <Route path="/search/:keyword">
                    <Home />
                  </Route>
                  <Route path="/product/:id" exact>
                    <GameDetail />
                  </Route>

                  <Route path="/cart" exact>
                    <Cart />
                  </Route>
                  <ProtectedRoute path="/checkout" exact component={Checkout} />
                  <ProtectedRoute
                    path="/success"
                    exact
                    component={OrderSuccess}
                  />

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

                  <ProtectedRoute
                    path="/orders/me"
                    exact
                    component={OrdersList}
                  />
                  <ProtectedRoute
                    path="/order/:id"
                    exact
                    component={OrderDetail}
                  />

                  <ProtectedRoute
                    path="/dashboard"
                    isAdmin={true}
                    component={Dashboard}
                  />
                </Suspense>
              </ErrorBoundary>
            </Switch>
          </Grid>
          <Footer />
        </Router>

        <ToastContainer
          position="bottom-center"
          autoClose={5000}
          hideProgressBar
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss
          draggable={false}
          pauseOnHover
        />
      </ThemeProvider>
    </>
  );
};

export default App;
