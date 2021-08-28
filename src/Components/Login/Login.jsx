import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { LoginStyled } from "./LoginStyled";
import { PrimaryButton, TextField } from "@fluentui/react";
import userLogin from "./../../Assets/login_pic.png";
import { restClient } from "./../../Helpers/restClient";
import { isNull } from "lodash";
import { toast } from "react-toastify";
import { Switch, Redirect, useHistory, withRouter } from "react-router-dom";
import { AppContext } from "../Contexts/AppContext";

const Login = (props) => {
  const context = useContext(AppContext);
  const { changeUserLogged } = context;

  const history = useHistory();
  const [userLoginId, setuserLoginId] = useState("");
  const [userPassword, setuserPassword] = useState("");

  const [userData, setUserData] = useState(null);
  const [isLogin, setIsLogin] = useState(false);

  const onSignIn = (changeUser) => {
    restClient
      .httpPost("user/login", {
        userLogin: userLoginId,
        userPassword: userPassword,
      })
      .then((response) => {
        if (response === null) {
          toast.error(`User doesn't exist`, {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
          });

          return;
        }
        if (
          response &&
          !isNull(response.userLogin) &&
          !isNull(response.password)
        ) {
          setUserData(response);
          sessionStorage.setItem("loginData", JSON.stringify(response));
          toast.success(`Login Successful`, {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
          });
          changeUser(response);
          setIsLogin(true);
        }
      });
  };

  return (
    <div>
      {!isLogin ? (
        <LoginStyled>
          <div className="LoginContainer">
            <img src={userLogin} alt="" className="ImgLogin" />
            <h2>Login</h2>
            <div className="FieldsLogin">
              <TextField
                label="User"
                value={userLoginId}
                onChange={(ev, newValue) => setuserLoginId(newValue)}
              />
              <TextField
                label="Password"
                value={userPassword}
                type="password"
                onChange={(ev, newValue) => setuserPassword(newValue)}
              />
            </div>
            <br />
            <div className="ActionsLogin">
              <PrimaryButton
                onClick={() => {
                  const { changeUserLogged } = context;
                  onSignIn(changeUserLogged);
                }}
              >
                Sign In
              </PrimaryButton>
              <PrimaryButton
                onClick={() => {
                  setuserLoginId("");
                  setuserPassword("");
                }}
              >
                Reset
              </PrimaryButton>
            </div>
          </div>
        </LoginStyled>
      ) : (
        <Redirect to="/home" />
      )}
    </div>
  );
};

Login.propTypes = {};

export default Login;
