import FormModalContainer from "./components/FormModalContainer";
import TableContainer from "./components/TableContainer";
import "./styles.css";
interface IAngeLiraResults {
  cnxId: any;
}
function AngeLiraResults({cnxId}: IAngeLiraResults) {
  return (
    <>
      <FormModalContainer cnxId={cnxId}/>
      <TableContainer cnxId={cnxId}/>
    </>
  );
}

export default AngeLiraResults;
