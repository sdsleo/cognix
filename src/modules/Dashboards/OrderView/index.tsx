import { ContextProvider } from "./context/moduleContext";
import NavigationContainer from "./NavigationContainer";
import FormModalContainer from "./FormModalContainer";

const DashboaedView = () => {
  return (
    <div className="cnx-modules-main-container-cmmc">
      <ContextProvider>
        <NavigationContainer />
        {/* <FormModalContainer /> */}
      </ContextProvider>
    </div>
  );
};

export default DashboaedView;