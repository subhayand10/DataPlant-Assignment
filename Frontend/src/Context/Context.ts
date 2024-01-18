import { createContext } from "react";

interface ScheduleItem {
  id: string; 
  Title: string;
  Description: string;
  Subject: string;
  Frequency: string;
  Time: string;
}

interface ContextProps {
  edit: boolean;
  setEdit: React.Dispatch<React.SetStateAction<boolean>>;
  openModal: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  schedules: ScheduleItem[];
  setSchedules: React.Dispatch<React.SetStateAction<ScheduleItem[]>>;
  selectedId: string;
  setSelectedId: React.Dispatch<React.SetStateAction<string>>;
}

const Context = createContext<ContextProps | undefined>(undefined);

export default Context;
