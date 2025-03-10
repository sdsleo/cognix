import { useRef, useContext } from "react";
import Light from "../../assets/icons/FluentUI/SVGs/Light";
import SingOut from "../../assets/icons/FluentUI/SVGs/SignOut";
// import Wheelchair from "../../assets/icons/FluentUI/SVGs/Wheelchair";
import Info from "../../assets/icons/FluentUI/SVGs/Info";
import LocaleLanguage from "../../assets/icons/FluentUI/SVGs/LocaleLanguage";
import { BoxProfileExpanded } from "./components/BoxProfileExpanded";
import { LanguageSelect } from "./components/LanguageSelect";
import { ThemeSelect } from "./components/ThemeSelect";
// import { FontSizeTitle } from "./components/FontSizeTitle";
// import { FontSizeSelect } from "./components/FontSizeSelect";
// import { ColorHighlightTitle } from "./components/ColorHighlightTitle";
// import { ColorHighlightSelect } from "./components/ColorHighlightSelect";
import { LsmMesClient } from "./components/LsmMesClient";
import { BuildVersion } from "./components/BuildVersion";
import { LastUpdate } from "./components/LastUpdate";
import { useNavigate } from "react-router-dom";
import { useOnClickOutside } from "../../hooks/useOnClickOutside";
import localesContex from "../../context/localesContex";
import { ILocales } from "../../locales/types";
import "./styles.css";
import { AuthContext, AuthProvider } from '../../context/authContext';

export function ModalProfile() {
  const { handleExitUser, userName } = useContext(AuthContext)
  const { localesData } = useContext<ILocales>(localesContex);
  const ref = useRef(null);
  const navigate = useNavigate();

  const handleClickOutside = () => {
    document.querySelector('.cnx-modal-profile-cmp')?.classList.remove('cnx-modal-profile-open-cmpo')
    document.getElementById('cnx-aux-open-modal-caom')?.classList.add('display-none');
    document.getElementById('cnx-aux-close-modal-cacm')?.classList.remove('display-none');
  };

  useOnClickOutside(ref, handleClickOutside);

  return (
    <div ref={ref} className="cnx-modal-profile-cmp">
      <section className="cnx-modal-avatar-profile-container-cmapc">
        <div className="cnx-avatar-large-cal">
          <span className="cnx-avatar-initials-cai">SA</span>
        </div>
        <span className="cnx-modal-profile-user-cpu">
          {userName}
        </span>
        <span className="cnx-modal-profile-email-cpe">
          dev@cognix.com.br
        </span>
        <button className="cnx-btn-logout" onClick={() => {
          handleExitUser()
          navigate("/login")
        }}>
          <SingOut />
          <span>{localesData?.modalProfile?.logoutButton}</span>
        </button>
      </section>
      <section className="cnx-modal-profile-options-container-cmpoc">
        <BoxProfileExpanded
          icon={<LocaleLanguage width="1.3rem" height="1.3rem" />}
          title={localesData?.modalProfile?.laguangeSelectorTitle}
        >
          <LanguageSelect title={localesData?.modalProfile?.laguange?.portuguese} language="pt-br" />
          <LanguageSelect title={localesData?.modalProfile?.laguange?.english} language="en-us" />
          <LanguageSelect title={localesData?.modalProfile?.laguange?.spanish} language="es-es" />
          {/* <LanguageSelect title={localesData?.modalProfile?.laguange?.japanese} language="ja-jp"/> */}
        </BoxProfileExpanded>
        <BoxProfileExpanded
          icon={<Light width="1.3rem" height="1.3rem" />}
          title={localesData?.modalProfile?.themeSelectorTitle}
        >
          <ThemeSelect />
        </BoxProfileExpanded>
        {/* <BoxProfileExpanded
          icon={<Wheelchair width="1.3rem" height="1.3rem" />}
          title={localesData?.modalProfile?.accessibilitySelectorTitle}
        >
          <FontSizeTitle />
          <FontSizeSelect />
          <ColorHighlightTitle />
          <ColorHighlightSelect />
        </BoxProfileExpanded> */}
        <BoxProfileExpanded
          icon={<Info width="1.3rem" height="1.3rem" />}
          title={localesData?.modalProfile?.aboutSelectorTitle}
        >
          <LsmMesClient />
          <BuildVersion />
          <LastUpdate />
        </BoxProfileExpanded>
      </section>
    </div>
  );
}
