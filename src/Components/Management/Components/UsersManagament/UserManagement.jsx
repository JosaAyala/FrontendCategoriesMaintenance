import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { UserManagementStyled } from "./UserManagementStyled";
import { restClient } from "../../../../Helpers/restClient";
import { PrimaryButton } from "@fluentui/react";

const UserManagement = (props) => {
  const [usersData, setusersData] = useState([]);
  const [editUser, seteditUser] = React.useState(false);
  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = () => {
    restClient.httpGet("user/get-all", {}).then((response) => {
      setusersData(response);
    });
  };
  return (
    <UserManagementStyled>
      <h1 className="">User Management</h1>
      <br className="" />
      <h3 className="">Existing Users</h3>
      <div className="ContainerUsers">
        {usersData &&
          usersData.map((user, index) => (
            <div key={index} className="CardItem">
              <div className="CardHeader">
                Nombre: {user.name} {user.lastName}
              </div>
              <div className="CardBody">
                <br className="" />
                <div>User Login: {user.userLogin}</div>
                <div>Role: {user.roleId}</div>
                <br className="" />
              </div>
              <div className="CardFooter">
                <PrimaryButton disabled={user.userLogin === "admin"}>
                  Edit
                </PrimaryButton>
              </div>
            </div>
          ))}
      </div>
    </UserManagementStyled>
  );
};

UserManagement.propTypes = {};

export default UserManagement;
