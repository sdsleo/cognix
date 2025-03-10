import { useEffect, useContext, useId, useRef } from "react";
import { CnxTable } from "../../../../components/CnxTable";
import { UseContext } from "../../context/moduleContext";
import { ACTIONS } from "../../context/moduleActions";
import localesContex from "../../../../context/localesContex";
import { ILocales } from "../../../../locales/types";
import useFetch from "../../../../hooks/useFetch";
import { _DELETE, _GET, _GET_BY_FILTERS } from "../../routes";
import "./styles.css";
import CnxDialog from "../../../../components/CnxDialog";
import { IPagination } from "../../routes/types";
import { axiosInstance } from "../../../../http/axiosInstance";

function Table() {
  const CNX_ID_LIST = useId();
  const CNX_ID_DELETE = useId();
  const CNX_ID_CONFIRM = useId();
  const { request } = useFetch();
  const { localesData } = useContext<ILocales>(localesContex);
  const { dispacth, loadingTable, tableData }: any = useContext(UseContext);
  const rowDataRef: any = useRef([]);

  async function getList({ PageSize, PageNumber }: IPagination) {
    dispacth({
      type: ACTIONS.LOADING_TABLE,
      payload: true,
    });
    try {
      const { data } = await axiosInstance(_GET({ PageSize, PageNumber }));

      const newItems = data?.items?.map((item: any) => {
        const newItem = {
          id: item.id,
          code: item.code,
          isActived: item.isActived,
          name: item.name,
          situation: item.situation,
          strIsActived: item.strIsActived,
          transportCost: item.clientCustom.transportCost,
          operationCost: item.clientCustom.operationCost,
          strSituation: item.strSituation,
          clientId: item.clientCustom.clientId,
          contractNumber: item.clientCustom.contractNumber,
          gasPrice: item.clientCustom.gasPrice,
          idCustom: item.clientCustom.id,
          latitude: item.clientCustom.latitude,
          longitude: item.clientCustom.longitude,
          maxFlow: item.clientCustom.maxFlow,
          operationType: item.clientCustom.operationType,
          operationTypeStr: item.clientCustom.strOperationType,
          qtyParkingSpaces: item.clientCustom.qtyParkingSpaces,
          qtyTramos: item.clientCustom.qtyTramos,
          situationCustom: item.clientCustom.situation,
          strSituationCustom: item.clientCustom.strSituation,
        }
        return newItem;
      })
      const newResponse = {
        ...data,
        newItems
      }
      dispacth({
        type: ACTIONS.SET_TABLE_DATA,
        payload: newResponse,
      });
    } catch (err: any) {
      console.log('ERRO', err)
      const modal: any = document.getElementById(CNX_ID_LIST);
      modal?.showModal();
    } finally {
      dispacth({
        type: ACTIONS.LOADING_TABLE,
        payload: false,
      });
    }
  }

  useEffect(() => {
    // getTableData();
    getList({ PageSize: 100 });
  }, []);

  const head = {
    name: "Nome",
    code: "Código",
    latitude: "Latitude",
    longitude: "Longitude",
    qtyTramos: "Qtd Tramos",
    operationType: "Tipo Operação",
    maxFlow: "Vazão Máxima",
    qtyParkingSpaces: "Qtd Vagas Estacionamento",
    gasPrice: "Preço Unitário Gás",
    contractNumber: "Número Contrato",
    transportCost: "Custo Transporte",
    operationCost: "Custo Operacional",
    strIsActived: "Situação"
  };

  const data = [
    {
      nome: "Bracell",
      codigo: "B001",
      latitude: "-12,643509",
      longitude: "-38,333474",
      qtdTramos: 4,
      tipoOperacao: 2,
      vazaoMaxima: "2.500 m³/h",
      qtdVagasEstacionamento: 1,
      precoUnitarioGas: "R$ 2,5717",
      numeroContrato: "0000100",
      situacao: 1,
    }, 
    {
      nome: "Braskem 1",
      codigo: "B001",
      latitude: "-12,655020",
      longitude: "-38,318020",
      qtdTramos: 4,
      tipoOperacao: 2,
      vazaoMaxima: "2.500 m³/h",
      qtdVagasEstacionamento: 2,
      precoUnitarioGas: "R$ 2,6788",
      numeroContrato: "0000101",
      situacao: 1,
    }, 
    {
      nome: "Braskem 2",
      codigo: "N001",
      latitude: "-12,655020",
      longitude: "-38,318020",
      qtdTramos: 4,
      tipoOperacao: 2,
      vazaoMaxima: "2.500 m³/h",
      qtdVagasEstacionamento: 2,
      precoUnitarioGas: "R$ 2,6788",
      numeroContrato: "0000103",
      situacao: 1,
    }, 
    {
      nome: "Humildes",
      codigo: "N001",
      latitude: "-12,354763",
      longitude: "-38,852456",
      qtdTramos: 4,
      tipoOperacao: 2,
      vazaoMaxima: "2.500 m³/h",
      qtdVagasEstacionamento: 1,
      precoUnitarioGas: "R$ 2,3256",
      numeroContrato: "0000104",
      situacao: 1,
    }
  ]

  async function getListFiltered(filters: any) {
    dispacth({
      type: ACTIONS.LOADING_TABLE,
      payload: true,
    });
    try {
      const { data } = await axiosInstance(_GET_BY_FILTERS(filters));
      dispacth({
        type: ACTIONS.SET_TABLE_DATA,
        payload: data,
      });
    } catch (err: any) {
      console.log("ERRO", err);
    } finally {
      dispacth({
        type: ACTIONS.LOADING_TABLE,
        payload: false,
      });
    }
  }

  const filterOptions = {
    route: "",
    filters: [
      {
        title: "Nome",
        query: "Names",
        type: "text",
        keyLabel: "name",
        keyValue: "id",
      },
      {
        title: "Usuário",
        query: "Usernames",
        type: "text",
        keyLabel: "code",
        keyValue: "id",
      },
      {
        title: "Matrícula",
        query: "Codes",
        type: "text",
        keyLabel: "code",
        keyValue: "id",
      },
      {
        title: "Nível de Acesso",
        query: "AccessLevels",
        type: "Select",
        keyLabel: "name",
        keyValue: "id",
        // options: enumerators?.accessLevel,
      },
      {
        title: "Setor",
        query: "DepartmentIds",
        type: "Select",
        keyLabel: "name",
        keyValue: "id",
        // options: enumerators?.departments,
      },
      {
        title: "Grupos",
        query: "GroupsIds",
        type: "MultSelectCheckbox",
        keyLabel: "code",
        keyValue: "id",
        // options: enumerators?.groups,
      },
      {
        title: "Situação",
        query: "Status",
        type: "Select",
        keyLabel: "name",
        keyValue: "id",
        // options: enumerators?.status,
      },
    ],
  };

  // Name
  // Code
  // Latitude
  // Longitude
  // OperationType
  // MaxFlow

  const refreshList = () => {
    getList({ PageSize: 100 });
  };

  // const clearAppliedFilters = () => {
  //   getList({ PageSize: 100 });
  // };

  async function deleteRecords() {
    const ids = rowDataRef.current.map((item: any) => item?.id)
    try {
      await axiosInstance(_DELETE(ids));
      getList({ PageSize: 100 });
    } catch (err: any) {
      console.error(err)
      const modal: any = document.getElementById(CNX_ID_DELETE);
      modal?.showModal();
    } finally {
      const modal: any = document.getElementById(CNX_ID_CONFIRM);
      modal?.close();
    }
  };

  const deleteButton = async () => {
    if (rowDataRef.current.length < 1 || !rowDataRef.current) return
    const modal: any = document.getElementById(CNX_ID_CONFIRM);
    modal?.showModal();
  };

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
      type: ACTIONS.SET_ROW_DATA,
      payload: rowData,
    });
  };

  const handleRowsChecked = (data: any) => {
    rowDataRef.current = data;
  };

  const customTdFunction = [
    {
      key: "name",
      func: (tdValue: any, keyValue: string, rowValue: any) => {
        return (
          <button
            type="button"
            className="cnx-add-area-record-th-number-link"
            onClick={() => openEditModal(rowValue)}
          >
            <span className="searchable">{tdValue || ""}</span>
          </button>
        );
      },
    },
    {
      key: "operationType",
      func: (tdValue: any, keyValue: string, rowValue: any) => {
        return <span style={{fontSize: '14px'}} className="searchable">{rowValue?.operationTypeStr}</span>;
      },
    },
    {
      key: "situacao",
      func: (dataTd: any) => {
        const status = dataTd === 1 ? "Ativo" : "Inativo";
        return <span className="searchable">{status}</span>;
      },
    },
    {
      key: "gasPrice",
      func: (tdValue: any, keyValue: string, rowValue: any) => {
        return <span style={{fontSize: '14px'}} className="searchable">{`R$ ${tdValue || ""}`}</span>;
      },
    },
    {
      key: "clientCustom",
      func: (tdValue: any, keyValue: string, rowValue: any) => {
        return <span style={{fontSize: '14px'}} className="searchable">{`R$ ${rowValue?.clientCustom?.strOperationType || ""}`}</span>;
      },
    },
    {
      key: "maxFlow",
      func: (tdValue: any, keyValue: string, rowValue: any) => {
        return <span style={{fontSize: '14px'}} className="searchable">{`${tdValue || ""} m³/h"`}</span>;
      },
    },
    {
      key: "transportCost",
      func: (tdValue: any, keyValue: string, rowValue: any) => {
        return <span style={{fontSize: '14px'}} className="searchable">{`R$ ${tdValue || ""}`}</span>;
      },
    },
    {
      key: "operationCost",
      func: (tdValue: any, keyValue: string, rowValue: any) => {
        return <span style={{fontSize: '14px'}} className="searchable">{`R$ ${tdValue || ""}`}</span>;
      },
    },
  ];

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


  return (
    <>
      <CnxDialog
        useId={CNX_ID_LIST}
        type="error"
        content={{ title: "Error", message: "Não foi possível listar a tabela" }}
      />
      <CnxDialog
        useId={CNX_ID_DELETE}
        type="error"
        content={{ title: "Error", message: "Não foi possível deletar o registro(s)." }}
      />
      <CnxDialog
        useId={CNX_ID_CONFIRM}
        type="warning"
        content={{ title: "Atenção!", message: "Deseja realmente deletar o(s) registro(s)." }}
        confirmButton={() => deleteRecords()}
        cancelButton={() => null}
      />
      <CnxTable
        title="Clientes"
        data={tableData.newItems || []}
        head={head}
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
        // filterButton={filterOptions}
        // filterResponse={() => null}
      />
    </>
  );
}

export default Table;
