import { useState, useContext, useEffect } from "react";
import "./SchedulerModal.css";
import Context from "../../Context/Context";
import axios from "axios";


const SchedulerModal: React.FC = () => {
  const { edit, setEdit, setOpenModal, setSchedules, selectedId } =
    useContext(Context);

  const [newData, setNewData] = useState({
    Title: "",
    Description: "",
    Subject: "",
    Frequency: "weekly",
    Time: "10:00 AM",
  });

  const [weekdays, setWeekdays] = useState({
    Sunday: false,
    Monday: false,
    Tuesday: false,
    Wednesday: false,
    Thursday: false,
    Friday: false,
    Saturday: false,
  });

  const [save, setSave] = useState(false);
  const [frequency, setFrequency] = useState("weekly");
  const [localEdit, setLocalEdit] = useState(false);

  const handleCancel = () => {
    setOpenModal(false);
    setEdit(false);
    setSave(false);
    setWeekdays({});
    setNewData({ ...newData, Title: "", Description: "", Subject: "" });
  };

  const handleSaveEdit = () => {
    if (!edit) setSave(true);
    else setLocalEdit(true);
    setOpenModal(false);
    //setNewData({ ...newData, Title: "", Description: "", Subject: "" });
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
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
        const data = await axios.post(
          `http://localhost:8082/schedules`,
          newData
        );
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
          `http://localhost:8082/schedules/${selectedId}`,
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
    const timeOptions = [];
    const hours = [
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
    const period = ["AM", "PM"];

    for (let h of hours) {
      for (let p of period) {
        timeOptions.push(h + ":00 " + p);
        timeOptions.push(h + ":30 " + p);
      }
    }

    return timeOptions;
  }

  const timeOptions = generateTimeOptions();
  const frequencyOptions = ["Daily", "weekly", "monthly"];

  const handleWeekdays = (e: React.MouseEvent<HTMLDivElement>) => {
    console.log(e.target.id);
    setWeekdays((prevWeekday) => {
      return {
        ...prevWeekday,
        [e.target.id]: !prevWeekday[e.target.id],
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
          type="text"
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
