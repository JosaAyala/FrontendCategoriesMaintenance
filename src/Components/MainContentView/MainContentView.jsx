import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import NavHeader from "../../Controls/NavHeader/NavHeader";
import { MainContentViewStyled } from "./MainContentViewStyled";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link,
  useLocation,
} from "react-router-dom";
import Home from "../PublicViews/Home/Home";
import Services from "../PublicViews/Services/Services";
import About from "../PublicViews/About/About";
import Login from "../Login/Login";
import Management from "../Management/Management";
import PrivateRoute from "../../SecutityControls/PrivateRoute";
import { restClient } from "../../Helpers/restClient";
import { isArray, isNull, isUndefined } from "lodash";
import { NavHeaderStyled } from "../../Controls/NavHeader/NavHeaderStyled";
import { Label, ActionButton } from "@fluentui/react";

const MainContentView = (props) => {
  const myLocation = useLocation();
  const [isLogin, setIsLogin] = useState(false);

  const [userRoles, setUserRoles] = useState(
    JSON.parse(sessionStorage.getItem("rolesUser"))
  );

  const [currentUser, setCurrentUser] = useState(
    JSON.parse(sessionStorage.getItem("loginData"))
  );

  useEffect(() => {
    const loggedUser = JSON.parse(sessionStorage.getItem("loginData"));

    if (loggedUser === null && currentUser !== null) {
      window.location.reload();
      setCurrentUser(loggedUser);
      return;
    }

    if (currentUser === null && loggedUser !== null) {
      window.location.reload();
      setCurrentUser(loggedUser);
      return;
    }

    if (currentUser !== null && loggedUser !== null) {
      if (
        currentUser.userLogin === loggedUser.userLogin &&
        currentUser.password === loggedUser.password
      ) {
        return;
      }
      window.location.reload();
      setCurrentUser(loggedUser);
      return;
    }
  }, [myLocation]);

  useEffect(() => {
    restClient.httpGet("role/get-all").then((response) => {
      if (!isNull(response) && isArray(response)) {
        sessionStorage.setItem("rolesUser", JSON.stringify(response));
      }
    });
  }, []);

  const onCheckUserSessionStorage = () => {
    const getUserLogin = JSON.parse(sessionStorage.getItem("loginData"));

    if (getUserLogin !== null) {
      if (getUserLogin.roleId === "Admin") {
        return true;
      }
      return false;
    }
    return false;
  };

  return (
    <Router>
      <MainContentViewStyled>
        <NavHeaderStyled>
          <div className="NavContent">
            <div className="ContentTitle">
              <Label className="Title">
                Catrachos Events - The Best Planners for you!!!
              </Label>
            </div>
            <ol className="NavContainer">
              <li key="home" className="NavItem">
                <Link className="Link" to="/home">
                  Home
                </Link>
              </li>
              <li key="services" className="NavItem">
                <Link className="Link" to="/services">
                  Services
                </Link>
              </li>
              <li key="about" className="NavItem">
                <Link className="Link" to="/about">
                  About Us
                </Link>
              </li>
              {onCheckUserSessionStorage() === true && (
                <li key="about" className="NavItem">
                  <Link className="Link" to="/admin">
                    Management
                  </Link>
                </li>
              )}
            </ol>
            <div className="Actions">
              <ActionButton
                iconProps={{
                  iconName: currentUser === null ? "Signin" : "Onboarding",
                }}
                styles={{
                  icon: { color: "white" },
                }}
              >
                <Link
                  href="/login"
                  style={{ textDecoration: "none", color: "white" }}
                >
                  {currentUser === null ? "Sign In" : "Log Out"}
                </Link>
              </ActionButton>
            </div>
          </div>
        </NavHeaderStyled>
        <br className="" />
        {/* <Switch>
          <PrivateRoute
            component={Management}
            // userRoles={userRoles}
            // currentUser={currentUser}
            path="/admin"
            exact
          />
          <Route exact path="/" component={Home} />
          <Route exact path="/home" component={Home} />
          <Route exact path="/services" component={Services} />
          <Route exact path="/about" component={About} />
          <Route exact path={"/login"} component={Login} />
        </Switch> */}
      </MainContentViewStyled>
    </Router>
  );
};

MainContentView.propTypes = {};

export default MainContentView;
