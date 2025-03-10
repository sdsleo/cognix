import { useEffect, useContext, useId, useRef } from "react";
import { CnxTable } from "../../../../components/CnxTable";
import { UseContext } from "../../context/moduleContext";
import { ACTIONS } from "../../context/moduleActions";
import localesContex from "../../../../context/localesContex";
import { ILocales } from "../../../../locales/types";
import CnxDialog from "../../../../components/CnxDialog";
import "./styles.css";
import { IPagination } from '../../routes/types';
import { axiosInstance } from '../../../../http/axiosInstance';
import { _DELETE, _GET } from '../../routes';

function Table() {
  const CNX_ID_LIST = useId();
  const CNX_ID_DELETE = useId();
  const CNX_ID_CONFIRM = useId();
  
  const { localesData } = useContext<ILocales>(localesContex);
  
  const { dispacth, loadingTable, tableData }: any = useContext(UseContext);

  const rowDataRef: any = useRef([]);

  useEffect(() => {
    getList({ PageSize: 100 })
  }, []);

  const head = {
    id: "id",
    code: "Código",
    description: "Description",
    action: "Ação",
    // isPlannedDowntime: "Parada Programada",
    productionLossType: "Tipo",
    rowStatus: "Situação"
  };

  const data = [
    {
      id: 1,
      code: "C001",
      description: "Quebra de Carreta",
      action: "Criar uma ordem filha",
      isPlannedDowntime: 2,
      productionLossTypeId: "Manutenção",
      isActive: 1
    },
    {
      id: 2,
      code: "C002",
      description: "Alteração de cavalo",
      action: "Criar uma ordem filha",
      isPlannedDowntime: 2,
      productionLossTypeId: "Manutenção",
      isActive: 1
    },
    {
      id: 3,
      code: "C003",
      description: "Congelamento",
      action: "Criar uma ordem filha",
      isPlannedDowntime: 2,
      productionLossTypeId: "Manutenção",
      isActive: 1
    },
    {
      id: 4,
      code: "C004",
      description: "Abastecimento",
      action: "",
      isPlannedDowntime: 1,
      productionLossTypeId: "Parada programada",
      isActive: 1
    },
    {
      id: 5,
      code: "C005",
      description: "Troca de turno",
      action: "",
      isPlannedDowntime: 1,
      productionLossTypeId: "Parada programada",
      isActive: 1
    },
  ];


  async function getList({ PageSize, PageNumber }: IPagination) {
    dispacth({
      type: ACTIONS.LOADING_TABLE,
      payload: true,
    });
    try {
      const { data } = await axiosInstance(_GET({ PageSize, PageNumber }));
      dispacth({
        type: ACTIONS.SET_TABLE_DATA,
        payload: data,
      });

      console.log({data})
    } catch (err: any) {
      console.error('ERRO', err)
      const modal: any = document.getElementById(CNX_ID_LIST);
      modal?.showModal();
    } finally {
      dispacth({
        type: ACTIONS.LOADING_TABLE,
        payload: false,
      });
    }
  }
  // const filterOptions = {
  //   route: "/api/Production/User/GetAll",
  //   filters: [
  //     {
  //       title: "Column 1",
  //       query: "column1",
  //       type: "text",
  //       keyLabel: "label",
  //       keyValue: "id",
  //     },
  //     {
  //       title: "Column 2",
  //       query: "column2",
  //       type: "text",
  //       keyLabel: "label",
  //       keyValue: "id",
  //     },
  //     {
  //       title: "Column 3",
  //       query: "column3",
  //       type: "text",
  //       keyLabel: "label",
  //       keyValue: "id",
  //     },
  //     {
  //       title: "Column 4",
  //       query: "column4",
  //       type: "text",
  //       keyLabel: "label",
  //       keyValue: "id",
  //     },
  //     {
  //       title: "Column 5",
  //       query: "column5",
  //       type: "text",
  //       keyLabel: "label",
  //       keyValue: "id",
  //     },
  //   ],
  // };

  const refreshList = () => {
    getList({ PageSize: 100 })
  };

  const deleteRecords = async () => {
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
    if (rowDataRef.current.length < 1 || !rowDataRef.current) return;
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

  const handleRowsChecked = (rows: any) => {
    rowDataRef.current = rows;
  };

  const customTdFunction = [
    {
      key: "id",
      func: (tdValue: any, keyValue: string, rowData: any) => {
        return (
          <button
            type="button"
            className="cnx-text-decoration-link"
            onClick={() => openEditModal(rowData)}
          >
            <span className="searchable">{tdValue}</span>
          </button>
        );
      },
    },
    {
      key: "isPlannedDowntime",
      func: (tdValue: any, keyValue: string, rowData: any) => {
        const status = tdValue === 1 ? "Ativo" : "Inativo";
        return <span className="searchable">{status}</span>;
      },
    },
    {
      key: "productionLossType",
      func: (tdValue: any, keyValue: string, rowData: any) => {
        const status = tdValue.code || '';
        return <span className="searchable">{status}</span>;
      },
    },
    {
      key: "rowStatus",
      func: (tdValue: any, keyValue: string, rowData: any) => {
        const status = tdValue === 1 ? "Ativo" : "Inativo";
        return <span className="searchable">{status}</span>;
      },
    },
  ];

  

  return (
    <>
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
        title="Eventos"
        data={tableData?.items || []}
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
        // filterButton={filterOptions} // Parâmetro para ativar os filtros por coluna
        // filterResponse={() => null} // Promise retornada apos aplica'~ao do filtro
        // csvImportButton={csvExportDefaultModuleExemple} // Adiciona o botão e a funcionalidade de importação CSV
      />
    </>
  );
}

export default Table;
