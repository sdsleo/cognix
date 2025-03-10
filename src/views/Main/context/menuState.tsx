import React, { useReducer } from "react";
import MenuContext from "./menuContex";
import menuReducer from "./menuReducer";
import { ACTIONS } from "./menuActions";
import { IState } from "./types";


const MenuState = ({ children }: any) => {
  const initialState: IState = {
    tabsState: [{
      title: "Ordens",
      icon: "EntitlementPolicy",
      id: "cnx-orders",
      tabCount: 1,
      "pt-br": "Ordens",
      "en-us": "Orders",
      "es-es": "Pedidos",
  }],
    pinnedTab: {
      pinned: null,
    },
    factoryPlant: null,
    activeTab: {},
    theme: "dark",
    tabSessionOn: false
  };
  // @ts-ignore
  const temp = {
    title: "Monitoramento Logístico",
    icon: "TVMonitor",
    id: "cnx-monitoramento-logistico",
    tabCount: 1,
    "pt-br": "Monitoramento Logístico",
    "es-es": "Monitoreo Logístico",
    "en-us": "Logistic Monitoring"
  }

  const [state, dispatch] = useReducer(menuReducer, initialState);

  const setTabsState = (data: any) => {
    dispatch({
      type: ACTIONS.SET_MENU_TAB_STATE,
      payload: data,
    });
  };

  const setFactoryPlant = (data: any) => {
    dispatch({
      type: ACTIONS.SET_FACTORY_PLANT,
      payload: data,
    });
  };

  const setTheme = (data: any) => {
    dispatch({
      type: ACTIONS.SET_THEME,
      payload: data,
    });
  };

  const setTabSession = (data: any) => {
    dispatch({
      type: ACTIONS.SET_TAB_SESSION,
      payload: data,
    });
  };

  return (
    <MenuContext.Provider
      value={{
        tabsState: state.tabsState,
        factoryPlant: state.factoryPlant,
        setTabsState,
        setFactoryPlant,
        pinnedTab: state.pinnedTab,
        activeTab: state.activeTab,
        theme: state.theme,
        setTheme,
        tabSessionOn: state.tabSessionOn,
        setTabSession
      }}
    >
      {children}
    </MenuContext.Provider>
  );
};

export default MenuState;
