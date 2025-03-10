import { ContextProvider } from "./context/moduleContext";

import FormModalContainer from "./components/FormModalContainer";
import TableContainer from "./components/TableContainer";

import "./styles.css";

const Routes = () => {
  return (
    <div className="cnx-modules-main-container-cmmc">
      <ContextProvider>
        <FormModalContainer />
        <TableContainer />
      </ContextProvider>
    </div>
  );
};

export default Routes;