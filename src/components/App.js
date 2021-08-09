import { GlobalContext, useGlobalStore } from "../store/global-store";
import { ErrorBox } from "./common/ErrorBox";
import { Playground } from "./common/Playground"

const App = () => {
  const store = useGlobalStore();
  return (
    <GlobalContext.Provider value={store}>
      <div className="container-fluid">
        <ErrorBox />
        <Playground />
      </div>
    </GlobalContext.Provider>
  );
}

export default App;