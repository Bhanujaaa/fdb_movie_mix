import React, { useEffect, useState } from "react";
import Axios from "axios";
import secureLocalStorage from "react-secure-storage";
import { useNavigate } from "react-router-dom";
import "../Styling/AddTheater.css"; // Import your CSS file

const AddTheater = () => {
  const [locations, setLocations] = useState([]);
  const [theater_name, setTheaterName] = useState("");
  const [description, setDescription] = useState("");
  const [theater_url, setTheaterUrl] = useState("");
  const [location_id, setLocationId] = useState(0);
  const [LocationList, setLocationList] = useState([
    { location_id: "", city: "" },
  ]);
  const url = "http://localhost:8080/theater";
  const loc_url = "http://localhost:8080/location";
  const navigate = useNavigate();

  useEffect(() => {
    Axios.get(`${loc_url}/get`).then((response) => {
      setLocationList(response.data);
    });
  }, []);

  const TheaterSubmit = (e) => {
    e.preventDefault();
    const theater = {
      theater_name: theater_name,
      description: description,
      theater_url: theater_url,
      admin_id: secureLocalStorage.getItem("admin_id"),
      location_id: location_id,
    };
    console.log("request body is here", theater);
    Axios.post(`${url}/create`, theater).then((response) => {});
  };

  return (
    <div className="add-theater-container">
      <form onSubmit={TheaterSubmit} className="theater-form">
        <h2 className="form-title mb-4">Add Theater</h2>
        <div className="">
          <label htmlFor="theater_name" className="form-label">
            Theater Name
          </label>
          <input
            type="text"
            className="form-control"
            onChange={(e) => setTheaterName(e.target.value)}
            placeholder="Enter Name of the Theater"
            id="theater_name"
            name="theater_name"
          />
        </div>
        <div className="">
          <label htmlFor="description" className="form-label">
            Describe the theater
          </label>
          <input
            type="text"
            className="form-control"
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter the Description"
            id="description"
            name="description"
          />
        </div>
        <div className="">
          <label htmlFor="theater_url" className="form-label">
            Theater Picture
          </label>
          <input
            type="text"
            className="form-control"
            onChange={(e) => setTheaterUrl(e.target.value)}
            placeholder="Give the link of theater picture"
            id="theater_url"
            name="theater_url"
          />
        </div>
        <div className="">
          <label htmlFor="location_id" className="form-label">
            Location
          </label>
          <select
            className="form-control"
            value={location_id}
            onChange={(e) => {
              setLocationId(e.target.value);
            }}
          >
            <option value="">Choose Location</option>

            {LocationList.map((Location) => (
              <option value={Location.location_id} key={Location.location_id}>
                {Location.city}
              </option>
            ))}
          </select>
        </div>
        <div className="text-center">
          <button type="submit" className="submit-btn">
            Add Theater
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddTheater;
