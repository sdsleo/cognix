import {
  useState,
  useId,
  useRef,
  useEffect,
  useContext,
  useLayoutEffect,
} from "react";
import CnxDialog from "../../../../../../components/CnxDialog";
import { CnxTable } from "../../../../../../components/CnxTable";
import "./styles.css";
import { UseContext } from "../../../../context/moduleContext";
import { ACTIONS } from "../../../../context/moduleActions";
import { axiosInstance } from "../../../../../../http/axiosInstance";
import {
  _DELETE,
  _GET,
  _GET_ELIPSE_RESULTS_BY_ID,
  _GET_OPERATION_BY_ORDER_ID,
} from "../../../../routes";
import { IPagination } from "../../../../routes/types";
import { ILocales } from "../../../../../../locales/types";
import localesContex from "../../../../../../context/localesContex";
import useFormatDate from "../../../../../../hooks/useFormatDate";

interface ITable {
  cnxId?: any;
}

function Table({ cnxId }: ITable) {
  const { dispacth, loadingTable, orderOperationId, elipseResultData,  } =
  useContext(UseContext);
  
  const { localesData } = useContext<ILocales>(localesContex);
  const dialogModalError = useId();
  const rowsCheckedRef: any = useRef(null);
  const [localTableData, setLocalTableData]: any = useState(null);
  const [localLoading, setLocalLoading]: any = useState(false);

  // useEffect(() => {
  //   getList({ PageSize: 100, OrderOperationId: orderOperationId });
  // }, [orderOperationId]);

  const head = {
    id: "id",
    startedDateTime: "Dt Hora Início",
    // finishedDateTime: "Dt Hora Fim",
    statusDescription: "Estágio",
    // arrivedDateTime: "Dt Hora Chegada",
    // vehicleHandlingTime: "Tempo Manobra (min)",
    // operatingWaitingTime: "Tempo Espera (min)",
    strOperationType: "Tipo Operação",
    tramoNr: "Nr. Tramo",
    initialPressure: "Pressão Inicial (bar)",
    initialTemperature: "Temp. Inicial (Cº)",
    initialAmbientTemperature: "Temp. Amb. Inicial (Cº)",
    weatherCondition: "Condição Clima Inicial",
    // finalPressure: "Pressão Final (bar)",
    // finalTemperature: "Temp. Final (Cº)",
    // finalAmbientTemperature: "Temp. Amb. Final (Cº)",
    // finalWeatherCondition: "Condição Clima Final",
    volume: "Volume Normalizado (m³)",
    massVolume: "Mássico (kg)",
    correctedVolume: "Volume Corrigido (m³)",
    // averageFlow: "Vazão Média (m3/h)"
  };

  const refreshList = () => {
    getList({ PageSize: 100 });
  };

  const handleRowsChecked = (data: any) => {
    rowsCheckedRef.current = data;
  };

  async function getList({ PageSize, PageNumber }: IPagination) {
    setLocalLoading(true);
    const operationIdStorage = sessionStorage.getItem(`${cnxId}@cnx-operation-id`);

    try {
      const { data } = await axiosInstance(
        _GET_ELIPSE_RESULTS_BY_ID({
          PageSize,
          PageNumber,
          OrderOperationId: Number(operationIdStorage),
        })
      );
      // dispacth({
      //   type: ACTIONS.SET_ELIPSE_RESULT_DATA,
      //   payload: data,
      // });
      setLocalTableData(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLocalLoading(false);
    }
  }

  const handlePagination = (dataPage: any) => {
    if (dataPage === "first") {
      if (localTableData?.pageNumber === 1) return;
      getList({ PageSize: 100, PageNumber: 1 });
    }
    if (dataPage === "previous") {
      if (localTableData?.pageNumber === 1) return;
      getList({ PageSize: 100, PageNumber: localTableData?.pageNumber - 1 });
    }
    if (dataPage === "next") {
      if (localTableData?.pageNumber === localTableData?.totalPages) return;
      getList({ PageSize: 100, PageNumber: localTableData?.pageNumber + 1 });
    }
    if (dataPage === "last") {
      if (localTableData?.pageNumber === localTableData?.totalPages) return;
      getList({ PageSize: 100, PageNumber: localTableData?.totalPages });
    }
  };

  const summaryPagination = {
    currentPage: localTableData?.pageNumber,
    pageCount: localTableData?.totalPages,
    itemCount: localTableData?.totalItems,
  };

  const CNX_STYLES = {
    cnxColumnGap: {
      paddingRight: "20px",
    },
  };

  const handleDialogEdit = (rowDataElipse: any) => {
    sessionStorage.setItem(`${cnxId}@cnx-row-data-elipse`, JSON.stringify(rowDataElipse));
    setTimeout(() => {
      const btn = document.getElementById(`${cnxId}cnx-open-elipse-edit-modal`);
      btn?.click();
    }, 50);

    // dispacth({
    //   type: ACTIONS.SET_ELIPSE_ROW_DATA,
    //   payload: rowDataElipse,
    // });
    // dispacth({
    //   type: ACTIONS.EDIT_ELIPSE_RESULTS_MODAL,
    //   payload: true,
    // });
    // dispacth({
    //   type: ACTIONS.ADD_MODAL,
    //   payload: false,
    // });
    // dispacth({
    //   type: ACTIONS.EDIT_MODAL,
    //   payload: false,
    // });
    // dispacth({
    //   type: ACTIONS.EDIT_ALL_MODAL,
    //   payload: false,
    // });
    // dispacth({
    //   type: ACTIONS.ADD_ANGELIRA_RESULTS_MODAL,
    //   payload: false,
    // });
    // dispacth({
    //   type: ACTIONS.EDIT_ANGELIRA_RESULTS_MODAL,
    //   payload: false,
    // });
  };

  const customTdFunction = [
    {
      key: "id",
      func: (tdValue: any, keyValue: string, rowDataElipse: any) => {
        return (
          <button
            type="button"
            className="cnx-add-area-record-th-number-link"
            onClick={() => handleDialogEdit(rowDataElipse)}
          >
            <span className="searchable">{tdValue || ""}</span>
          </button>
        );
      },
    },
    {
      key: "startedDateTime",
      func: (tdValue: any, keyValue: string, rowValue: any) => {
        return <span className="searchable">{useFormatDate(tdValue)}</span>;
      },
    },
  ];

  return (
    <div className="cnx-modules-main-container-cmmc cnx-order-view-fix-height">
      <CnxDialog
        useId={dialogModalError}
        type="error"
        content={{
          title: "Erro!",
          message: "Não foi possível salvar o registro",
        }}
      />
      <div className="cnx-groups-breadcrumbs-cgb">
        <span
          className="cnx-groups-crumb-groups-cgcg cnx-groups-hint-crumb-cghc"
          onClick={() => {
            const btn = document.getElementById(`${cnxId}cnx-close-elipse-edit-modal`);
            btn?.click();
            document
            .getElementById(cnxId + "cnx-order-page-view")
            ?.classList.remove("cnx-display-none");
          document
            .getElementById(cnxId + "cnx-operations-page-view")
            ?.classList.add("cnx-display-none");
          document
            .getElementById(cnxId + "cnx-elipse-results-page-view")
            ?.classList.add("cnx-display-none");
          document
            .getElementById(cnxId + "cnx-angeLira-results-page-view")
            ?.classList.add("cnx-display-none");
          document
            .getElementById(cnxId + "cnx-logs-results-page-view")
            ?.classList.add("cnx-display-none");
          }}
        >
          Ordem de Produção /{" "}
        </span>
        {/* <span
              className="cnx-groups-crumb-permissions-cgcp cnx-groups-hint-crumb-cghc"
              onClick={() => {
                setActivePage("operations")
              }}
            >
              Operações /{" "}
            </span> */}
        <span
          className="cnx-groups-crumb-permissions-cgcp"
          // onClick={() => setActivePage("elipseResults")}
        >
          Resultado Operações
        </span>
      </div>
      <div className="cnx-elipse-bread-crambs-container">
        <button
          id={`${cnxId}cnx-dispatch-elipse-refresh`}
          style={{display: 'none'}}
          type="button"
          onClick={() => getList({ PageSize: 100 })}
        ></button>
      </div>

      <CnxTable
        title={`Resultado Operação ${sessionStorage.getItem(`${cnxId}@cnx-order-type`)} - Ordem Nr ${sessionStorage.getItem(`${cnxId}@cnx-order-number`)}`}
        data={localTableData?.items || []}
        // data={rowData?.orderProductions || []}
        head={head}
        isLoading={localLoading}
        reOrderColumn
        refreshTable={refreshList}
        checkable
        rowsChecked={handleRowsChecked}
        enablePagination={handlePagination}
        summaryPagination={summaryPagination}
        customTdFunction={customTdFunction}
        hoverEffect
        enableSummary
        exportButton={() => null}
        // actionButton={handleDialogAdd}
        // deleteButton={openDeleteConfirm}
        cnxStyles={CNX_STYLES}
      />
    </div>
  );
}

export default Table;
