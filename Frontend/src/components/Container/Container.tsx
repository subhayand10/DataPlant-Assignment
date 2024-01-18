import { useState, useEffect, useContext } from "react";
import "./Container.css";
import axios from "axios";
import editImage from "../../assets/edit.png";
import deleteImage from "../../assets/delete.png";
import Context from "../../Context/Context";

const Container: React.FC = () => {
  const {
    setEdit,
    setOpenModal,
    schedules,
    setSchedules,
    setSelectedId,
    selectedId,
  } = useContext(Context);

  const [remove, setRemove] = useState<boolean>(false);

  useEffect(() => {
    async function getSchedules() {
      try {
        const data = await axios.get(`http://localhost:8082/schedules`);
        console.log(data);
        setSchedules(data.data);
      } catch (error) {
        console.log(error);
      }
    }

    getSchedules();
    console.log(schedules);
  }, []);

  useEffect(() => {
    async function deleteSchedules() {
      try {
        const data = await axios.delete(
          `http://localhost:8082/schedules/${selectedId}`
        );
        setRemove(false);
        setSchedules(data.data);
      } catch (error) {
        console.log(error);
      }
    }

    if (remove) deleteSchedules();
  }, [remove]);

  const handleEdit = (e:any) => {
    console.log(e.target.name);
    setSelectedId(e.target.name);
    setOpenModal(true);
    setEdit(true);
  };

  const handleDelete = (e:any) => {
    console.log(e.target.name);
    setSelectedId(e.target.name);
    setRemove(true);
  };

  return (
    <table>
      <thead>
        <tr>
          <th>Title</th>
          <th>Description</th>
          <th>Subject</th>
          <th>Schedule</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {schedules.map((schedule) => {
          return (
            <tr key={schedule.id}>
              <td>{schedule.Title}</td>
              <td>{schedule.Description}</td>
              <td>{schedule.Subject}</td>
              <td>{`${schedule.Frequency} at ${schedule.Time}`}</td>
              <td>
                <button onClick={handleEdit}>
                  <img
                    src={editImage}
                    name={schedule.id}
                    alt="edit"
                    style={{ marginRight: "16px" }}
                  />
                </button>
                <button onClick={handleDelete}>
                  <img src={deleteImage} name={schedule.id} alt="delete" />
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default Container;