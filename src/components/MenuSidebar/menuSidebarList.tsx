import { useContext, useEffect } from "react";
import { MenuExpandBoxButton } from "./components/MenuExpandBoxButton";
import { MenuBoxButton } from "./components/MenuBoxButton";
import menuContex from "../../views/Main/context/menuContex";
// import json from "./menu.json";
import json from "./tempMenu.json";
import { dynamicSVGImports } from "./dynamicSVGImports";
import { useMediaQuery } from "../../hooks/useMediaQuery";
import localesContex from "../../context/localesContex";
import { ILocales } from "../../locales/types";
import { IMenuJSON } from "./types";
import { IState } from "../../views/Main/context/types";

export function menuSidebarList() {
  const matches = useMediaQuery("(max-width: 820px)");
  const { currentLanguage } = useContext<ILocales>(localesContex);
  const jsonData: any = json;
  const { factoryPlant, tabsState, setTabsState, tabSessionOn, setTabSession, pinnedTab }: IState =
    useContext(menuContex);

  useEffect(() => {
    // const cnxTabSessionOn: string | null = sessionStorage.getItem(
    //   "@CNX_TAB_SESSION_ON"
    // );
    if (!tabSessionOn) {
      const cnxPlatformConfig: string | null = localStorage.getItem(
        "@CNX_MES_PLATFORM_CONFIG"
      );

      if (cnxPlatformConfig) {
        const cnxPlatformConfigObject = JSON.parse(cnxPlatformConfig)
        if (cnxPlatformConfigObject.pinnedTab) {
          const newTab = {
            title: cnxPlatformConfigObject?.pinnedTab?.title,
            ["pt-br"]: cnxPlatformConfigObject?.pinnedTab["pt-br"],
            ["en-us"]: cnxPlatformConfigObject?.pinnedTab["en-us"],
            ["es-es"]: cnxPlatformConfigObject?.pinnedTab["es-es"],
            icon: cnxPlatformConfigObject?.pinnedTab?.icon,
            id: cnxPlatformConfigObject?.pinnedTab?.id,
            tabCount: 1,
          };
          pinnedTab.pinned = newTab;
      
          setTabsState([...tabsState, newTab]);
        }

      }

    }
  }, []);

  const addTabs = (moduleItem: any) => {
    setTabSession(true)
    if (matches && tabsState.length >= 2) {
      alert("Limite de abas exedido para este tamanho de tela");
      return;
    }
    if (tabsState.length >= 10) {
      alert("Limite de abas exedido");
      return;
    }
    const intercept = tabsState.filter((tab: any) => tab.id == moduleItem.id);
    const newTab = {
      title: moduleItem.title,
      ["pt-br"]: moduleItem["pt-br"],
      ["en-us"]: moduleItem["en-us"],
      ["es-es"]: moduleItem["es-es"],
      icon: moduleItem.icon,
      id: moduleItem.id,
      tabCount: intercept.length + 1,
    };

    setTabsState([...tabsState, newTab]);
  };

  const currentFactoryPlant = factoryPlant
    ? factoryPlant
    : jsonData.data.factoryPlants[0];
  const modulesList = currentFactoryPlant?.modules?.map((item: any) => {
    if (item?.submenu) {
      const sub = item?.submenu.map((itemSub: any) => {
        return (
          <MenuBoxButton
            key={itemSub?.id}
            title={itemSub?.[currentLanguage]}
            icon={dynamicSVGImports(itemSub?.icon)}
            fn={() => addTabs(itemSub)}
          />
        );
      });
      return (
        <MenuExpandBoxButton
          key={item?.id}
          title={item?.[currentLanguage]}
          icon={dynamicSVGImports(item?.icon)}
        >
          {sub}
        </MenuExpandBoxButton>
      );
    }
    return (
      <MenuBoxButton
        key={item?.id}
        title={item?.[currentLanguage]}
        icon={dynamicSVGImports(item?.icon)}
        fn={() => addTabs(item)}
      />
    );
  });

  return modulesList;
}
