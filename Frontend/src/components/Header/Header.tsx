import { useState, useContext, useEffect } from "react";
import "./Header.css";
import Container from "../Container/Container";
import addImage from "../../assets/add.png";
import searchImage from "../../assets/search.png";
import Context from "../../Context/Context";
import axios from "axios";

const Header: React.FC = () => {
  const {setOpenModal, setSchedules } =
    useContext(Context) ;

  const [searchText, setSearchText] = useState<string>("");
  const URL: string = `http://localhost:8082/schedules?search=${searchText}`;

  const handleAdd = (): void => {
    setOpenModal(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchText(e.target.value);
  };

  useEffect(() => {
    async function getSchedules() {
      try {
        const data = await axios.get(URL);
        console.log(data.data);
        setSchedules(data.data);
      } catch (error) {
        console.log(error);
      }
    }
    getSchedules();
  }, [searchText]);

  return (
    <div className="Header">
      <div className="Tab"></div>
      <div className="Filter">
        <div className="SearchBox">
          <input
            type="text"
            className="SearchInput"
            placeholder="Search title"
            value={searchText}
            onChange={handleChange}
          />
          <button type="button">
            <img src={searchImage} alt="search" />
          </button>
        </div>
        <button className="Add" onClick={handleAdd}>
          <img src={addImage} alt="add" />
          Add
        </button>
      </div>
      <div className="TableContainer">
        <Container />
      </div>
    </div>
  );
};

export default Header;