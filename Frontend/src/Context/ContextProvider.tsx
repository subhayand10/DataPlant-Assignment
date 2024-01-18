import React, { useState, ReactNode } from "react";
import Context from "./Context";

interface ContextProviderProps {
  children: ReactNode;
}


const ContextProvider: React.FC<ContextProviderProps> = ({ children }) => {
  const [schedules, setSchedules] = useState<any[]>([]); 
  const [selectedId, setSelectedId] = useState<string>("");
  const [edit, setEdit] = useState<boolean>(false);
  const [openModal, setOpenModal] = useState<boolean>(false);

  return (
    <Context.Provider
      value={{
        edit,
        setEdit,
        openModal,
        setOpenModal,
        schedules,
        setSchedules,
        selectedId,
        setSelectedId,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default ContextProvider;
