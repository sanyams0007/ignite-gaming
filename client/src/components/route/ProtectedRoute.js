import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const { isAuthenticated, loading } = useSelector((state) => state.auth);

  return (
    <>
      {loading === false && (
        <Route
          {...rest}
          render={(props) => {
            if (isAuthenticated === false) {
              return <Redirect to="/login" />;
            }
            return <Component {...props} />;
          }}
        />
        /* <Route {...rest}>
          {isAuthenticated ? <Component /> : <Redirect to="/login" />}
        </Route> */
      )}
    </>
  );
};

export default ProtectedRoute;
