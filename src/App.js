import React, { useEffect, useState } from "react";
import "./App.css";
import Login from "./Components/Login/Login";
import Home from "./Components/PublicViews/Home/Home";
import Services from "./Components/PublicViews/Services/Services";
import About from "./Components/PublicViews/About/About";
import MainContentView from "./Components/MainContentView/MainContentView";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  useHistory,
  useLocation,
  withRouter,
} from "react-router-dom";
import PrivateRoute from "./SecutityControls/PrivateRoute";
import Management from "./Components/Management/Management";
import NavHeader from "./Controls/NavHeader/NavHeader";
import AppContextProvider from "./Components/Contexts/AppContext";

const App = () => {
  return (
    <div className="App">
      <AppContextProvider>
        <Router>
          <NavHeader />
          <Switch>
            <PrivateRoute component={Management} path="/admin" exact />
            <Route exact path="/" component={Home} />
            <Route exact path="/home" component={Home} />
            <Route exact path="/services" component={Services} />
            <Route exact path="/about" component={About} />
            <Route exact path={"/login"} component={Login} />
          </Switch>
        </Router>{" "}
      </AppContextProvider>
    </div>
  );
};

export default App;
