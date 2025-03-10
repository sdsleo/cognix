import { MenuSideBar } from "../../components/MenuSidebar";
import { Tabs } from "../../components/Tabs";
import { MainContainer } from "../../components/MainViewContainer";
import { ModalProfile } from "../../components/ModalProfile";
import MenuProvider from "../Main/context/menuState";
import "./styles.css";

export function Main() {
  return (
    <MenuProvider>
      <div className="cnx-grid-container-cgc">
        <MenuSideBar />
        <Tabs />
        <MainContainer />
        <ModalProfile />
      </div>
    </MenuProvider>
  );
}
