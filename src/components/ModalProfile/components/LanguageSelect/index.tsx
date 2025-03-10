import { useContext, useEffect, useState } from "react";
import { ILanguageSelect } from "./types";
import LocaleLanguage from "../../../../assets/icons/FluentUI/SVGs/LocaleLanguage";
import localesContex from "../../../../context/localesContex";
import "./styles.css";

export function LanguageSelect({ title, language }: ILanguageSelect) {
  const { setCurrentLaguange }: any = useContext(localesContex);

  useEffect(() => {
    setCnxDefaultConfigLanguage();
  }, []);

  const setCnxDefaultConfigLanguage = () => {
    const cnxPlatformConfig: string | null = localStorage.getItem(
      "@CNX_MES_PLATFORM_CONFIG"
    );
    if (cnxPlatformConfig) {
      const cnxPlatformConfigObject = JSON.parse(cnxPlatformConfig);

      if (cnxPlatformConfigObject.language === language) {
        setCurrentLaguange(language);
      }
    }
  };

  const checkItemLanguageHighlight = () => {
    const cnxPlatformConfig: string | null = localStorage.getItem(
      "@CNX_MES_PLATFORM_CONFIG"
    );
    if (cnxPlatformConfig) {
      const cnxPlatformConfigObject = JSON.parse(cnxPlatformConfig);

      if (cnxPlatformConfigObject.language === language) {
        return true;
      } else {
        return false;
      }
    }
  };

  const setCnxConfigLanguage = (language: string) => {
    const cnxPlatformConfig: string | null = localStorage.getItem(
      "@CNX_MES_PLATFORM_CONFIG"
    );
    if (cnxPlatformConfig) {
      const cnxPlatformConfigObject = JSON.parse(cnxPlatformConfig);
      cnxPlatformConfigObject.language = language;
      localStorage.setItem(
        "@CNX_MES_PLATFORM_CONFIG",
        JSON.stringify(cnxPlatformConfigObject)
      );
    }
  };
  return (
    <div className="cnx-language-container-clc">
      <button
        type="button"
        className={
          checkItemLanguageHighlight()
            ? "cnx-language-button-clb cnx-language-select-item-highlight-clsih"
            : "cnx-language-button-clb"
        }
        onClick={() => {
          setCurrentLaguange(language);
          setCnxConfigLanguage(language);
        }}
      >
        <LocaleLanguage />
        <span className="cnx-language-title-clt">{title}</span>
      </button>
    </div>
  );
}
