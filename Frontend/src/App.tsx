import { useContext } from "react";
import LeftNav from "./components/LeftNav/LeftNav";
import Header from "./components/Header/Header";
import "./App.css";
import SchedulerModal from "./components/SchedulerModal/SchedulerModal";
import Context from "./Context/Context";

const App: React.FC = () => {
  const { edit, openModal } = useContext(Context);

  return (
    <>
      <div className="container">
        <LeftNav />
        <Header />
      </div>
      <div
        className={openModal ? (edit ? "editModal" : "addModal") : "hideModal"}
      >
        <SchedulerModal />
      </div>
    </>
  );
};

export default App;
