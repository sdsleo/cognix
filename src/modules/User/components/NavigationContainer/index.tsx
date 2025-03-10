import { useState, useId, useRef, useEffect, useContext } from "react";
import { UseContext } from "../../context/moduleContext";
import { ACTIONS } from "../../context/moduleActions";
import User from "../User";
import UserSkills from "../UserSkills";
import UserHistoric from "../UserHistoric";
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
      <div className="cnx-user-breadcrumbs-cub">

        {page === "skills" ? (
          <>
            <span
              className="cnx-user-crumb-user-cucu cnx-user-hint-crumb-cuhc"
              onClick={() => setActivePage("user")}
            >
              Usuários /{" "}
            </span>
            <span
              className="cnx-user-crumb-skills-cucs"
              onClick={() => setActivePage("skills")}
            >
              Gerenciamento de Habilidades
            </span>
          </>
        ) : null}
        {page === "historic" ? (
          <>
            <span
              className="cnx-user-crumb-user-cucu cnx-user-hint-crumb-cuhc"
              onClick={() => setActivePage("user")}
            >
              Usuários /{" "}
            </span>
            <span
              className="cnx-user-crumb-skills-cucs cnx-user-hint-crumb-cuhc"
              onClick={() => setActivePage("skills")}
            >
              Gerenciamento de Habilidades
            </span>
            <span
              className="cnx-user-crumb-historic-cuch"
              onClick={() => setActivePage("historic")}
            >
              {" "}
              / Histórico Matriz de Habilidades
            </span>
          </>
        ) : null}
      </div>
      {page === "user" ? <User /> : null}
      {page === "skills" ? <UserSkills /> : null}
      {page === "historic" ? <UserHistoric /> : null}
    </>
  );
}

export default NavigationContainer;
