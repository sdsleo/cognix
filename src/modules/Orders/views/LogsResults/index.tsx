import { useState, useId, useRef, useEffect, useContext } from "react";
import CnxDialog from "../../../../components/CnxDialog";
import { CnxTable } from "../../../../components/CnxTable";
import "./styles.css";
import { UseContext } from "../../context/moduleContext";
import { ACTIONS } from "../../context/moduleActions";
import { axiosInstance } from "../../../../http/axiosInstance";
import {
  _DELETE,
  _GET,
  _GET_ANGELIRA_LOGS_RESULTS_BY_ID,
  _GET_OPERATION_BY_ORDER_ID,
} from "../../routes";
import { IPagination } from "../../routes/types";
import { ILocales } from "../../../../locales/types";
import localesContex from "../../../../context/localesContex";
import useFormatDate from "../../../../hooks/useFormatDate";
import { TrackersIcon } from "@fluentui/react-icons-mdl2";
interface ITable {
  cnxId?: any;
}
function Table({ cnxId }: ITable) {
  const {
    dispacth,
    angeLiraLogsResultData,
    loadingTable,
    rowData,
    orderId,
    angeLiraResultId,
  } = useContext(UseContext);
  const { localesData } = useContext<ILocales>(localesContex);
  const dialogModalError = useId();
  const rowsCheckedRef: any = useRef(null);
  const [localTableData, setLocalTableData]: any = useState(null);
  const [localLoading, setLocalLoading]: any = useState(false);

  // useEffect(() => {
  //   getList({ PageSize: 100, AngeLiraResultId: angeLiraResultId});
  // }, [angeLiraResultId]);

  const head = {
    dateTime: "Data Hora",
    latitude: "Latitude",
    longitude: "Longitude",
  };

  const data = [
    {
      dateTime: "27/07/2023 - 12:00:00",
      latitude: "-00006543",
      longitude: "-00457343",
    },
    {
      dateTime: "27/07/2023 - 12:00:00",
      latitude: "-00006543",
      longitude: "-00457343",
    },
    {
      dateTime: "27/07/2023 - 12:00:00",
      latitude: "-00006543",
      longitude: "-00457343",
    },
  ];

  const refreshList = () => {
    getList({ PageSize: 100, AngeLiraResultId: angeLiraResultId });
  };

  const handleRowsChecked = (data: any) => {
    rowsCheckedRef.current = data;
  };

  async function getList({
    PageSize,
    PageNumber,
    AngeLiraResultId,
  }: IPagination) {
    setLocalLoading(true);
    const angeliraIdStorage = sessionStorage.getItem(
      `${cnxId}@cnx-angelira-id`
    );
    try {
      const { data } = await axiosInstance(
        _GET_ANGELIRA_LOGS_RESULTS_BY_ID({
          PageSize,
          PageNumber,
          AngeLiraResultId: Number(angeliraIdStorage),
        })
      );
      setLocalTableData(data);
      // dispacth({
      //   type: ACTIONS.SET_ANGELIRA_LOGS_RESULT_DATA,
      //   payload: data,
      // });
    } catch (err) {
      console.error(err);
    } finally {
      setLocalLoading(false);
      // dispacth({
      //   type: ACTIONS.LOADING_TABLE,
      //   payload: false,
      // });
    }
  }

  const handlePagination = (dataPage: any) => {
    if (dataPage === "first") {
      if (angeLiraLogsResultData?.pageNumber === 1) return;
      getList({ PageSize: 100, PageNumber: 1 });
    }
    if (dataPage === "previous") {
      if (angeLiraLogsResultData?.pageNumber === 1) return;
      getList({
        PageSize: 100,
        PageNumber: angeLiraLogsResultData?.pageNumber - 1,
      });
    }
    if (dataPage === "next") {
      if (
        angeLiraLogsResultData?.pageNumber ===
        angeLiraLogsResultData?.totalPages
      )
        return;
      getList({
        PageSize: 100,
        PageNumber: angeLiraLogsResultData?.pageNumber + 1,
      });
    }
    if (dataPage === "last") {
      if (
        angeLiraLogsResultData?.pageNumber ===
        angeLiraLogsResultData?.totalPages
      )
        return;
      getList({
        PageSize: 100,
        PageNumber: angeLiraLogsResultData?.totalPages,
      });
    }
  };

  const summaryPagination = {
    currentPage: angeLiraLogsResultData?.pageNumber,
    pageCount: angeLiraLogsResultData?.totalPages,
    itemCount: angeLiraLogsResultData?.totalItems,
  };

  const CNX_STYLES = {
    cnxColumnGap: {
      paddingRight: "20px",
    },
  };

  const customTdFunction = [
    {
      key: "logs",
      func: (tdValue: any, keyValue: string, rowValue: any) => {
        return (
          <button
            className="cnx-orders-operation-column-info-coci"
            type="button"
            onClick={
              () => null
              // toOperationResults(
              //   rowValue?.orderProductionOperation?.id,
              //   rowValue?.orderProductionOperation?.operation?.number
              // )
            }
          >
            <TrackersIcon />
          </button>
        );
      },
    },
    {
      key: "dateTime",
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
      <button
        id={`${cnxId}cnx-dispatch-angelira-logs`}
        style={{ display: "none" }}
        type="button"
        onClick={() => getList({ PageSize: 100 })}
      ></button>
      <div className="cnx-groups-breadcrumbs-cgb">
        <span
          className="cnx-groups-crumb-groups-cgcg cnx-groups-hint-crumb-cghc"
          onClick={() => {
            const btn = document.getElementById(
              `${cnxId}cnx-close-angelira-edit-modal`
            );
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
          className="cnx-groups-crumb-permissions-cgcp cnx-groups-hint-crumb-cghc"
          onClick={() => {
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
            ?.classList.remove("cnx-display-none");
          document
            .getElementById(cnxId + "cnx-logs-results-page-view")
            ?.classList.add("cnx-display-none");
          }}
        >
          Resultado Transporte /{" "}
        </span>
        <span
          className="cnx-groups-crumb-permissions-cgcp"
          // onClick={() => {

          // }}
        >
          Logs
        </span>
      </div>
      <CnxTable
        title="Resultado Transporte"
        // data={data || []}
        data={localTableData?.items || []}
        head={head}
        isLoading={localLoading}
        reOrderColumn
        refreshTable={refreshList}
        // checkable
        // rowsChecked={handleRowsChecked}
        enablePagination={handlePagination}
        summaryPagination={summaryPagination}
        customTdFunction={customTdFunction}
        hoverEffect
        enableSummary
        // exportButton={() => null}
        cnxStyles={CNX_STYLES}
      />
    </div>
  );
}

export default Table;
