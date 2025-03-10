import "./styles.css";
import TableContainer from "./components/TableContainer";

interface IOders {
  cnxId?: any;
}

function Orders({ cnxId }: IOders) {
  return (
    <>
      <TableContainer cnxId={cnxId} />
    </>
  );
}

export default Orders;
