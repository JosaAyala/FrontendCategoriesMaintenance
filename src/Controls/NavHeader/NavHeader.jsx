import React, { useEffect, useState, useContext } from "react";
import PropTypes from "prop-types";
import { Link, Redirect, useHistory } from "react-router-dom";
import { NavHeaderStyled } from "./NavHeaderStyled";
import { ActionButton, Icon, IconButton, Label } from "@fluentui/react";
import { isNull, isUndefined } from "lodash";
import { AppContext } from "../../Components/Contexts/AppContext";

const propTypes = {};

const NavHeader = () => {
  return (
    <AppContext.Consumer>
      {(context) => {
        const { userLogged, changeUserLogged } = context;
        return (
          <NavHeaderStyled>
            <div className="NavContent">
              <div className="ContentTitle">
                <Label className="Title">
                  Catrachos Events - The Best Planners for you!!!
                </Label>
              </div>
              <ol className="NavContainer">
                <li key="home" className="NavItem">
                  <Link className="Link" to="/home" href="/home">
                    Home
                  </Link>
                </li>
                <li key="services" className="NavItem">
                  <Link className="Link" to="/services" href="/services">
                    Services
                  </Link>
                </li>
                <li key="about" className="NavItem">
                  <Link className="Link" to="/about" href="/about">
                    About Us
                  </Link>
                </li>
                {userLogged !== null &&
                  (userLogged.roleId === "Admin" ||
                    userLogged.roleId === "User") && (
                    <li key="about" className="NavItem">
                      <Link className="Link" to="/admin" href="/admin">
                        Management
                      </Link>
                    </li>
                  )}
              </ol>
              <div className="Actions">
                <ActionButton
                  iconProps={{
                    iconName: userLogged === null ? "Signin" : "Onboarding",
                  }}
                  styles={{
                    icon: { color: "white" },
                  }}
                  onClick={() => {
                    userLogged !== null && changeUserLogged(null);
                  }}
                >
                  <Link
                    href="/login"
                    to="/login"
                    style={{ textDecoration: "none", color: "white" }}
                  >
                    {userLogged === null ? "Sign In" : "Log Out"}
                  </Link>
                </ActionButton>
              </div>
            </div>
          </NavHeaderStyled>
        );
      }}
    </AppContext.Consumer>
  );
};

NavHeader.propTypes = propTypes;

export default NavHeader;
