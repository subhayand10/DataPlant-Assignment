import { useState, useContext, useEffect } from "react";
import "./SchedulerModal.css";
import Context from "../../Context/Context";
import axios from "axios";
import backend_endpoint from "../../../config";

interface NewData {
  Title: string;
  Description: string;
  Subject: string;
  Frequency: string;
  Time: string;
}

interface Weekdays {
  Sunday: boolean;
  Monday: boolean;
  Tuesday: boolean;
  Wednesday: boolean;
  Thursday: boolean;
  Friday: boolean;
  Saturday: boolean;
}

const SchedulerModal: React.FC = () => {
  const { edit, setEdit, setOpenModal, setSchedules, selectedId } =
    useContext(Context) !;

  const [newData, setNewData] = useState<NewData>({
    Title: "",
    Description: "",
    Subject: "",
    Frequency: "weekly",
    Time: "10:00 AM",
  });

  const [weekdays, setWeekdays] = useState<Weekdays>({
    Sunday: false,
    Monday: false,
    Tuesday: false,
    Wednesday: false,
    Thursday: false,
    Friday: false,
    Saturday: false,
  });

  const [save, setSave] = useState<boolean>(false);
  const [frequency, setFrequency] = useState<string>("weekly");
  const [localEdit, setLocalEdit] = useState<boolean>(false);

  const handleCancel = () => {
    setOpenModal(false);
    setEdit(false);
    setSave(false);
    setWeekdays({
      Sunday: false,
      Monday: false,
      Tuesday: false,
      Wednesday: false,
      Thursday: false,
      Friday: false,
      Saturday: false,
    });
    setNewData({ ...newData, Title: "", Description: "", Subject: "" });
  };

  const handleSaveEdit = () => {
    if (!edit) setSave(true);
    else setLocalEdit(true);
    setOpenModal(false);
    //setNewData({ ...newData, Title: "", Description: "", Subject: "" });
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const [key, value] = [e.target.name, e.target.value];
    if (key === "Frequency") setFrequency(value);
    setNewData({ ...newData, [key]: value });
    console.log(newData);
  };

  useEffect(() => {
    async function addSchedules() {
      try {
        console.log(newData)
        const data = await axios.post(`${backend_endpoint}/schedules`, newData);
        setNewData({ ...newData, Title: "", Description: "", Subject: "" });
        console.log(data.data);
        setSchedules(data.data);
        setSave(false);
      } catch (error) {
        console.log(error);
      }
    }

    async function editSchedules() {
      try {
        const data = await axios.patch(
          `${backend_endpoint}/schedules/${selectedId}`,
          newData
        );
        setNewData({ ...newData, Title: "", Description: "", Subject: "" });
        console.log(data.data);
        setSchedules(data.data);
        setEdit(false);
        setLocalEdit(false);
      } catch (error) {
        console.log(error);
      }
    }

    if (save) addSchedules();
    if (edit) editSchedules();
  }, [save, localEdit]);

  function generateTimeOptions() {
    const timeOptions: string[] = [];
    const hours: string[] = [
      "12",
      "01",
      "02",
      "03",
      "04",
      "05",
      "06",
      "07",
      "08",
      "09",
      "10",
      "11",
    ];
    const period: string[] = ["AM", "PM"];

    for (const h of hours) {
      for (const p of period) {
        timeOptions.push(h + ":00 " + p);
        timeOptions.push(h + ":30 " + p);
      }
    }

    return timeOptions;
  }

  const timeOptions = generateTimeOptions();
  const frequencyOptions = ["Daily", "weekly", "monthly"];

  const handleWeekdays = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLDivElement;
    console.log(target.id);
    setWeekdays((prevWeekday) => {
      return {
        ...prevWeekday,
        [target.id]: !prevWeekday[target.id],
      };
    });
  };

  return (
    <div className="SchedulerModal">
      <p className="Heading">{edit ? "Edit Schedule" : "Add Schedule"}</p>

      <div className="ContainerAll">
        <p className="Title">Title</p>
        <input
          required
          type="text"
          name="Title"
          value={newData.Title}
          onChange={handleInputChange}
        />
      </div>

      <div className="DescriptionContainer">
        <p className="Title">Description</p>
        <textarea
          required
          name="Description"
          value={newData.Description}
          onChange={handleInputChange}
        ></textarea>
      </div>

      <div className="ContainerAll">
        <p className="Title">Subject</p>
        <input
          required
          type="text"
          name="Subject"
          value={newData.Subject}
          onChange={handleInputChange}
        />
      </div>

      <div className="ContainerAll">
        <p className="Title">Frequency</p>
        <select
          id="frequencyDropdown"
          name="Frequency"
          value={newData.Frequency}
          onChange={handleInputChange}
        >
          {frequencyOptions.map((frequencyChoice, index) => (
            <option key={index} value={frequencyChoice}>
              {frequencyChoice}
            </option>
          ))}
        </select>
      </div>

      {frequency === "weekly" ? (
        <div className="ContainerAll">
          <p className="Title">Repeat</p>
          <div className="Weekdays" onClick={handleWeekdays}>
            <div id="Sunday" className={weekdays.Sunday ? "highlight" : ""}>
              S
            </div>
            <div id="Monday" className={weekdays.Monday ? "highlight" : ""}>
              M
            </div>
            <div id="Tuesday" className={weekdays.Tuesday ? "highlight" : ""}>
              T
            </div>
            <div
              id="Wednesday"
              className={weekdays.Wednesday ? "highlight" : ""}
            >
              W
            </div>
            <div id="Thursday" className={weekdays.Thursday ? "highlight" : ""}>
              T
            </div>
            <div id="Friday" className={weekdays.Friday ? "highlight" : ""}>
              F
            </div>
            <div id="Saturday" className={weekdays.Saturday ? "highlight" : ""}>
              S
            </div>
          </div>
        </div>
      ) : frequency === "monthly" ? (
        <div className="ContainerAll">
          <p className="Title">Repeat</p>
          <select>
            <option>first monday</option>
            <option>last friday</option>
          </select>
        </div>
      ) : (
        ""
      )}
      <div className="ContainerAll">
        <p className="Title">Time</p>
        <select
          id="timeDropdown"
          name="Time"
          value={newData.Time}
          onChange={handleInputChange}
        >
          {timeOptions.map((time, index) => (
            <option key={index} value={time}>
              {time}
            </option>
          ))}
        </select>
      </div>
      <div className="actions">
        <button type="button" className="cancel" onClick={handleCancel}>
          Cancel
        </button>
        <button type="button" className="done" onClick={handleSaveEdit}>
          Done
        </button>
      </div>
    </div>
  );
};

export default SchedulerModal;
