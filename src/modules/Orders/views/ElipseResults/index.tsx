import FormModalContainer from "./components/FormModalContainer";
import TableContainer from "./components/TableContainer";
import "./styles.css";
 interface IElipseResults {
  cnxId?: any;
 }

function ElipseResults({cnxId}: IElipseResults) {
  return (
    <>
      <FormModalContainer cnxId={cnxId}/>
      <TableContainer cnxId={cnxId}/>
    </>
  );
}

export default ElipseResults;