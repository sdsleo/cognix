import { ContextProvider } from "./context/moduleContext";
import NavigationContainer from "./NavigationContainer";

const DashboaedView = () => {
  return (
    <div className="cnx-modules-main-container-cmmc">
      <ContextProvider>
        <NavigationContainer />
      </ContextProvider>
    </div>
  );
};

export default DashboaedView;