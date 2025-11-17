import { BrowserRouter } from "react-router-dom";
import store from "./Redux/store";
import { Provider} from "react-redux";
import { Toaster } from "react-hot-toast";
import AppRoutes from "./AppRoutes";

function App() {


  return (
    <>
      <div>
        <Toaster />
      </div>
      <Provider store={store}>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;
