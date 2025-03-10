import { useState, useId, useRef, useEffect, useContext } from "react";
import CnxDialog from "../../../../../../components/CnxDialog";
import { CnxTable } from "../../../../../../components/CnxTable";
import "./styles.css";
import { UseContext } from "../../../../context/moduleContext";
import { ACTIONS } from "../../../../context/moduleActions";
import { axiosInstance } from "../../../../../../http/axiosInstance";
import { _DELETE, _GET, _GET_ANGELIRA_RESULTS_BY_ID } from "../../../../routes";
import { IPagination } from "../../../../routes/types";
import { ILocales } from "../../../../../../locales/types";
import localesContex from "../../../../../../context/localesContex";
import useFormatDate from "../../../../../../hooks/useFormatDate";
import { MapPinIcon, TrackersIcon } from "@fluentui/react-icons-mdl2";

interface ITable {
  cnxId: any;
}

function Table({cnxId}: ITable) {
  const { dispacth, loadingTable, angeLiraResultData, orderOperationId } =
    useContext(UseContext);

  const { localesData } = useContext<ILocales>(localesContex);
  const dialogModalError = useId();
  const rowsCheckedRef: any = useRef(null);
  const [localTableData, setLocalTableData]: any = useState(null);
  const [localLoading, setLocalLoading]: any = useState(false);

  // const orderOperationId = 12890;

  // useEffect(() => {
  //   getList({ PageSize: 100, OrderOperationId: orderOperationId});
  // }, [orderOperationId]);

  const head = {
    id: "id",
    transportCode: "Código do transporte",
    transporNumber: "Número do transporte",
    driverDoc: "CPF do motorista",
    driverName: "Nome do motorista",
    // origem: "Origem",
    // destination: "Destino",
    timeToLeaveOrigem: "Tempo para saída origem (min)",
    // origemLeaveDateTime: "Data hora saída origem",
    // destinationArrivedDateTime: "Data hora chegada destino",
    transportTime: "Tempo de transporte (min)",
    handlingTime: "Tempo de manobra (min)",
    estimatedStartDateTime: "Data Hora Início Prev.",
    startedDateTime: "Data Hora Início Real.",
    finishedDateTime: "Data Hora Fim Real.",
    // estimatedFinishDateTime: "Data hora chegada prevista",
    // origemArrivedDateTime: "Data hora chegada origem",
    travelDistance: "Distância percorrida (km)",
    estimatedDestinationArrivedDateTime: "Data Hora fim Prev.",
    status: "Estágio",
    logs: "Cordenadas",
  };

  const refreshList = () => {
    getList({ PageSize: 100, OrderOperationId: orderOperationId });
  };

  const handleRowsChecked = (data: any) => {
    rowsCheckedRef.current = data;
  };

  async function getList({ PageSize, PageNumber }: IPagination) {
    setLocalLoading(true);
    const operationIdStorage = sessionStorage.getItem(`${cnxId}@cnx-operation-id`);

    try {
      const { data } = await axiosInstance(
        _GET_ANGELIRA_RESULTS_BY_ID({
          PageSize,
          PageNumber,
          OrderOperationId: Number(operationIdStorage),
        })
      );
        setLocalTableData(data)
    } catch (err) {
      console.error(err);
    } finally {
      setLocalLoading(false);
    }
  }

  const handlePagination = (dataPage: any) => {
    if (dataPage === "first") {
      if (localTableData?.pageNumber === 1) return;
      getList({
        PageSize: 100,
        PageNumber: 1,
        OrderOperationId: orderOperationId,
      });
    }
    if (dataPage === "previous") {
      if (localTableData?.pageNumber === 1) return;
      getList({
        PageSize: 100,
        PageNumber: localTableData?.pageNumber - 1,
        OrderOperationId: orderOperationId,
      });
    }
    if (dataPage === "next") {
      if (localTableData?.pageNumber === localTableData?.totalPages)
        return;
      getList({
        PageSize: 100,
        PageNumber: localTableData?.pageNumber + 1,
        OrderOperationId: orderOperationId,
      });
    }
    if (dataPage === "last") {
      if (localTableData?.pageNumber === localTableData?.totalPages)
        return;
      getList({
        PageSize: 100,
        PageNumber: localTableData?.totalPages,
        OrderOperationId: orderOperationId,
      });
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

  const toResults = (id: number) => {
    document
    .getElementById(cnxId + "cnx-order-page-view")
    ?.classList.add("cnx-display-none");
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
    ?.classList.remove("cnx-display-none");

    sessionStorage.setItem(`${cnxId}@cnx-angelira-id`, id.toString())
    setTimeout(() => {
      const btn: any = document.getElementById(`${cnxId}cnx-dispatch-angelira-logs`)
      btn?.click()
    }, 50)
    // dispacth({
    //   type: ACTIONS.SET_ACTIVE_PAGE,
    //   payload: "logsResults",
    // });
    // dispacth({
    //   type: ACTIONS.SET_ANGELIRA_RESULT_ID,
    //   payload: id,
    // });
  };

  const customTdFunction = [
    {
      key: "id",
      func: (tdValue: any, keyValue: string, rowDataAngeLira: any) => {
        return (
          <button
            type="button"
            className="cnx-add-area-record-th-number-link"
            onClick={() => handleDialogEdit(rowDataAngeLira)}
          >
            <span className="searchable">{tdValue || ""}</span>
          </button>
        );
      },
    },
    {
      key: "logs",
      func: (tdValue: any, keyValue: string, rowValue: any) => {
        return (
          <button
            className="cnx-orders-operation-column-info-coci"
            type="button"
            onClick={() => toResults(rowValue?.id)}
          >
            <MapPinIcon />
          </button>
        );
      },
    },
    {
      key: "stage",
      func: (tdValue: any, keyValue: string, rowValue: any) => {
        return (
          <span className="searchable" style={{ fontSize: "0.9rem" }}>
            {rowValue?.status}
          </span>
        );
      },
    },
    {
      key: "driverDoc",
      func: (tdValue: any, keyValue: string, rowValue: any) => {
        return (
          <span className="searchable" style={{ fontSize: "0.9rem" }}>
            {rowValue?.customDriver?.documentCode}
          </span>
        );
      },
    },
    {
      key: "driverName",
      func: (tdValue: any, keyValue: string, rowValue: any) => {
        return (
          <span className="searchable" style={{ fontSize: "0.9rem" }}>
            {rowValue?.customDriver?.name}
          </span>
        );
      },
    },
    {
      key: "estimatedStartDateTime",
      func: (tdValue: any, keyValue: string, rowValue: any) => {
        return (
          <span className="searchable" style={{ fontSize: "0.9rem" }}>
            {useFormatDate(tdValue)}
          </span>
        );
      },
    },
    {
      key: "startedDateTime",
      func: (tdValue: any, keyValue: string, rowValue: any) => {
        return (
          <span className="searchable" style={{ fontSize: "0.9rem" }}>
            {useFormatDate(tdValue)}
          </span>
        );
      },
    },
    {
      key: "finishedDateTime",
      func: (tdValue: any, keyValue: string, rowValue: any) => {
        return (
          <span className="searchable" style={{ fontSize: "0.9rem" }}>
            {useFormatDate(tdValue)}
          </span>
        );
      },
    },
    {
      key: "estimatedDestinationArrivedDateTime",
      func: (tdValue: any, keyValue: string, rowValue: any) => {
        return (
          <span className="searchable" style={{ fontSize: "0.9rem" }}>
            {useFormatDate(tdValue)}
          </span>
        );
      },
    },
  ];

  const handleDialogAdd = () => {
    dispacth({
      type: ACTIONS.ADD_MODAL,
      payload: false,
    });
    dispacth({
      type: ACTIONS.EDIT_MODAL,
      payload: false,
    });
    dispacth({
      type: ACTIONS.EDIT_ALL_MODAL,
      payload: false,
    });
    dispacth({
      type: ACTIONS.ADD_ANGELIRA_RESULTS_MODAL,
      payload: true,
    });
  };

  const handleDialogEdit = (rowDataAngeLira: any) => {
    sessionStorage.setItem(`${cnxId}@cnx-row-data-angelira`, JSON.stringify(rowDataAngeLira));
    setTimeout(() => {
      const btn = document.getElementById(`${cnxId}cnx-open-angelira-edit-modal`);
      btn?.click();
    }, 50);
    // dispacth({
    //   type: ACTIONS.SET_ANGELIRA_ROW_DATA,
    //   payload: rowDataAngeLira,
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
    //   payload: true,
    // });
  };

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
            const btn = document.getElementById(`${cnxId}cnx-close-angelira-edit-modal`);
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
          Resultado Transporte
        </span>
      </div>
      <div className="cnx-elipse-bread-crambs-container">
        <button
          id={`${cnxId}cnx-dispatch-angelira-refresh`}
          style={{display: 'none'}}
          type="button"
          onClick={() => getList({ PageSize: 100 })}
        ></button>
      </div>
      <CnxTable // ${cnxId}@cnx-order-type
        title={`Resultado Transporte ${sessionStorage.getItem(`${cnxId}@cnx-order-type`)} - Ordem Nr ${sessionStorage.getItem(`${cnxId}@cnx-order-number`)}`}
        // data={data || []}
        data={localTableData?.items || []}
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
