import { useEffect, useState, useContext } from "react";
import { UseContext } from "../../../../context/moduleContext";
import { ACTIONS } from "../../../../context/moduleActions";
import "./styles.css";
import {
  ChevronLeftSmallIcon,
  ChevronRightSmallIcon,
} from "@fluentui/react-icons-mdl2";
import useFormatTimeOnly from "../../../../../../hooks/useFormatTimeOnly";

function Volume() {
  const { dispacth, dashBoardData } = useContext(UseContext);
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 3;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = dashBoardData?.dashboardGroups
    ? dashBoardData?.dashboardGroups?.slice(firstIndex, lastIndex)
    : [];

  const Data = [
    {
      id: 1,
      name: "POJUCA",
    },
    {
      id: 2,
      name: "BRASKEN",
    },
    {
      id: 3,
      name: "OURIÇANGAS",
    },
    {
      id: 4,
      name: "NOVO CLIENTE 1",
    },
  ];
  const numberPage = Math.ceil(
    dashBoardData?.dashboardGroups
      ? dashBoardData?.dashboardGroups.length / recordsPerPage
      : Data.length / recordsPerPage
  );
  const numbers = [...Array(numberPage + 1).keys()].slice(1);

  function prevPage() {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
    }
  }

  function nextPage() {
    if (currentPage !== numberPage) {
      setCurrentPage(currentPage + 1);
    }
  }

  return (
    <div className="cnx-logistic-monitoring-volume-component-container-clmvcc">
      {/* <div className="cnx-logistic-monitoring-volume-join-line-clmvjl"></div> */}
      <div className="cnx-logistic-monitoring-main-value-container-clmmvc">
        <span className="cnx-logistic-monitoring-volume-title-clmvt">
          Volume Comprimido - Compressão
        </span>
        <div className="cnx-logistic-monitoring-volume-value-clmvv">
          <span className="cnx-logistic-monitoring-large-value-clmlv">
            {dashBoardData?.volumeComprimidoTotalRealizadoDia || 0}
          </span>
          <span className="cnx-logistic-monitoring-separator-clms">/</span>
          <span className="cnx-logistic-monitoring-cubic-value-clmcv">{`${
            dashBoardData?.volumeComprimidoTotalPlanejadoDia?.toFixed(2) || 0
          } m³`}</span>
        </div>
      </div>
      <div className="cnx-logistic-monitoring-areas-container-clmac">
        <button
          type="button"
          className="cnx-right-button-volume-crbv"
          onClick={() => nextPage()}
        >
          <ChevronRightSmallIcon className="cnx-icon" />
        </button>
        <button
          type="button"
          className="cnx-left-button-volume-crbv"
          onClick={() => prevPage()}
        >
          <ChevronLeftSmallIcon className="cnx-icon" />
        </button>
        {records?.map((base: any) => (
          <div className="cnx-logistic-monitoring-area-column-clmac">
            <div className="cnx-logistic-monitoring-area-card-clmac">
              <div
                className="cnx-logistic-monitoring-area-title-clmat"
                style={{ cursor: "pointer" }}
                onClick={() => {
                  dispacth({
                    type: ACTIONS.SET_ACTIVE_PAGE,
                    payload: 'comp',
                  });
                  dispacth({
                    type: ACTIONS.SET_BASE_ID,
                    payload: base?.baseId,
                  });
                  dispacth({
                    type: ACTIONS.SET_BASE_NAME,
                    payload: base?.baseName,
                  });
                }}
              >
                <span>{base?.baseName}</span>
              </div>
              <div className="cnx-logistic-monitoring-area-item-container-clmaic">
                <span className="cnx-logistic-monitoring-area-item-title-clmait">
                  Comprimindo
                </span>
                <span className="cnx-logistic-monitoring-area-item-value-clmaiv">
                  {base?.comprimindo || 0}
                </span>
              </div>
              <div className="cnx-logistic-monitoring-area-item-container-clmaic">
                <span className="cnx-logistic-monitoring-area-item-title-clmait">
                  Aguardando
                </span>
                <span className="cnx-logistic-monitoring-area-item-value-clmaiv">
                  {base?.aguardando || 0}
                </span>
              </div>
              <div className="cnx-logistic-monitoring-area-item-container-clmaic">
                <span className="cnx-logistic-monitoring-area-item-title-clmait">
                  Carregada
                </span>
                <span className="cnx-logistic-monitoring-area-item-value-clmaiv">
                  {base?.carregada}
                </span>
              </div>
              <div className="cnx-logistic-monitoring-area-item-container-clmaic">
                <span className="cnx-logistic-monitoring-area-item-title-clmait">
                  Próx. Compressão
                </span>
                <span className="cnx-logistic-monitoring-area-item-next">
                  {useFormatTimeOnly(base?.proximaCarreta) || ""}
                </span>
              </div>
              <div className="cnx-logistic-monitoring-area-item-container-clmaic">
                <span className="cnx-logistic-monitoring-area-item-title-clmait">
                  Placa
                </span>
                <div className="cnx-logistic-monitoring-area-plate-container">
                  {base?.placas.map((placa: any) => (
                    <span className="cnx-logistic-monitoring-area-item-plate">
                      {placa}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <div className="cnx-logistic-monitoring-input-range-container-clmirc">
              <progress
                className="cnx-logistic-monitoring-progress-bar1-clmpb"
                value="30"
                max="100"
              ></progress>
              <progress
                className="cnx-logistic-monitoring-progress-bar2-clmpb"
                value="100"
                max="100"
              ></progress>
            </div>
            <div className="cnx-logistic-monitoring-executed-orders-container-clmeoc">
              <span className="cnx-logistic-monitoring-executed-orders-title-clmeot">
                Executado / Planejado
              </span>
              <div className="cnx-logistic-monitoring-executed-orders-value-clmeov">
                <span className="cnx-logistic-monitoring-executed-orders-major-number">
                  {base?.totalOrdensExecutadas || 0}
                </span>
                <span className="cnx-logistic-monitoring-executed-orders-separator">
                  /
                </span>
                <span className="cnx-logistic-monitoring-executed-orders-minor-number">
                  {base?.totalOrdensProgramadas || 0}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Volume;
