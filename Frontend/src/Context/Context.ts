import { createContext } from "react";

interface ContextProps {
  edit: boolean;
  setEdit: React.Dispatch<React.SetStateAction<boolean>>;
  openModal: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  schedules: string[]; 
  setSchedules: React.Dispatch<React.SetStateAction<string[]>>;
  selectedId: string; 
  setSelectedId: React.Dispatch<React.SetStateAction<string>>; 
}

const Context = createContext<ContextProps | undefined>(undefined);

export default Context;
