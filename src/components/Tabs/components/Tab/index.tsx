import { useRef, useState, useContext, useId, useEffect } from "react";
import { useOnClickOutside } from "../../../../hooks/useOnClickOutside";
import ChevronDownMed from "../../../../assets/icons/FluentUI/SVGs/ChevronDownMed";
import Pinned from "../../../../assets/icons/FluentUI/SVGs/Pinned";
import Unpin from "../../../../assets/icons/FluentUI/SVGs/Unpin";
import TabCenter from "../../../../assets/icons/FluentUI/SVGs/TabCenter";
import ChevronUpMed from "../../../../assets/icons/FluentUI/SVGs/ChevronUpMed";
import ChromeClose from "../../../../assets/icons/FluentUI/SVGs/ChromeClose";
import AddFriend from "../../../../assets/icons/FluentUI/SVGs/AddFriend";
import { dynamicSVGImports } from "../../../MenuSidebar/dynamicSVGImports";
import menuContex from "../../../../views/Main/context/menuContex";
import localesContex from "../../../../context/localesContex";
import { ILocales } from "../../../../locales/types";
import { IState } from "../../../../views/Main/context/types";
import "./styles.css";

export function Tab({ tabData, tabIndex }: any) {
  const { currentLanguage } = useContext<ILocales>(localesContex);
  const tabOptionsId = useId();
  const [chevronIcon, setChevronIcon] = useState(false);
  const [refreshState, setRefreshState] = useState(false);
  const ref = useRef(null);
  const { tabsState, setTabsState, pinnedTab, activeTab }: IState =
    useContext(menuContex);

  useEffect(() => {
    handleTabHightLight();
  }, []);

  const handleTabOptions = () => {
    setChevronIcon(!chevronIcon);
    if (chevronIcon) {
      document
        .getElementById(tabOptionsId)
        ?.classList.remove("cnx-tab-options-show");
    } else {
      document
        .getElementById(tabOptionsId)
        ?.classList.add("cnx-tab-options-show");
    }
  };

  const handleRemove = () => {
    document
      .getElementById(tabOptionsId)
      ?.classList.remove("cnx-tab-options-show");
    setChevronIcon(false);
    const newTabs = [...tabsState];
    newTabs.splice(tabIndex, 1);
    setTabsState(newTabs);
  };

  const handleActiveTab = () => {
    activeTab.activeTab = `${tabData.id}${tabIndex}`;
    setRefreshState(!refreshState);
  };

  const handlePinTab = () => {
    setRefreshState(!refreshState);

    pinnedTab.pinned =
      pinnedTab?.pinned?.id === tabData?.id ? { pinned: {} } : tabData;

    const cnxPlatformConfig: any | null = localStorage.getItem(
      "@CNX_MES_PLATFORM_CONFIG"
    );
    if (cnxPlatformConfig) {
      const cnxPlatformConfigObject = JSON.parse(cnxPlatformConfig);
      cnxPlatformConfigObject.pinnedTab = tabData;
      localStorage.setItem(
        "@CNX_MES_PLATFORM_CONFIG",
        JSON.stringify(cnxPlatformConfigObject)
      );
    }
  };

  const handleUnpinTab = () => {
    setRefreshState(!refreshState);

    pinnedTab.pinned =
      pinnedTab?.pinned?.id === tabData?.id ? { pinned: {} } : tabData;

    const cnxPlatformConfig: any | null = localStorage.getItem(
      "@CNX_MES_PLATFORM_CONFIG"
    );
    if (cnxPlatformConfig) {
      const cnxPlatformConfigObject = JSON.parse(cnxPlatformConfig);
      cnxPlatformConfigObject.pinnedTab = null;
      localStorage.setItem(
        "@CNX_MES_PLATFORM_CONFIG",
        JSON.stringify(cnxPlatformConfigObject)
      );
    }
  };

  const handleDuplicateTab = () => {
    const intercept = tabsState.filter((tab: any) => tab.id == tabData.id);
    const newTab = {
      title: tabData.title,
      ["pt-br"]: tabData["pt-br"],
      ["en-us"]: tabData["en-us"],
      ["es-es"]: tabData["es-es"],
      icon: tabData.icon,
      id: tabData.id,
      tabCount: intercept.length + 1,
    };

    setTabsState([...tabsState, newTab]);
  };

  const handleClickOutside = () => {
    document
      .getElementById(tabOptionsId)
      ?.classList.remove("cnx-tab-options-show");
    setChevronIcon(false);
    // document.querySelector('.cnx-factory-plant-ul-cfpu')?.classList.remove('cnx-factory-plant-ul-show-cfpus');
  };

  const handleTabHightLight = () => {
    const inactiveTabs = document.querySelectorAll(
      ".cnx-container-dynamic-ccd"
    );
    // for (const inactiveTab of inactiveTabs) {
    //   inactiveTab.setAttribute("style", "order:5;");
    // }
    for (let i = 0; i < inactiveTabs.length; i++) {
      inactiveTabs[i].setAttribute("style", `order:${i + 2};`);
    }

    const activeTab: any = document.querySelector(
      `.${tabData.id}${tabData.tabCount}`
    );
    activeTab!.setAttribute("style", "order:1;");

    // console.log('pinnedTab?.pinned?.id', pinnedTab?.pinned?.id);
    // console.log('tabData?.id', tabData?.id);
    const nodeList = document.querySelectorAll(".cnx-tab-ct");

    nodeList.forEach(function (element) {
      element.classList.remove("cnx-tab-hightlight-cth");
    });

    document
      .getElementById(`${tabData.id}${tabIndex}`)
      ?.classList.add("cnx-tab-hightlight-cth");
  };

  useOnClickOutside(ref, handleClickOutside);
  return (
    <div ref={ref} className="cnx-tab-container-ctc">
      <div id={`${tabData.id}${tabIndex}`} className="cnx-tab-ct">
        <div
          className="cnx-tab-click-area-ctca"
          onClick={() => handleTabHightLight()}
        >
          <button
            className="cnx-tab-icon-module-ctim"
            type="button"
            onClick={() => handleTabOptions()}
          >
            {/* <AddFriend className="cnx-tab-icon-cti"/> */}
            <span className="cnx-tab-icon-cti">
              {dynamicSVGImports(tabData?.icon)}
            </span>
            {/* <ChevronDownMed className="cnx-tab-icon-chevron-down-cticd" /> */}
            {chevronIcon ? (
              <ChevronUpMed className="cnx-tab-icon-chevron-down-cticd" />
            ) : (
              <ChevronDownMed className="cnx-tab-icon-chevron-down-cticd" />
            )}
            {/* <span className='cnx-tab-icon-chevron-ctic'>icon2</span> */}
          </button>
          <span className="cnx-tab-title-module-cttm">
            {tabData[currentLanguage]}
          </span>
        </div>
        <button
          className="cnx-tab-icon-close-ctic"
          type="button"
          onClick={() => handleRemove()}
        >
          <ChromeClose width="0.6rem" height="0.6rem" />
        </button>
      </div>
      <div id={tabOptionsId} className="cnx-tab-options-cto">
        <ul className="cnx-tab-ul-options-ctuo">
          <li className="cnx-tab-li-options-ctlo">
            {/* <button
              className="cnx-tab-btn-options-ctbo"
              type="button"
              onClick={() => handlePinTab()}
            >
              {pinnedTab?.pinned?.id === tabData?.id ? (
                <>
                  <Unpin className="cnx-tab-un-pin-ctup" />
                  <span>Desfixar Iniciar</span>
                </>
              ) : (
                <>
                  <Pinned />
                  <span>Fixar Iniciar</span>
                </>
              )}
            </button> */}
            {pinnedTab?.pinned?.id === tabData?.id ? (
              <button
                className="cnx-tab-btn-options-ctbo"
                type="button"
                onClick={() => handleUnpinTab()}
              >
                <>
                  <Unpin className="cnx-tab-un-pin-ctup" />
                  <span>Desfixar Iniciar</span>
                </>
              </button>
            ) : (
              <button
                className="cnx-tab-btn-options-ctbo"
                type="button"
                onClick={() => handlePinTab()}
              >
                <>
                  <Pinned />
                  <span>Fixar Iniciar</span>
                </>
              </button>
            )}
          </li>
          <li className="cnx-tab-li-options-ctlo">
            <button className="cnx-tab-btn-options-ctbo" type="button" onClick={() => handleDuplicateTab()}>
              <TabCenter />
              <span>Duplicar Aba</span>
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}
