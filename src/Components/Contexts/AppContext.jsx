import { render } from "@testing-library/react";
import React, { createContext } from "react";

export const AppContext = createContext();

class AppContextProvider extends React.Component {
  state = {
    userLogged: null,
  };

  changeUserLogged = (userData) => {
    debugger;
    this.setState({
      userLogged: userData,
    });
  };

  render() {
    return (
      <AppContext.Provider
        value={{ ...this.state, changeUserLogged: this.changeUserLogged }}
      >
        {this.props.children}
      </AppContext.Provider>
    );
  }
}

export default AppContextProvider;
