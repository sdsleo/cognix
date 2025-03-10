import { ContextProvider } from "./context/moduleContext";

import FormModalContainer from "./components/FormModalContainer";
import TableContainer from "./components/TableContainer";

import "./styles.css";

const GEDApproval = () => {
  return (
    <div className="cnx-user-main-container-cutc">
      <ContextProvider>
        <FormModalContainer />
        <TableContainer />
      </ContextProvider>
    </div>
  );
};

export default GEDApproval;