import React from "react";

import { ContextProvider } from "./context/moduleContext";

import NavigationContainer from "./components/NavigationContainer";

import "./styles.css";

const Workflow = () => {
  return (
    <div className="cnx-user-main-container-cutc">
      <ContextProvider>
        <NavigationContainer />
      </ContextProvider>
    </div>
  );
};

export default Workflow;