import React from "react";
import PropTypes from "prop-types";
import { AboutStyled } from "./AboutStyled";
import { useHistory, withRouter } from "react-router-dom";

const About = (props) => {
  return (
    <AboutStyled>
      <div className="ContainerAbout">
        <h1 className="">Contact Us</h1>
        <p className="">
          <strong>Create an account for get a personalized service</strong>
        </p>
        <p className="">
          We are ready to give you a personalized service with quality and
          commitment
        </p>
      </div>
    </AboutStyled>
  );
};

About.propTypes = {};

export default About;
