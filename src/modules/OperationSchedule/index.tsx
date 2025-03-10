import { ContextProvider } from "./context/moduleContext";
import NavigationContainer from "./components/NavigationContainer";
import "./styles.css";

const OperationSchedule = () => {
  return (
    <div className="cnx-modules-main-container-cmmc">
      <ContextProvider>
        <NavigationContainer />
      </ContextProvider>
    </div>
  );
};

export default OperationSchedule;