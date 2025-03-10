import { useState, useId, useRef, useEffect, useContext } from "react";
import { UseContext } from "../../context/moduleContext";
import { ACTIONS } from "../../context/moduleActions";
import UserGroups from "../UserGroups";
import UserPermissions from "../UserPermissions";
import "./styles.css";

function NavigationContainer() {
  const { dispacth, page } = useContext(UseContext);
  const setActivePage = (page: string) => {
    // if (page === 'user') {
    //     document.querySelector('.cnx-user-crumb-skills-cucs')?.classList.add('cnx-display-none');
    //     document.querySelector('.cnx-user-crumb-historic-cuch')?.classList.remove('cnx-display-none')
    // }
    // if (page === 'skills') {
    //     document.querySelector('.cnx-user-crumb-historic-cuch')?.classList.add('cnx-display-none');
    // }
    // if (page === 'historic') {
    //     document.querySelector('.cnx-user-crumb-historic-cuch')?.classList.remove('cnx-display-none');
    // }
    dispacth({
      type: ACTIONS.SET_ACTIVE_PAGE,
      payload: page,
    });
  };
  return (
    <>
      <div className="cnx-groups-breadcrumbs-cgb">

        {page === "permissions" ? (
          <>
            <span
              className="cnx-groups-crumb-groups-cgcg cnx-groups-hint-crumb-cghc"
              onClick={() => setActivePage("groups")}
            >
              Adicionar Grupo de Usuários /{" "}
            </span>
            <span
              className="cnx-groups-crumb-permissions-cgcp"
              onClick={() => setActivePage("permissions")}
            >
              Permissões
            </span>
          </>
        ) : null}
      </div>
      {page === "groups" ? <UserGroups /> : null}
      {page === "permissions" ? <UserPermissions /> : null}
    </>
  );
}

export default NavigationContainer;
