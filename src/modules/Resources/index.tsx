import { useState } from "react";
import TreeView from "./components/TreeView";
import "./styles.css";
import { ContextProvider } from "./context/moduleContext";
import FormModalContainer from "./components/FormModalContainer";
import TableContainer from "./components/TableContainer";
function Resources() {
  const [tableData, setTableData] = useState([{}]);
  const [selectedRecource, setSelectedRecource] = useState<any>();
  return (
    <div className="cnx-modules-main-resources-container-cmmrc">
      <ContextProvider>
        {/* <TreeView
          tableData={tableData}
          setTableData={setTableData}
          selectedResources={selectedRecource}
          setSelectedRecource={setSelectedRecource}
        /> */}
        <FormModalContainer />
        <TableContainer />
      </ContextProvider>
    </div>
  );
}

export default Resources;
