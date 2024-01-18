import React, { useState, ReactNode } from "react";
import Context from "./Context";

interface ContextProviderProps {
  children: ReactNode;
}
interface ScheduleItem {
  id: string;
  Title: string;
  Description: string;
  Subject: string;
  Frequency: string;
  Time: string;
}


const ContextProvider: React.FC<ContextProviderProps> = ({ children }) => {
  const [schedules, setSchedules] = useState<ScheduleItem[]>([]); 
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
