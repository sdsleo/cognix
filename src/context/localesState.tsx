import { useReducer, useEffect } from "react";
import LocalesContext from "./localesContex";
import localesReducer from "./localesReducer";
import { ILocales } from "../locales/types";
import { ACTIONS } from "./localesActions";
import { pt_br } from "../locales/pt_br";
import { en_us } from "../locales/en_us";
import { es_es } from "../locales/es_es";
import { ja_jp } from "../locales/ja_jp";

const LocalesState = ({ children }: any) => {
  const initialState: ILocales = {
    currentLanguage: "pt-br",
    localesData: pt_br()
  };

  const [state, dispatch] = useReducer(localesReducer, initialState);

  useEffect(() => {
    switch (state.currentLanguage) {
      case "pt-br":
        dispatch({
          type: ACTIONS.SET_LOCALES_DATA,
          payload: pt_br(),
        });
        break;
      case "en-us":
        dispatch({
          type: ACTIONS.SET_LOCALES_DATA,
          payload: en_us(),
        });
        break;
      case "es-es":
        dispatch({
          type: ACTIONS.SET_LOCALES_DATA,
          payload: es_es(),
        });
        break;
      case "ja-jp":
        dispatch({
          type: ACTIONS.SET_LOCALES_DATA,
          payload: ja_jp(),
        });
        break;
      default:
        dispatch({
          type: ACTIONS.SET_LOCALES_DATA,
          payload: pt_br(),
        });
    }
  }, [state.currentLanguage]);

  const setCurrentLaguange = (data: any) => {
    dispatch({
      type: ACTIONS.SET_CURRENT_LAGUANGE,
      payload: data,
    });
  };

  return (
    <LocalesContext.Provider
      value={{
        currentLanguage: state.currentLanguage,
        localesData: state.localesData,
        setCurrentLaguange,
      }}
    >
      {children}
    </LocalesContext.Provider>
  );
};

export default LocalesState;
