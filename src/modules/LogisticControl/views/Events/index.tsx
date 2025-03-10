import { useState, useId, useRef, useEffect, useContext } from "react";
import CnxDialog from "../../../../components/CnxDialog";
import { CnxTable } from "../../../../components/CnxTable";
import "./styles.css";
import { UseContext } from "../../context/moduleContext";
import { ACTIONS } from "../../context/moduleActions";
import { axiosInstance } from "../../../../http/axiosInstance";
import { _DELETE, _GET, _POST_ORDER_CHILD } from "../../routes";
import { IPagination } from "../../routes/types";
import Input from "../../../../components/CnxInput/InputTypes/Input";
import Select from "../../../../components/CnxInput/InputTypes/Select";
import useFormatDate from "../../../../hooks/useFormatDate";

function Events() {
  const { dispacth, loadingTable, tableData, rowData, enumerators, enumeratorsOrder, page } =
  useContext(UseContext);


  const CNX_ID_LIST = useId();
  const CNX_ID_DELETE = useId();
  const CNX_ID_CONFIRM = useId();
  const rowDataRef: any = useRef([]);

  const editChildOrderNumberRef = useRef<HTMLInputElement>(null!);
  const editChildBaseRef: any = useRef({});
  const editChildClientRef: any = useRef({});
  const editChildPlateRef: any = useRef({});
  const editChildDriverRef: any = useRef({});

  useEffect(() => {
    if (rowData?.id && page === "events") {
      editChildOrderNumberRef.current.value = rowData?.orderNumber;
    }
  }, [rowData]);

  async function getList({ PageSize, PageNumber }: IPagination) {
    dispacth({
      type: ACTIONS.LOADING_TABLE,
      payload: true,
    });
    try {
      const { data } = await axiosInstance(
        _GET({
          PageSize,
          PageNumber,
          OrderProductionOperationId: rowData?.orderProductions?.[0]?.orderProductionOperation?.id
        })
      );
      dispacth({
        type: ACTIONS.SET_TABLE_DATA,
        payload: data,
      });
    } catch (err: any) {
      console.error("ERRO", err);
      const modal: any = document.getElementById(CNX_ID_LIST);
      modal?.showModal();
    } finally {
      dispacth({
        type: ACTIONS.LOADING_TABLE,
        payload: false,
      });
    }
  }

  async function postOrderChild() {
    dispacth({
      type: ACTIONS.LOADING_TABLE,
      payload: true,
    });
    try {
      await axiosInstance(
        _POST_ORDER_CHILD({
          baseId: editChildBaseRef?.current?.id,
          clientId: editChildClientRef?.current?.id,
          driverId: editChildDriverRef?.current?.id,
          orderId: rowData?.id,
          orderNumber: editChildOrderNumberRef?.current?.value,
          vehicleId: editChildPlateRef?.current?.id
        })
      );
    } catch (err: any) {
      console.error("ERRO", err);
      const modal: any = document.getElementById(CNX_ID_LIST);
      modal?.showModal();
    } finally {
      dispacth({
        type: ACTIONS.LOADING_TABLE,
        payload: false,
      });
      document
      .querySelector(".cnx-logistic-control-events-order-child-clceoc")
      ?.classList.add("cnx-display-none");
    }
  }

  useEffect(() => {
    getList({
      PageSize: 100,
      OrderProductionOperationId:
        rowData?.orderProductions?.[0]?.orderProductionOperation?.id,
    });
  }, []);

  const head = {
    id: "id",
    productionLossType: "Tipo",
    productionLoss: "Motivo",
    coments: "Comentário",
    startedDateTime: "Data Hora Início",
    finishedDateTime: "Data Hora Fim",
    strStatus: "Situação",
  };

  const data = [
    {
      id: 1,
      orderNumber: 21576,
      operationNumber: 11576,
      operationName: "Nome Operação",
      type: "Tipo",
      reason: "Motivo",
      comment: "Comentário para Pojuca",
      startDateTime: "06/07/2023 - 13:00:00",
      endDateTime: "07/07/2023 - 14:00:00",
      status: "Em progresso",
    },
    {
      id: 2,
      orderNumber: 21577,
      operationNumber: 11577,
      operationName: "Nome Operação",
      type: "Tipo",
      reason: "Motivo",
      comment: "Comentário para Pojuca",
      startDateTime: "06/07/2023 - 13:00:00",
      endDateTime: "07/07/2023 - 14:00:00",
      status: "Encerrado",
    },
    {
      id: 3,
      orderNumber: 21577,
      operationNumber: 11577,
      operationName: "Nome Operação",
      type: "Tipo",
      reason: "Motivo",
      comment: "Comentário para Pojuca",
      startDateTime: "06/07/2023 - 13:00:00",
      endDateTime: "07/07/2023 - 14:00:00",
      status: "Em progresso",
    },
  ];

  const refreshList = () => {
    getList({
      PageSize: 100,
      OrderProductionOperationId:
        rowData?.orderProductions?.[0]?.orderProductionOperation?.id,
    });
  };

  async function deleteRecords() {
    const ids = rowDataRef.current.map((item: any) => item?.id);
    try {
      await axiosInstance(_DELETE(ids));
      getList({
        PageSize: 100,
        OrderProductionOperationId:
          rowData?.orderProductions?.[0]?.orderProductionOperation?.id,
      });
    } catch (err: any) {
      console.error(err);
      const modal: any = document.getElementById(CNX_ID_DELETE);
      modal?.showModal();
    } finally {
      const modal: any = document.getElementById(CNX_ID_CONFIRM);
      modal?.close();
    }
  }

  const deleteButton = async () => {
    if (rowDataRef.current.length < 1 || !rowDataRef.current) return;
    const modal: any = document.getElementById(CNX_ID_CONFIRM);
    modal?.showModal();
  };

  const customTdFunction = [
    {
      key: "id",
      func: (tdValue: any, keyValue: string, rowData: any) => {
        return (
          <button
            type="button"
            className="cnx-add-area-record-th-number-link"
            onClick={() => openEditModal(rowData)}
          >
            <span className="searchable">{tdValue || ""}</span>
          </button>
        );
      },
    },
    {
      key: "orderNumber",
      func: (tdValue: any, keyValue: string, rowDataItem: any) => {
        return <span className="searchable">{rowData?.orderNumber}</span>;
      },
    },
    {
      key: "productionLoss",
      func: (tdValue: any, keyValue: string, rowData: any) => {
        return (
          <span className="searchable">
            {rowData?.productionLoss?.description}
          </span>
        );
      },
    },
    {
      key: "productionLossType",
      func: (tdValue: any, keyValue: string, rowData: any) => {
        return (
          <span className="searchable">
            {rowData?.productionLoss?.productionLossType?.description}
          </span>
        );
      },
    },
    {
      key: "type",
      func: (tdValue: any, keyValue: string, rowData: any) => {
        return (
          <span className="searchable">
            {rowData?.productionLossType?.description}
          </span>
        );
      },
    },
    {
      key: "startedDateTime",
      func: (tdValue: any, keyValue: string, rowData: any) => {
        return <span className="searchable">{useFormatDate(tdValue)}</span>;
      },
    },
    {
      key: "finishedDateTime",
      func: (tdValue: any, keyValue: string, rowData: any) => {
        return <span className="searchable">{useFormatDate(tdValue)}</span>;
      },
    },
  ];

  const actionButton = () => {
    dispacth({
      type: ACTIONS.EDIT_MODAL,
      payload: false,
    });
    dispacth({
      type: ACTIONS.ADD_MODAL,
      payload: true,
    });
  };

  const openEditModal = (rowData: any) => {

    dispacth({
      type: ACTIONS.ADD_MODAL,
      payload: false,
    });
    dispacth({
      type: ACTIONS.EDIT_MODAL,
      payload: true,
    });
    dispacth({
      type: ACTIONS.SET_ROW_DATA_EVENTS,
      payload: rowData,
    });
  };

  const handleRowsChecked = (data: any) => {
    rowDataRef.current = data;
  };

  const handlePagination = (dataPage: any) => {
    if (dataPage === "first") {
      if (tableData?.pageNumber === 1) return;
      getList({ PageSize: 100, PageNumber: 1 });
    }
    if (dataPage === "previous") {
      if (tableData?.pageNumber === 1) return;
      getList({ PageSize: 100, PageNumber: tableData?.pageNumber - 1 });
    }
    if (dataPage === "next") {
      if (tableData?.pageNumber === tableData?.totalPages) return;
      getList({ PageSize: 100, PageNumber: tableData?.pageNumber + 1 });
    }
    if (dataPage === "last") {
      if (tableData?.pageNumber === tableData?.totalPages) return;
      getList({ PageSize: 100, PageNumber: tableData?.totalPages });
    }
  };

  const summaryPagination = {
    currentPage: tableData?.pageNumber,
    pageCount: tableData?.totalPages,
    itemCount: tableData?.totalItems,
  };

  const buttons = [
    {
      renderButton: (rowsChecked: any) => {
        const handleOpenModal = () => {
          document
            .querySelector(".cnx-logistic-control-events-order-child-clceoc")
            ?.classList.remove("cnx-display-none");
        };
        return (
          <button
            className="cnx-logistic-control-events-create-order-child-clcecoc"
            type="button"
            onClick={() => handleOpenModal()}
          >
            Criar Ordem Filha
          </button>
        );
      },
    },
  ];

  return (
    <div className="cnx-modules-main-container-cmmc">
      <div className="cnx-logistic-control-events-order-child-clceoc cnx-display-none">
        <div className="cnx-logistic-control-events-modal-container-clcemc">
          <h1>Informar dados Ordem Filha</h1>
          <div className="cnx-logistic-control-events-input-container-clceic">
            <Input
              inputRef={editChildOrderNumberRef}
              type="text"
              label="Número Ordem"
              disabled
            />
            <Select
              inputRef={editChildBaseRef}
              keyLabel="name"
              keyValue="id"
              label="Base"
              mandatory
              disabled
              defaultOption={rowData?.orderCustom?.baseId}
              options={[rowData?.orderCustom?.customBase]}
              placeholder="Selecionar"
              className="cnx-orders-product-edit-cope"
              onChange={() => {
                document
                  ?.querySelector(".cnx-orders-product-edit-cope")!
                  .classList?.remove("cnx-input-border-error-highlight");
              }}
            />
            <Select
              inputRef={editChildClientRef}
              keyLabel="name"
              keyValue="id"
              label="Cliente"
              mandatory
              disabled
              defaultOption={rowData?.clientId}
              options={[rowData?.client]}
              placeholder="Selecionar"
              className="cnx-orders-product-edit-cope"
              onChange={() => {
                document
                  ?.querySelector(".cnx-orders-product-edit-cope")!
                  .classList?.remove("cnx-input-border-error-highlight");
              }}
            />
            <Select
              inputRef={editChildPlateRef}
              keyLabel="plate"
              keyValue="id"
              label="Placa"
              mandatory
              // defaultOption={rowData?.product?.id}
              options={enumeratorsOrder?.vehicles || []}
              autoComplete
              placeholder="Selecionar"
              className="cnx-orders-product-edit-cope"
              onChange={() => {
                document
                  ?.querySelector(".cnx-orders-product-edit-cope")!
                  .classList?.remove("cnx-input-border-error-highlight");
              }}
            />
            <Select
              inputRef={editChildDriverRef}
              keyLabel="name"
              keyValue="id"
              label="Motorista"
              // defaultOption={rowData?.orderCustom?.customBase?.id || []}
              options={enumeratorsOrder?.customDrivers || []}
              autoComplete
              placeholder="Selecionar"
              className="cnx-orders-base-edit-cobe"
              onChange={() => {
                document
                  ?.querySelector(".cnx-orders-base-edit-cobe")!
                  .classList?.remove("cnx-input-border-error-highlight");
              }}
            />
          </div>
          <div className="cnx-logistic-control-events-action-buttons-container-clceabc">
            <button
              className="cnx-logistic-control-events-cancel-button-clcecb"
              type="button"
              onClick={() => {
                document
                  .querySelector(
                    ".cnx-logistic-control-events-order-child-clceoc"
                  )
                  ?.classList.add("cnx-display-none");
              }}
            >
              Cancelar
            </button>
            <button
              className="cnx-logistic-control-events-confirm-button-clcecb"
              type="button"
              onClick={() => postOrderChild()}
            >
              Confirmar
            </button>
          </div>
        </div>
      </div>
      <CnxDialog
        useId={CNX_ID_LIST}
        type="error"
        content={{
          title: "Error",
          message: "Não foi possível listar a tabela",
        }}
      />
      <CnxDialog
        useId={CNX_ID_DELETE}
        type="error"
        content={{
          title: "Error",
          message: "Não foi possível deletar o registro(s).",
        }}
      />
      <CnxDialog
        useId={CNX_ID_CONFIRM}
        type="warning"
        content={{
          title: "Atenção!",
          message: "Deseja realmente deletar o(s) registro(s).",
        }}
        confirmButton={() => deleteRecords()}
        cancelButton={() => null}
      />
      <CnxTable
        title={`Ordem: #${rowData?.orderNumber} - Número Operação: #${rowData?.orderProductions?.[0]?.orderProductionOperation?.operation?.number} - Nome Operação: ${rowData?.orderProductions?.[0]?.orderProductionOperation?.operation?.name}`}
        data={tableData.items || []}
        head={head}
        buttons={buttons}
        isLoading={loadingTable}
        reOrderColumn
        refreshTable={refreshList}
        checkable
        customTdFunction={customTdFunction}
        hoverEffect
        enableSummary
        rowsChecked={handleRowsChecked}
        actionButton={actionButton}
        deleteButton={() => deleteButton()}
        enablePagination={handlePagination}
        summaryPagination={summaryPagination}
      />
    </div>
  );
}

export default Events;
