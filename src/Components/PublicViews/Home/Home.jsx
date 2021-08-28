import React, { useState, useEffect, useContext } from "react";
import PropTypes from "prop-types";
import { HomeStyled } from "./HomeStyled";
import planners from "../../../Assets/planners.jpg";
import { Label } from "@fluentui/react";
import { useHistory, withRouter } from "react-router-dom";
import { AppContext } from "../../Contexts/AppContext";

const Home = (props) => {
  const context = useContext(AppContext);
  const { userLogged } = context;
  debugger;
  return (
    <HomeStyled>
      <div className="HomeContainer">
        {userLogged !== null && <h2>Welcome {userLogged.name}</h2>}

        <br />
        <h1>Professional Planners for your events</h1>
        <Label>
          Enjoy your events and save your memories with our services
        </Label>
        <br className="" />
        <img src={planners} className="Img" />
      </div>
    </HomeStyled>
  );
};

Home.propTypes = {};

export default Home;
