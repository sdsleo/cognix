import { useContext, useEffect, useState } from "react";
import localesContex from "../../../../context/localesContex";
import { ILocales } from "../../../../locales/types";
import { useTheme } from "../../../../hooks/useTheme";
import Sunny from "../../../../assets/icons/FluentUI/SVGs/Sunny";
import ClearNight from "../../../../assets/icons/FluentUI/SVGs/ClearNight";

import "./styles.css";

export function ThemeSelect() {
  const { localesData } = useContext<ILocales>(localesContex);
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    setCnxDefaultConfigTheme()
  }, []);

  const setCnxDefaultConfigTheme = () => {
    const cnxPlatformConfig: string | null = localStorage.getItem(
      "@CNX_MES_PLATFORM_CONFIG"
    );
    if (cnxPlatformConfig) {
      const cnxPlatformConfigObject = JSON.parse(cnxPlatformConfig)
      useTheme(cnxPlatformConfigObject.theme)
      setTheme(cnxPlatformConfigObject.theme)
    }
  };

  const setCnxConfigTheme = (theme: string) => {
    const cnxPlatformConfig: string | null = localStorage.getItem(
      "@CNX_MES_PLATFORM_CONFIG"
    );
    if (cnxPlatformConfig) {
      const cnxPlatformConfigObject = JSON.parse(cnxPlatformConfig)
      cnxPlatformConfigObject.theme = theme
      localStorage.setItem("@CNX_MES_PLATFORM_CONFIG", JSON.stringify(cnxPlatformConfigObject))
    }
  };

  return (
    <div className="cnx-theme-select-container-ctsc">
      <button
        type="button"
        className={theme === 'light' ?  'cnx-theme-select-button-ctsb cnx-theme-select-item-highlight-ctsih' : 'cnx-theme-select-button-ctsb'}
        onClick={() => {
          useTheme("light");
          setCnxConfigTheme('light');
          setTheme('light');
        }}
      >
        <Sunny width="1.3rem" height="1.3rem" />
        <span className="cnx-theme-title-clt">
          {localesData?.modalProfile?.theme?.light}
        </span>
      </button>
      <button
        type="button"
        className={theme === 'dark' ?  'cnx-theme-select-button-ctsb cnx-theme-select-item-highlight-ctsih' : 'cnx-theme-select-button-ctsb'}
        onClick={() => {
          useTheme("dark");
          setCnxConfigTheme('dark');
          setTheme('dark');
        }}
      >
        <ClearNight />
        <span className="cnx-theme-title-clt">
          {localesData?.modalProfile?.theme?.dark}
        </span>
      </button>
    </div>
  );
}
