import React, { useContext, useEffect, useRef } from "react";
// import { useMenuUpdate } from '../../views/Main/MenuContext';
import CnxLogo from "../../assets/icons/CnxIcons/CnxLogo";
// import ChevronDownMed from '../assets/icons/FluentUI/SVGs/ChevronDownMed';
import Ringer from "../../assets/icons/FluentUI/SVGs/Ringer";
import Unknown from "../../assets/icons/FluentUI/SVGs/Unknown";
import Separator from "../../assets/icons/FluentUI/SVGs/Separator";
import { FactoryPlantSelector } from "./components/FactoryPlantSelector";
import { Tab } from "./components/Tab";
import menuContex from "../../views/Main/context/menuContex";
import "./styles.css";
import { IState } from "../../views/Main/context/types";
import { AuthContext } from '../../context/authContext';

export function Tabs({ tabs, setTabs }: any) {
  const { userName } = useContext(AuthContext)
  // const update: any = useMenuUpdate();
  const hopen = useRef(false);
  const { tabsState, setTabsState }: IState = useContext(menuContex);
  // const temp = (tabName: any) => {
  //   const inactiveTabs = document.querySelectorAll(".cnx-container-dynamic-ccd");
  //   for (const inactiveTab of inactiveTabs) {
  //     inactiveTab.setAttribute("style", "order:5;");
  //   }

  //   const activeTab = document.getElementById(tabName);
  //   activeTab!.setAttribute("style", "order:1;");
  // };

  const addClass = () => {

    document
      .querySelector(".cnx-menu-sidebar-cms")!
      .classList.toggle("cnx-menu-side-bar-expanded-cmsbe");

  };

  function checkFluency() {
    document
      .getElementById("cnx-checkbox-menu-ccm")
      ?.classList.toggle("cnx-menu-h");
    addClass();
  }

  // {tabs?.map((tab: any, index: any) => (
  //     <div>
  //         <button type="button" onClick={() => temp(tab.tabName)}>{tab.tabName}</button>
  //         <button type="button" onClick={() => handleRemove(index)}>x</button>
  //     </div>
  // ))}

  function cnxScroll() {
    const element: any = document.querySelector("#cnx-tab-scroll-cts");

    element.addEventListener("wheel", (event: any) => {
      event.preventDefault();

      element.scrollBy({
        left: event.deltaY < 0 ? -30 : 30,
      });
    });
  }

  useEffect(() => {
    cnxScroll();
  }, []);

  const handleOpenModalProfile = () => {
    document
      .querySelector(".cnx-modal-profile-cmp")
      ?.classList.add("cnx-modal-profile-open-cmpo");
    document
      .getElementById("cnx-aux-close-modal-cacm")
      ?.classList.add("display-none");
    document
      .getElementById("cnx-aux-open-modal-caom")
      ?.classList.remove("display-none");

    document
      .getElementById("cnx-checkbox-menu-ccm")
      ?.classList.remove("cnx-menu-h");
    document
      .querySelector(".cnx-menu-sidebar-cms")!
      .classList.remove("cnx-menu-side-bar-expanded-cmsbe");
  };

  const handleCloseModalProfile = () => {
    document
      .getElementById("cnx-aux-open-modal-caom")
      ?.classList.add("display-none");
    document
      .getElementById("cnx-aux-close-modal-cacm")
      ?.classList.remove("display-none");
  };

  return (
    <div className="cnx-tab-bar">
      <div className="cnx-tab-left-ctl">
        <div className="cnx-logo-hamburger-clh">
          <div className="cnx-logo-container-clc">
            <CnxLogo width="2.5rem" height="2.5rem" color="#F0831B" />
          </div>
          <div className="cnx-menu-hamburger-container-cmhc">
            <div className="container">
              <button
                type="button"
                id="cnx-checkbox-menu-ccm"
                onClick={checkFluency}
              />

              <label htmlFor="cnx-checkbox-menu-ccm">
                <span></span>
                <span></span>
                <span></span>
              </label>
            </div>
            {/* <button type='button' onClick={() => addClass()}>|||</button> */}
            {/* <button type='button' onClick={() => update([1,2,3])}>UPDATE</button>
                        <button type='button' onClick={() => update([1,3])}>UPDATE2</button> */}
          </div>
        </div>

        <FactoryPlantSelector />
      </div>

      <section id="cnx-tab-scroll-cts" className="cnx-tab-center-ctc">
        {tabsState?.map((tab: any, index: number) => (
          <Tab tabData={tab} tabIndex={index} />
        ))}
      </section>

      <div className="cnx-tab-right-ctr">
        <div className="cnx-right-icons-cri">
          {/* <Ringer className="cnx-ringer" />
          <Unknown className="cnx-unknown" /> */}
        </div>
        <div className="cnx-logged-user-clu">
          <span>{userName}</span>
          <span>Cognix</span>
        </div>
        <div className="cnx-avatar-container-cac">
          <button
            id="cnx-aux-close-modal-cacm"
            className="cnx-avatar-button-cab"
            onClick={() => handleOpenModalProfile()}
          >
            <span>SA</span>
          </button>
          <button
            id="cnx-aux-open-modal-caom"
            className="cnx-avatar-button-cab display-none"
            onClick={() => handleCloseModalProfile()}
          >
            <span>SA</span>
          </button>
        </div>
      </div>
    </div>
  );
}
