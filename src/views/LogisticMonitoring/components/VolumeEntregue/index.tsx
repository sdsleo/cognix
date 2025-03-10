import { useEffect, useState, useContext } from "react";
import { UseContext } from "../../context/moduleContext";
import { ACTIONS } from "../../context/moduleActions";
import { axiosInstance } from "../../../../http/axiosInstance";
import "./styles.css";
import { ChevronLeftSmallIcon, ChevronRightSmallIcon } from "@fluentui/react-icons-mdl2";
import useFormatTimeOnly from "../../../../hooks/useFormatTimeOnly";
interface I_PROPS {
  handleView2(type: "add" | "remove"): void;
}

function VolumeEntregue({ handleView2 }: I_PROPS) {
  const { dispacth, dashBoardData } = useContext(UseContext);
  // dashboardGroups
  // dashboardClients
  function alterViewAndSetData(clientId: any, clientName: any) {

    handleView2("add");
    dispacth({
      type: ACTIONS.SET_VIEW_MODE,
      payload: 'CLIENT',
    });
    dispacth({
      type: ACTIONS.SET_CLIENT_ID,
      payload: clientId,
    });
    dispacth({
      type: ACTIONS.SET_BASE_NAME,
      payload: clientName,
    });
  }

  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 3;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = dashBoardData?.dashboardClients
    ? dashBoardData?.dashboardClients?.slice(firstIndex, lastIndex)
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
    dashBoardData?.dashboardClients
      ? dashBoardData?.dashboardClients.length / recordsPerPage
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
          Volume Entregue - Descompressão
        </span>
        <div className="cnx-logistic-monitoring-volume-value-clmvv">
          <span className="cnx-logistic-monitoring-large-value-clmlv">{dashBoardData?.volumeEntregueTotalRealizadoDia || 0}</span>
          <span className="cnx-logistic-monitoring-separator-clms">/</span>
          <span className="cnx-logistic-monitoring-cubic-value-clmcv">
            {`${dashBoardData?.volumeEntregueTotalPlanejadoDia?.toFixed(2) || 0} m³`}
          </span>
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
        {records?.map((client: any) => (
          <div className="cnx-logistic-monitoring-area-column-clmac">
            <div className="cnx-logistic-monitoring-area-card-clmac">
              <div
                className="cnx-logistic-monitoring-area-title-clmat"             
                style={{ cursor: "pointer" }}
                onClick={() =>
                  alterViewAndSetData(client?.clientId, client?.clientName)
                }
              >
                <span>{client?.clientName}</span>
              </div>
              <div className="cnx-logistic-monitoring-area-item-container-clmaic">
                <span className="cnx-logistic-monitoring-area-item-title-clmait">
                  Descomprimindo
                </span>
                <span className="cnx-logistic-monitoring-area-item-value-clmaiv">
                  {client?.comprimindo || 0}
                </span>
              </div>
              <div className="cnx-logistic-monitoring-area-item-container-clmaic">
                <span className="cnx-logistic-monitoring-area-item-title-clmait">
                  Aguardando
                </span>
                <span className="cnx-logistic-monitoring-area-item-value-clmaiv">
                  {client?.aguardando || 0}
                </span>
              </div>
              <div className="cnx-logistic-monitoring-area-item-container-clmaic">
                <span className="cnx-logistic-monitoring-area-item-title-clmait">
                  Vazia
                </span>
                <span className="cnx-logistic-monitoring-area-item-value-clmaiv">
                  {client?.carregada || 0}
                </span>
              </div>
              <div className="cnx-logistic-monitoring-area-item-container-clmaic">
                <span className="cnx-logistic-monitoring-area-item-title-clmait">
                  Próx. Descompressão
                </span>
                <span className="cnx-logistic-monitoring-area-item-value-clmaiv">
                  {useFormatTimeOnly(client?.proximaCarreta) || ''}
                </span>
              </div>
              <div className="cnx-logistic-monitoring-area-item-container-clmaic">
                <span className="cnx-logistic-monitoring-area-item-title-clmait">
                  Placa
                </span>
                <div className="cnx-logistic-monitoring-area-plate-container">
                  {client?.placas.map((placa: any) => (
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
                value="40"
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
                Ordens Executadas
              </span>
              <div className="cnx-logistic-monitoring-executed-orders-value-clmeov">
                <span className="cnx-logistic-monitoring-executed-orders-major-number">
                  {client?.totalOrdensExecutadas || 0}
                </span>
                <span className="cnx-logistic-monitoring-executed-orders-separator">
                  /
                </span>
                <span className="cnx-logistic-monitoring-executed-orders-minor-number">
                  {client?.totalOrdensProgramadas || 0}
                </span>
              </div>
            </div>
          </div>
        ))}

        {/* <div className="cnx-logistic-monitoring-area-column-clmac">
          <div className="cnx-logistic-monitoring-area-card-clmac">
            <div
              className="cnx-logistic-monitoring-area-title-clmat"
              onClick={alterViewAndSetData}
            >
              <span>OURIÇANGAS</span>
            </div>
            <div className="cnx-logistic-monitoring-area-item-container-clmaic">
              <span className="cnx-logistic-monitoring-area-item-title-clmait">
                Comprimido
              </span>
              <span className="cnx-logistic-monitoring-area-item-value-clmaiv">
                1
              </span>
            </div>
            <div className="cnx-logistic-monitoring-area-item-container-clmaic">
              <span className="cnx-logistic-monitoring-area-item-title-clmait">
                Aguardando
              </span>
              <span className="cnx-logistic-monitoring-area-item-value-clmaiv">
                4
              </span>
            </div>
            <div className="cnx-logistic-monitoring-area-item-container-clmaic">
              <span className="cnx-logistic-monitoring-area-item-title-clmait">
                Carregada
              </span>
              <span className="cnx-logistic-monitoring-area-item-value-clmaiv">
                2
              </span>
            </div>
            <div className="cnx-logistic-monitoring-area-item-container-clmaic">
              <span className="cnx-logistic-monitoring-area-item-title-clmait">
                Próx. Carreta
              </span>
              <span className="cnx-logistic-monitoring-area-item-value-clmaiv">
                13:20
              </span>
            </div>
            <div className="cnx-logistic-monitoring-area-item-container-clmaic">
              <span className="cnx-logistic-monitoring-area-item-title-clmait">
                Placa
              </span>
              <span className="cnx-logistic-monitoring-area-item-value-clmaiv">
                LOY-7A22
              </span>
            </div>
          </div>
          <div className="cnx-logistic-monitoring-input-range-container-clmirc">
            <progress
              className="cnx-logistic-monitoring-progress-bar1-clmpb"
              value="20"
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
              Ordens Executadas
            </span>
            <div className="cnx-logistic-monitoring-executed-orders-value-clmeov">
              <span className="cnx-logistic-monitoring-executed-orders-major-number">
                4
              </span>
              <span className="cnx-logistic-monitoring-executed-orders-separator">
                /
              </span>
              <span className="cnx-logistic-monitoring-executed-orders-minor-number">
                10
              </span>
            </div>
          </div>
        </div>
        <div className="cnx-logistic-monitoring-area-column-clmac">
          <div className="cnx-logistic-monitoring-area-card-clmac">
            <div
              className="cnx-logistic-monitoring-area-title-clmat"
              onClick={alterViewAndSetData}
            >
              <span>NOVA SOURE</span>
            </div>
            <div className="cnx-logistic-monitoring-area-item-container-clmaic">
              <span className="cnx-logistic-monitoring-area-item-title-clmait">
                Comprimido
              </span>
              <span className="cnx-logistic-monitoring-area-item-value-clmaiv">
                1
              </span>
            </div>
            <div className="cnx-logistic-monitoring-area-item-container-clmaic">
              <span className="cnx-logistic-monitoring-area-item-title-clmait">
                Aguardando
              </span>
              <span className="cnx-logistic-monitoring-area-item-value-clmaiv">
                3
              </span>
            </div>
            <div className="cnx-logistic-monitoring-area-item-container-clmaic">
              <span className="cnx-logistic-monitoring-area-item-title-clmait">
                Carregada
              </span>
              <span className="cnx-logistic-monitoring-area-item-value-clmaiv">
                1
              </span>
            </div>
            <div className="cnx-logistic-monitoring-area-item-container-clmaic">
              <span className="cnx-logistic-monitoring-area-item-title-clmait">
                Próx. Carreta
              </span>
              <span className="cnx-logistic-monitoring-area-item-value-clmaiv">
                16:00
              </span>
            </div>
            <div className="cnx-logistic-monitoring-area-item-container-clmaic">
              <span className="cnx-logistic-monitoring-area-item-title-clmait">
                Placa
              </span>
              <span className="cnx-logistic-monitoring-area-item-value-clmaiv">
                INO-7D35
              </span>
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
              Ordens Executadas
            </span>
            <div className="cnx-logistic-monitoring-executed-orders-value-clmeov">
              <span className="cnx-logistic-monitoring-executed-orders-major-number">
                8
              </span>
              <span className="cnx-logistic-monitoring-executed-orders-separator">
                /
              </span>
              <span className="cnx-logistic-monitoring-executed-orders-minor-number">
                18
              </span>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
}

export default VolumeEntregue;
