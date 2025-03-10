import { useEffect, useState, useContext } from "react";
import { UseContext } from "../../context/moduleContext";
import { ACTIONS } from "../../context/moduleActions";
import { axiosInstance } from "../../../../http/axiosInstance";
import "./styles.css";
import {
  ChevronLeftSmallIcon,
  ChevronRightSmallIcon,
} from "@fluentui/react-icons-mdl2";
import useFormatTimeOnly from "../../../../hooks/useFormatTimeOnly";

interface I_PROPS {
  handleView(type: "add" | "remove"): void;
}
function Volume({ handleView }: I_PROPS) {
  const { dispacth, dashBoardData } = useContext(UseContext);
  // dashboardGroups
  // dashboardClients
  function alterViewAndSetData(baseId: any, baseName: any) {
    handleView("add");
    dispacth({
      type: ACTIONS.SET_VIEW_MODE,
      payload: 'BASE',
    });
    dispacth({
      type: ACTIONS.SET_BASE_ID,
      payload: baseId,
    });
    dispacth({
      type: ACTIONS.SET_BASE_NAME,
      payload: baseName,
    });
  }

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
  // 1	POJUCA
  // 2	OURIÇANGAS
  // 3	NOVA SOURE
  // toUpperCase
  // function handleBaseId(baseName: any) {
  //   if (baseName.toLowerCase() === "pojuca") {
  //     return 10005;
  //   }
  //   if (baseName.toLowerCase() === "ouriçangas") {
  //     return 10003;
  //   }
  //   if (baseName.toLowerCase() === "nova soure") {
  //     return 10004;
  //   }
  //   if (baseName.toLowerCase() === "mata de são joão") {
  //     return 10007;
  //   }
  // }
  // function handleBaseId(baseName: any) {
  //   if (baseName.toUpperCase() === "POJUCA") {
  //     return 1;
  //   }
  //   if (baseName.toUpperCase() === "OURIÇANGAS") {
  //     return 2;
  //   }
  //   if (baseName.toUpperCase() === "NOVA SOURE") {
  //     return 3;
  //   }
  // }

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
                onClick={() =>
                  alterViewAndSetData(base?.baseId, base?.baseName)
                }
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

        {/* <div className="cnx-logistic-monitoring-area-column-clmac">
    <div className="cnx-logistic-monitoring-area-card-clmac">
      <div className="cnx-logistic-monitoring-area-title-clmat">
        <span>BRACELL</span>
      </div>
      <div className="cnx-logistic-monitoring-area-item-container-clmaic">
        <span className="cnx-logistic-monitoring-area-item-title-clmait">
          Comprimido
        </span>
        <span className="cnx-logistic-monitoring-area-item-value-clmaiv">
          2
        </span>
      </div>
      <div className="cnx-logistic-monitoring-area-item-container-clmaic">
        <span className="cnx-logistic-monitoring-area-item-title-clmait">
          Aguardando
        </span>
        <span className="cnx-logistic-monitoring-area-item-value-clmaiv">
          2
        </span>
      </div>
      <div className="cnx-logistic-monitoring-area-item-container-clmaic">
        <span className="cnx-logistic-monitoring-area-item-title-clmait">
          Vazia
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
          13:00
        </span>
      </div>
      <div className="cnx-logistic-monitoring-area-item-container-clmaic">
        <span className="cnx-logistic-monitoring-area-item-title-clmait">
          Placa
        </span>
        <span className="cnx-logistic-monitoring-area-item-value-clmaiv">
          KZW-2D86
        </span>
      </div>
    </div>
    <div className="cnx-logistic-monitoring-input-range-container-clmirc">
      <progress
        className="cnx-logistic-monitoring-progress-bar1-red-clmpb"
        value="10"
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
          13
        </span>
      </div>
    </div>
  </div>
  <div className="cnx-logistic-monitoring-area-column-clmac">
    <div className="cnx-logistic-monitoring-area-card-clmac">
      <div className="cnx-logistic-monitoring-area-title-clmat">
        <span>HUMILDES</span>
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
          Vazia
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
          14:10
        </span>
      </div>
      <div className="cnx-logistic-monitoring-area-item-container-clmaic">
        <span className="cnx-logistic-monitoring-area-item-title-clmait">
          Placa
        </span>
        <span className="cnx-logistic-monitoring-area-item-value-clmaiv">
          RBA-AE90
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
          5
        </span>
        <span className="cnx-logistic-monitoring-executed-orders-separator">
          /
        </span>
        <span className="cnx-logistic-monitoring-executed-orders-minor-number">
          10
        </span>
      </div>
    </div>
  </div> */}
      </div>
    </div>
  );
}

export default Volume;
