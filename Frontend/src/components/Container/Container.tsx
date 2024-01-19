import { useState, useEffect, useContext } from "react";
import "./Container.css";
import axios from "axios";
import editImage from "../../assets/edit.png";
import deleteImage from "../../assets/delete.png";
import Context from "../../Context/Context";
import backend_endpoint from "../../../config"
import CircularProgress from "@mui/material/CircularProgress";

interface CustomImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  name?: string;
}

const CustomImage: React.FC<CustomImageProps> = ({ name, ...rest }) => (
  <img {...rest} alt={rest.alt}  name={name} />
);

const Container: React.FC = () => {
  const {
    setEdit,
    setOpenModal,
    schedules,
    setSchedules,
    setSelectedId,
    selectedId,
  } = useContext(Context)!;

  const [remove, setRemove] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function getSchedules() {
      try {
        setLoading(true);
        const data = await axios.get(`${backend_endpoint}/schedules`);
        console.log(data);
        setSchedules(data.data);
        setLoading(false)
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
          `${backend_endpoint}/schedules/${selectedId}`
        );
        setRemove(false);
        setSchedules(data.data);
      } catch (error) {
        console.log(error);
      }
    }

    if (remove) deleteSchedules();
  }, [remove]);

  const handleEdit = (e: React.MouseEvent<HTMLButtonElement>) => {
    const target = e.target as HTMLImageElement;
    const name = target.getAttribute("name") ?? "";
    console.log(name);
    setSelectedId(name);
    setOpenModal(true);
    setEdit(true);
  };

  const handleDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
    const target = e.target as HTMLImageElement;
    const name = target.getAttribute("name") ?? "";
    console.log(name);
    setSelectedId(name);
    setRemove(true);
  };

  return (
    <>
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
                  <CustomImage
                    src={editImage}
                    name={schedule.id}
                    alt="edit"
                    style={{ marginRight: "16px" }}
                  />
                </button>
                <button onClick={handleDelete}>
                  <CustomImage
                    src={deleteImage}
                    name={schedule.id}
                    alt="delete"
                  />
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
    {loading ? (
        <div className="Loading">
          <p>Backend Spinning Up! Approx 15-20s to load.</p>
          <CircularProgress color="secondary" />
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default Container;