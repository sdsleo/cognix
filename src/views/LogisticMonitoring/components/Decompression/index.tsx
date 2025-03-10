import "./styles.css";
import { useEffect, useId, useState, useContext, useLayoutEffect } from "react";
import MiniExpandMirrored from "../../../../assets/icons/FluentUI/SVGs/MiniExpandMirrored";
import MiniContractMirrored from "../../../../assets/icons/FluentUI/SVGs/MiniContractMirrored";

import {
  ChevronLeftSmallIcon,
  ChevronRightSmallIcon,
  RefreshIcon,
} from "@fluentui/react-icons-mdl2";
import { UseContext } from "../../context/moduleContext";
import { ACTIONS } from "../../context/moduleActions";
import { axiosInstance } from "../../../../http/axiosInstance";
import { _GET } from "../../routes";

function Decompression() {
  const { dispacth, loading, viewMode } = useContext(UseContext);

  async function getDashBoard() {
    dispacth({
      type: ACTIONS.LOADING,
      payload: true,
    });
    try {
      const { data } = await axiosInstance(_GET());
      dispacth({
        type: ACTIONS.SET_DASHBOARD_DATA,
        payload: data,
      });
    } catch (err: any) {
      console.error(err);
    } finally {
      dispacth({
        type: ACTIONS.LOADING,
        payload: false,
      });
    }
  }

  useLayoutEffect(() => {
    getDashBoard();
  }, []);

  const [subView, setSubView] = useState(0);
  const [subViewClient, setSubViewClient] = useState(0);

  const CNX_ID = useId();
  const openFullScreenView = () => {
    const element: any = document.getElementById(CNX_ID);
    element
      .requestFullscreen()
      .then(function () {
        // element has entered fullscreen mode successfully
      })
      .catch(function (error: any) {
        // element could not enter fullscreen mode
        // error message
        console.log(error.message);
      });
  };
  const closeFullScreenView = () => {
    document
      .exitFullscreen()
      .then(function () {
        // element has exited fullscreen mode
      })
      .catch(function (error) {
        // element could not exit fullscreen mode
        // error message
        console.log(error.message);
      });
  };

  function fullscreenchanged(event: any) {
    if (document.fullscreenElement) {
      document
        .getElementById(
          `cnx-logistic-monitoring-decomp-contract-button-clmeb-${CNX_ID}`
        )
        ?.classList.remove("cnx-display-none");
      document
        .getElementById(`cnx-logistic-monitoring-decomp-expand-button-clmeb-${CNX_ID}`)
        ?.classList.add("cnx-display-none");
    } else {
      document
        .getElementById(
          `cnx-logistic-monitoring-decomp-contract-button-clmeb-${CNX_ID}`
        )
        ?.classList.add("cnx-display-none");
      document
        .getElementById(`cnx-logistic-monitoring-decomp-expand-button-clmeb-${CNX_ID}`)
        ?.classList.remove("cnx-display-none");
    }
  }


  return (
    <div id={CNX_ID} className="cnx-logistic-monitoring-decomp-main-container-clmmc">
      {loading ? (
        <div className="cnx-logistic-control-loading-view-clclv">
          <h1>Carregando...</h1>
        </div>
      ) : null}
      <header className="cnx-logistic-monitoring-decomp-header-clmh">
        <div />
        <span>Descompressão</span>
        <div className="cnx-logistic-monitoring-decomp-actions-container-clmac">
          <button
            title="Atualizar"
            id={`cnx-logistic-monitoring-decomp-expand-button-clmeb-${CNX_ID}`}
            type="button"
            className="cnx-logistic-monitoring-decomp-header-window-button-clmhwb"
            onClick={() => getDashBoard()}
          >
            <RefreshIcon className="cnx-logistic-monitoring-decomp-header-refresh"/>
          </button>
          <button
            title="Expandir"
            id={`cnx-logistic-monitoring-decomp-expand-button-clmeb-${CNX_ID}`}
            type="button"
            className="cnx-logistic-monitoring-decomp-header-window-button-clmhwb"
            onClick={() => openFullScreenView()}
          >
            <MiniExpandMirrored
              className="cnx-logistic-monitoring-decomp-header-window-svg-clmhws"
              width="1.2rem"
              height="1.2rem"
            />
          </button>
        </div>

        <button
          id={`cnx-logistic-monitoring-decomp-contract-button-clmeb-${CNX_ID}`}
          className="cnx-display-none cnx-logistic-monitoring-decomp-header-window-button-clmhwb"
          type="button"
          onClick={() => closeFullScreenView()}
        >
          <MiniContractMirrored
            className="cnx-logistic-monitoring-decomp-header-window-svg-clmhws"
            width="1.2rem"
            height="1.2rem"
          />
        </button>
      </header>
      {!loading ? (
        <>
          <div className="cnx-logistic-monitoring-decomp-left-volume-container-clmlvc">
            <h1>Gantt</h1>
          </div>
          <div className="cnx-logistic-monitoring-decomp-right-volume-container-clmrvc">
            <h1>Tabela 2</h1>
          </div>
        </>
      ) : null}
    </div>
  );
}

export default Decompression;
