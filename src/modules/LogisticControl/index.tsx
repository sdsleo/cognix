import { ContextProvider } from "./context/moduleContext";
import "./styles.css";
import NavigationContainer from "./components/NavigationContainer";
import FormModalContainer from "./views/FormModalContainer";

export default function LogisticControl() {
  return (
    <div className="cnx-modules-main-container-cmmc">
      <ContextProvider>
        <FormModalContainer />
        <NavigationContainer />
      </ContextProvider>
    </div>
  );
};