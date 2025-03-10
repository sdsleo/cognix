import { ContextProvider } from "./context/moduleContext";
import NavigationContainer from "./components/NavigationContainer";
import "./styles.css";

const User = () => {
  return (
    <div className="cnx-modules-main-container-cmmc">
      <ContextProvider>
        <NavigationContainer />
      </ContextProvider>
    </div>
  );
};

export default User;