import "./styles.css";
import Volume from "./components/Volume";
import VolumeEntregue from "./components/VolumeEntregue";
import { useEffect, useId, useState, useContext, useLayoutEffect } from "react";
import MiniExpandMirrored from "../../../../assets/icons/FluentUI/SVGs/MiniExpandMirrored";
import MiniContractMirrored from "../../../../assets/icons/FluentUI/SVGs/MiniContractMirrored";
import { PlaybackRate1xIcon, RefreshIcon, RemoveOccurrenceIcon } from "@fluentui/react-icons-mdl2";
import { UseContext } from "../../context/moduleContext";
import { ACTIONS } from "../../context/moduleActions";
import { axiosInstance } from "../../../../http/axiosInstance";
import { _GET } from "../../routes";

function Main() {
  const { dispacth, loading, autoRefresh, timeToRefresh } = useContext(UseContext);

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
    if (autoRefresh) {
      const intervalId = setInterval(() => {
        getDashBoard();
      }, timeToRefresh);
      return () => {
        clearInterval(intervalId);
      };
    } 
    getDashBoard();

  }, [autoRefresh]);

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
          `cnx-logistic-monitoring-contract-button-clmeb-${CNX_ID}`
        )
        ?.classList.remove("cnx-display-none");
      document
        .getElementById(`cnx-logistic-monitoring-expand-button-clmeb-${CNX_ID}`)
        ?.classList.add("cnx-display-none");
    } else {
      document
        .getElementById(
          `cnx-logistic-monitoring-contract-button-clmeb-${CNX_ID}`
        )
        ?.classList.add("cnx-display-none");
      document
        .getElementById(`cnx-logistic-monitoring-expand-button-clmeb-${CNX_ID}`)
        ?.classList.remove("cnx-display-none");
    }
  }


  return (
    <div id={CNX_ID} className="cnx-logistic-monitoring-main-container-clmmc">
      {loading ? (
        <div className="cnx-logistic-control-loading-view-clclv">
          <h1>Carregando...</h1>
        </div>
      ) : null}
      <header className="cnx-logistic-monitoring-header-clmh">
        <div />
        <span>Painel de Monitoramento Logístico</span>
        <div className="cnx-logistic-monitoring-actions-container-clmac">
          <button
            title={autoRefresh ? 'Desativar atualização automática' : 'Atualizar a cada 30s'}
            id={`cnx-logistic-monitoring-expand-button-clmeb-${CNX_ID}`}
            type="button"
            className="cnx-logistic-monitoring-header-window-button-clmhwb"
            onClick={() => {
              dispacth({
                type: ACTIONS.AUTO_REFRESH,
                payload: !autoRefresh,
              });
            }}
          >
            {autoRefresh ? (
              <RemoveOccurrenceIcon className="cnx-logistic-monitoring-highlight-refresh" />
            ) : (
              <PlaybackRate1xIcon className="cnx-logistic-monitoring-header-refresh" />
            )}
          </button>
          <button
            title="Atualizar"
            id={`cnx-logistic-monitoring-expand-button-clmeb-${CNX_ID}`}
            type="button"
            className="cnx-logistic-monitoring-header-window-button-clmhwb"
            onClick={() => getDashBoard()}
          >
            <RefreshIcon className="cnx-logistic-monitoring-header-refresh" />
          </button>
          <button
            title="Expandir"
            id={`cnx-logistic-monitoring-expand-button-clmeb-${CNX_ID}`}
            type="button"
            className="cnx-logistic-monitoring-header-window-button-clmhwb"
            onClick={() => openFullScreenView()}
          >
            <MiniExpandMirrored
              className="cnx-logistic-monitoring-header-window-svg-clmhws"
              width="1.2rem"
              height="1.2rem"
            />
          </button>
        </div>

        <button
          id={`cnx-logistic-monitoring-contract-button-clmeb-${CNX_ID}`}
          className="cnx-display-none cnx-logistic-monitoring-header-window-button-clmhwb"
          type="button"
          onClick={() => closeFullScreenView()}
        >
          <MiniContractMirrored
            className="cnx-logistic-monitoring-header-window-svg-clmhws"
            width="1.2rem"
            height="1.2rem"
          />
        </button>
      </header>
      {!loading ? (
        <>
          <div className="cnx-logistic-monitoring-left-volume-container-clmlvc">
            <Volume />
          </div>
          <div className="cnx-logistic-monitoring-right-volume-container-clmrvc">
            <VolumeEntregue />
          </div>
        </>
      ) : null}
    </div>
  );
}

export default Main;
