import './styles.css'
import React, { Suspense, ReactElement, useContext } from "react";
import menuContex from "../../views/Main/context/menuContex";
import { IState } from '../../views/Main/context/types';

function Dashboard() {
  const { tabsState }: IState = useContext(menuContex);
  const csvExportUsersExemple = {
    url: "http://api/csvimport",
    title: "Template Operacao",
    head: {
      code: "code",
      name: "name",
      description: "description",
      starttime: "starttime",
      endtime: "endtime"
    },
    rows: [
      {
        code: "C001",
        name: "RAYBAN",
        description: "DESCRICAO_RAYBAN",
        starttime: "01/01/2022",
        endtime: "30/03/2022"
      },
      {
        code: "C002",
        name: "OKLAY",
        description: "DESCRICAO_OKLAY",
        starttime: "01/01/2022",
        endtime: "30/03/2022"
      },
      {
        code: "C003",
        name: "CHILLI_BEANS",
        description: "DESCRICAO_CHILLI_BEANS",
        starttime: "01/01/2022",
        endtime: "30/03/2022"
      },
    ],
  };
  return (
    // <CsvImport
    //   titleCSV="Operações"
    //   urlRequest={csvExportUsersExemple.url}
    //   csvHeadExample={csvExportUsersExemple.head}
    //   csvRowsExample={csvExportUsersExemple.rows}
    // />
    <div className={`cnx-testr ${tabsState?.length + 1}`}>

      <div
        className={`bg${tabsState?.length + 1} cnx-testr`}
      >
        <h1>Dashboard</h1>
        <input type="text" />
      </div>

    </div>
  );
}
export default Dashboard;
