import React, { useState, useContext } from "react";
import {
  Nav,
  INavLink,
  INavStyles,
  INavLinkGroup,
} from "@fluentui/react/lib/Nav";
import PropTypes from "prop-types";
import { ManagementStyled } from "./ManagementStyled";
import UserManagement from "./Components/UsersManagament/UserManagement";
import CategoriesSubcategories from "./Components/CategoriesSubCategoriesManagement/CategoriesSubcategories";
import { AppContext } from "../Contexts/AppContext";

const Management = (props) => {
  const context = useContext(AppContext);
  const { userLogged } = context;
  const [selectedNavItem, setselectedNavItem] = useState("users");

  const onClickNavItem = (ev, item) => {
    setselectedNavItem(item.key);
  };
  return (
    <ManagementStyled>
      <div className="ContainerManagement">
        <Nav
          onLinkClick={onClickNavItem}
          selectedKey={selectedNavItem}
          styles={{
            root: {
              width: "auto",
              height: "600px",
              boxSizing: "border-box",
              border: "1px solid #eee",
              overflowY: "auto",
            },
            link: {
              whiteSpace: "normal",
              lineHeight: "inherit",
            },
          }}
          groups={[
            {
              links: [
                {
                  name: "Users",
                  key: "users",
                  title: "",
                  isExpanded: true,
                  icon: "ContactCardSettings",
                  disabled:
                    userLogged === null ||
                    (userLogged && userLogged.roleId !== "Admin"),
                },
                {
                  name: "Categories & Subcategories",
                  key: "categories",
                  title: "",
                  isExpanded: true,
                  icon: "Settings",
                },
              ],
            },
          ]}
        />
        <div className="">
          {selectedNavItem === "users" && <UserManagement />}
          {selectedNavItem === "categories" && <CategoriesSubcategories />}
        </div>
      </div>
    </ManagementStyled>
  );
};

Management.propTypes = {};

export default Management;
