import React, { useState } from "react";
import PropTypes from "prop-types";
import { ServicesStyled } from "./ServicesStyled";
import planner from "../../../Assets/planner.jpg";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  IconButton,
  PrimaryButton,
} from "@fluentui/react";
import { servicesInfo } from "./servicesInfo";
import { useHistory, withRouter } from "react-router-dom";

const Services = (props) => {
  const [showModal, setshowModal] = useState(false);
  const [selectedItemList, setselectedItemList] = useState(null);
  const [itemToShow, setitemToShow] = useState(null);

  const onShowItemMenu = (idItem) => {
    setselectedItemList(idItem);
    // showModal(true);
    setitemToShow(servicesInfo.find((x) => x.id === idItem));
    setshowModal(true);
  };
  return (
    <ServicesStyled>
      <br />
      <h1>We offer you the following services</h1>
      <br className="" />
      <div className="ContainerListServices">
        <img src={planner} alt="" className="Img" />
        <div className="ListServices">
          <p className="ItemList">
            Kids' Parties
            <IconButton iconProps={{ iconName: "Source" }} />
          </p>
          <p className="ItemList">
            Weddings
            <IconButton iconProps={{ iconName: "Source" }} />
          </p>
          <p className="ItemList">
            Graduations
            <IconButton iconProps={{ iconName: "Source" }} />
          </p>
          <p className="ItemList">
            For Cassual Events
            <IconButton iconProps={{ iconName: "Source" }} />
          </p>
          <p className="ItemList">
            Personalized Event
            <IconButton iconProps={{ iconName: "Source" }} />
          </p>
        </div>
      </div>
      {showModal && (
        <Dialog
          hidden={!showModal}
          onDismiss={() => setshowModal(false)}
          dialogContentProps={{
            title: "Options",
          }}
        >
          <DialogContent>
            {itemToShow.items.map((x) => (
              <p>{x}</p>
            ))}
          </DialogContent>
          <DialogFooter>
            <PrimaryButton onClick={() => setshowModal(false)} text="Ok" />
          </DialogFooter>
        </Dialog>
      )}
    </ServicesStyled>
  );
};

Services.propTypes = {};

export default Services;
