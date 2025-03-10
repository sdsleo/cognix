import { ContextProvider } from "./context/moduleContext";
import NavigationContainer from "./components/NavigationContainer";
import FormModalContainer from "./views/Orders/components/FormModalContainer";
import "./styles.css";
import OperationModalContainer from "./views/Orders/components/OperationModal";
import { useId } from "react";

export default function Orders() {
  const cnxId = useId();
  return (
    <div className="cnx-modules-main-container-cmmc">
      <ContextProvider>
        <OperationModalContainer cnxId={cnxId} />
        <FormModalContainer cnxId={cnxId} />
        <NavigationContainer cnxId={cnxId} />
      </ContextProvider>
    </div>
  );
};