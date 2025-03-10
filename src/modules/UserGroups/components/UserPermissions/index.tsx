import { useState, useId, useRef, useEffect, useContext } from "react";
import CnxDialog from "../../../../components/CnxDialog";
import { CnxTable } from "../../../../components/CnxTable";
import "./styles.css";
import { UseContext } from "../../context/moduleContext";
import { ACTIONS } from "../../context/moduleActions";
import { Select } from "../../../../components/CnxInput";
import { _GET_GROUP_GRANT, _PUT_GROUP_GRANT } from "../../routes";
import { axiosInstance } from "../../../../http/axiosInstance";

function Table({ ids }: string | any) {
  const inputCnxRef = useRef();
  const OpenModal = document.getElementById(ids);
  const { dispacth, groupId, groupGrantData, rowData } = useContext(UseContext);

  const dialogModal = useId();
  const [modal, setModal] = useState({
    title: "Sucesso!",
    type: "success",
    message: "O registro foi adicionado com êxito",
  });
  const [data, setData]: any = useState([]);

  useEffect(() => {
    getGroupGrantList(groupId);
  }, []);

  const head = {
    id: "Código",
    strSituation: "Descrição",
    isActived: "Situação",
  };

  async function getGroupGrantList(groupId: number | null) {
    const { data } = await axiosInstance(_GET_GROUP_GRANT(groupId));
    dispacth({
      type: ACTIONS.SET_GROUP_GRANT_DATA,
      payload: data,
    });
  }

  async function updateGroupGrant(id: number, isActived: number) {
    await axiosInstance(_PUT_GROUP_GRANT(id, isActived));

    getGroupGrantList(groupId)
  }

  const refreshList = () => {};

  const rowClick = (rowData: any) => {
    dispacth({
      type: ACTIONS.SET_ROW_DATA,
      payload: rowData,
    });
  };

  const updadeGroupGrant = (data: any) => {
    dispacth({
      type: ACTIONS.SET_ROW_DATA,
      payload: data,
    });
  };

  const customTdFunction = [
    {
      key: "id",
      func: (tdValue: any, keyValue: string, rowData: any) => {
        return <span className="searchable">{rowData?.grant?.code}</span>;
      },
    },
    {
      key: "strSituation",
      func: (tdValue: any, keyValue: string, rowData: any) => {
        return (
          <span className="searchable">{rowData?.grant?.description}</span>
        );
      },
    },
    {
      key: "isActived",
      func: (tdValue: any, keyValue: string, rowData: any) => {
        return (
          <Select
            keyLabel="code"
            keyValue="id"
            onChange={(e: any) => updateGroupGrant(rowData?.id, e.id)}
            defaultOption={rowData?.isActived ? 1 : 0}
            options={[
              { id: 0, code: "Inativo" },
              { id: 1, code: "Ativo" },
            ]}
            inputRef={inputCnxRef}
            placeholder="Ativo"
          />
        );
      },
    },
  ];

  const handleDialogEdit = () => {
    OpenModal?.classList.add("ContainerOpen");
    dispacth({
      type: ACTIONS.ADD_MODAL,
      payload: false,
    });
  };

  const handleDialogAdd = () => {
    OpenModal?.classList.add("ContainerOpen");
    dispacth({
      type: ACTIONS.SET_ROW_DATA,
      payload: {},
    });
    dispacth({
      type: ACTIONS.ADD_MODAL,
      payload: true,
    });
  };

  const csvExportUsersExemple = {
    urlRequest: "http://api/csvimport",
    title: "Template Operacao",
    head: {
      code: "code",
      name: "name",
      description: "description",
      starttime: "starttime",
      endtime: "endtime",
    },
    rows: [
      {
        code: "C001",
        name: "RAYBAN",
        description: "DESCRICAO_RAYBAN",
        starttime: "01/01/2022",
        endtime: "30/03/2022",
      },
      {
        code: "C002",
        name: "OKLAY",
        description: "DESCRICAO_OKLAY",
        starttime: "01/01/2022",
        endtime: "30/03/2022",
      },
      {
        code: "C003",
        name: "CHILLI_BEANS",
        description: "DESCRICAO_CHILLI_BEANS",
        starttime: "01/01/2022",
        endtime: "30/03/2022",
      },
    ],
  };

  return (
    <div className="cnx-modules-main-container-cmmc">
      <CnxDialog
        useId={dialogModal}
        type={modal.type}
        content={{
          title: modal.title,
          message: modal.message,
        }}
        // cancelButton={handleCancelButton}
        // confirmButton={handleCancelButton}
      />

      <CnxTable
        title={`Permissões de Grupo de Usuários: ${rowData?.description}`}
        data={groupGrantData || []}
        head={head}
        // buttons={buttons}
        // exportButton={rowClick}
        noSearchBar
        // saveButton={rowClick}
        // isLoading={loadingDatatable}
        // reOrderColumn
        // refreshTable={refreshList}
        // enableRowClick={rowClick}
        // checkable
        // enablePagination={handlePagination}
        // summaryPagination={summaryPagination}
        customTdFunction={customTdFunction}
        // cnxStyles={CNX_STYLES}
        // customTheme={customTheme}
        hoverEffect
        enableSummary
        // rowsChecked={handleRowsChecked}
        // actionButton={handleDialogAdd}
        // editButton={handleRowsChecked}
        // deleteButton={handleRowsChecked}
        // filterButton={filterOptions}
        // filterResponse={handleRowsChecked}
        // csvImportButton={csvExportUsersExemple}
      />
    </div>
  );
}

export default Table;
