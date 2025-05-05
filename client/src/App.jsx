import { Provider } from "react-redux";
import "./App.css";
import { BrowserRouter } from "react-router-dom";
import store from "@/store/store";
import Approute from "@/route";
import { Toaster } from "./components/ui/sonner";

const App = () => {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <Approute />
        <Toaster />
      </Provider>
    </BrowserRouter>
  );
};

export default App;
