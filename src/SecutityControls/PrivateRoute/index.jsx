import React, { useContext } from "react";
import PropTypes from "prop-types";
import { Route, Redirect } from "react-router-dom";
import { isNull, isUndefined, includes } from "lodash";
import { AppContext } from "../../Components/Contexts/AppContext";

const PrivateRoute = ({
  component: Component,
  //   userRoles,
  //   currentUser,
  path,
}) => {
  const context = useContext(AppContext);
  return (
    <Route
      path={path}
      render={(props) => {
        const { userLogged } = context;
        if (userLogged === null) {
          // not logged in so redirect to login page with the return url
          return <Redirect to={{ pathname: "/home" }} />;
        }

        if (userLogged.roleId === "Public" || userLogged.roleId === "User") {
          return (
            <Redirect
              to={{ pathname: "/home", state: { from: props.location } }}
            />
          );
        }

        return <Component {...props} />;
      }}
    />
  );
};

export default PrivateRoute;
