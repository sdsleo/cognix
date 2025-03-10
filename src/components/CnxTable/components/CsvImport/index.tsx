import ChromeClose from "../../../../assets/icons/FluentUI/SVGs/ChromeClose";
import OpenFile from "../../../../assets/icons/FluentUI/SVGs/OpenFile";

import "./styles.css";
import { useState, useEffect } from "react";
import DownloadDocument from "../../../../assets/icons/FluentUI/SVGs/DownloadDocument";

export function CsvImport({
  id,
  csvImportButton
}: any) {
  const [currentFileName, setCurrentFileName]: any = useState();
  const [jsonCsv, setJsonCsv]: any = useState([]);

  const clearCsvList = () => {
    setJsonCsv([]);
    setCurrentFileName("");
    const fileInput: any = document.getElementById("cnx-csv-file-ccf");
    fileInput.value = null;
  };

  const convertToCSV = (objArray: any) => {
    const array =
      typeof objArray !== "object" ? JSON.parse(objArray) : objArray;
    let str = "";

    for (let i = 0; i < array.length; i++) {
      let line = "";

      for (const index in array[i]) {
        if (line !== "") line += ";";

        line += array[i][index];
      }

      str += `${line}\r\n`;
    }
    return str.replaceAll(" ", ";");
  };

  const exportCSVFile = (headers: any, items: any, fileTitle: any) => {
    if (headers) {
      items.unshift(headers);
    }

    const jsonObject = JSON.stringify(items);

    const csv = convertToCSV(jsonObject);
    const exportedFilename = `${fileTitle}.csv` || "export.csv";

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    let newNavigator: any;
    newNavigator = window.navigator;
    if (newNavigator.msSaveBlob) {
      // IE 10+
      newNavigator.msSaveBlob(blob, exportedFilename);
    } else {
      const link = document.createElement("a");
      if (link.download !== undefined) {
        // feature detection
        // Browsers that support HTML5 download attribute
        items.shift();
        const url = URL.createObjectURL(blob);
        link.setAttribute("href", url);
        link.setAttribute("download", exportedFilename);
        link.style.visibility = "hidden";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    }
  };

  //

  function readFile(e: any) {
    // const CSVToJSON = (data: any, delimiter = ",") => {
    //   const titles = data.slice(0, data.indexOf("\n")).split(delimiter);
    //   return data
    //     .slice(data.indexOf("\n") + 1)
    //     .split("\n")
    //     .map((v: any) => {
    //       const values = v.split(delimiter);
    //       return titles.reduce(
    //         (obj: any, title: any, index: any) => (
    //           (obj[title] = values[index]), obj
    //         ),
    //         {}
    //       );
    //     });
    // };

    const parseCSV = (text: any) => {
      const result = {
        header: [],
        data: [],
      };

      const fixRowsChar = () => {
        const rows = text.split("\n");
        const rowsFixed = rows.map((row: any) => row.replace(/[\r\n]+/g, ""));
        const rowsFiltered = rowsFixed.filter((row: any) => row.length > 1);
        return rowsFiltered;
      };

      const [header, ...content] = fixRowsChar();

      result.header = header.split(";");

      content.forEach((item: any) => {
        //@ts-ignore
        result.data.push(item.split(";"));
      });

      let keys = result.header;
      const objectsArray = result.data.map((row: any) => {
        const rowObject: any = {};
        keys.forEach((key: any, i: any) => (rowObject[key] = row[i]));
        return rowObject;
      });

      return objectsArray;
    };

    let file = e.target.files[0];

    let reader = new FileReader();

    reader.readAsText(file);

    reader.onload = function () {
      setJsonCsv(parseCSV(reader.result));
      setCurrentFileName(file?.name);
    };

    reader.onerror = function () {
      console.log(reader.error);
    };
  }

  const ThRow = ({ records }: any) => {
    const keys = Object.keys(records[0] || []);
    return (
      <tr className="cnx-tr-csv-ctc">
        <th className="cnx-th-csv-ctc">Linhas</th>
        {keys?.map((key: string) => (
          <th className="cnx-th-csv-ctc" key={key}>
            {key}
          </th>
        ))}
        <th className="cnx-th-csv-ctc"></th>
      </tr>
    );
  };

  const TdRow = ({ records, index }: any) => {
    const keys: any = Object.keys(records);
    return (
      <tr className="cnx-tr-csv-ctc">
        <td className="cnx-td-csv-ctc" data-label="linha">
          {index + 1}
        </td>
        {keys?.map((key: any) => (
          <td data-label={key} className="cnx-td-csv-ctc" key={key}>
            {records[key]}
          </td>
        ))}
        <td className="cnx-td-csv-ctc cnx-td-last-ctl" data-label="">
          <button
            className="cnx-btn-close-td-last-cbctl"
            type="button"
            onClick={() => console.log("close")}
          >
            <ChromeClose />
          </button>
        </td>
      </tr>
    );
  };

  const handleCloseCsvImport = () => {
    document
      .getElementById(id)
      ?.classList.add("cnx-csv-import-container-display-none-ccidn");
  };

  return (
    <div
      id={id}
      className="cnx-csv-import-container-ccic cnx-csv-import-container-display-none-ccidn"
    >
      <div className="cnx-csv-import-header-actions-cciha">
        <div className="cnx-csv-import-breadcrumbs-ccib">
          <button
            className="cnx-csv-import-breadcrumbs-btn-hint-ccibbh"
            onClick={() => handleCloseCsvImport()}
          >
            {csvImportButton?.title || "Lista de registros"}
          </button>
          <span>/</span>
          <button className="cnx-csv-import-breadcrumbs-btn-ccibb">
            Importador CSV
          </button>
        </div>
        <button
          className="cnx-csv-import-close-ccic"
          onClick={() => handleCloseCsvImport()}
        >
          <ChromeClose />
        </button>
      </div>
      <div className="cnx-csv-import-input-file-container-cciifc">
        <div className="cnx-csv-import-btn-actions-ccica">
          <input
            type="text"
            value={currentFileName || ""}
            placeholder="Selecione um arquivo CSV"
            className="cnx-csv-import-input-txt-cciit"
          />
          <label
            htmlFor="cnx-csv-file-ccf"
            className="cnx-csv-import-label-ccil"
          >
            <OpenFile />
          </label>
          <input
            type="file"
            id="cnx-csv-file-ccf"
            className="cnx-csv-import-input-file-cciif"
            onChange={(e) => readFile(e)}
          />
        </div>

        <button
          className="cnx-csv-import-btn-clear-ccibc"
          onClick={() => clearCsvList()}
        >
          Limpar
        </button>
        <button
          className="cnx-csv-import-btn-save-ccibs"
          onClick={() => clearCsvList()}
        >
          Salvar
        </button>
      </div>
      <div className="cnx-csv-import-summary-ccis">
        <span>Limite de 1000 linhas por CSV</span>
        <span>{`${jsonCsv.length || 0}  linhas adicionadas`}</span>
      </div>

      <div className="cnx-table-csv-container-ctcc">
        {jsonCsv.length > 0 ? (
          <table className="cnx-table-csv-ctc">
            <thead className="cnx-thead-csv-ctc">
              <ThRow records={jsonCsv} />
            </thead>
            <tbody className="cnx-tbody-csv-ctc">
              {jsonCsv?.map((records: any, index: number) => (
                <TdRow records={records} index={index} />
              ))}
            </tbody>
          </table>
        ) : (
          <div className="cnx-no-csv-import-container-cncic">
            <div className="cnx-no-csv-import-action-cncia">
              <span>Para disponibilizar o preview importe um template</span>
              <button
                type="button"
                onClick={() =>
                  exportCSVFile(csvImportButton?.head, csvImportButton?.rows, csvImportButton?.title)
                }
              >
                <span>Baixar exemplo template csv</span>
                <DownloadDocument />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
