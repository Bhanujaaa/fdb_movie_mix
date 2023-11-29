import React, { useState, useEffect } from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";

const ShowtimeList = () => {
  const [showtimes, setShowtime] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    Axios.get(`http://localhost:8080/st/get`).then((response) => {
      setShowtime(response.data);
      // console.log(response)
    });
  }, []);

  const handleEdit = (showId) => {
    navigate(`/edit-showtime/${showId}`);
  };

  const handleDelete = (showId) => {
    if (window.confirm("Are you sure you want to delete this theater?")) {
      Axios.delete(`http://localhost:8080/showtime/delete/${showId}`)
        .then(() => {
          setShowtime((prevShowTimes) =>
            prevShowTimes.filter((show) => show.show_time_id !== showId)
          );
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <div className="">
      <p></p>
      <p></p>
      <h2>ShowTimes</h2>
      <div className="row">
        {showtimes.map((showtime) => (
          <div key={showtime.show_time_id} className="col-md-4 mb-4">
            <div className="" style={{ height: "200px", width: "300px" }}>
              <div className="show-card">
                <div className="card-body">
                  <h5 className="card-subtitle" style={{ fontSize: "1.2rem" }}>
                    {showtime.title}
                  </h5>
                  <h5 className="card-title">{showtime.show_name}</h5>
                  <h6 className="card-subtitle mb-2 text-muted">
                    START AT: {showtime.start_time}
                  </h6>
                  <h6 className="card-subtitle mb-2 text-muted">
                    END AT: {showtime.end_time}
                  </h6>
                  <h6 className="card-subtitle mb-2 text-muted">
                    Total seats: {showtime.available_seats}
                  </h6>
                </div>
                <div className="buttons">
                  <button
                    style={{ background: "none" }}
                    onClick={() => handleEdit(showtime.show_time_id)}
                  >
                    <img
                      style={{ width: "25px" }}
                      src="https://www.svgrepo.com/show/503019/edit.svg"
                      alt=""
                    />
                  </button>
                  <button
                    style={{ background: "none" }}
                    onClick={() => handleDelete(showtime.show_time_id)}
                  >
                    <img
                      style={{ width: "25px" }}
                      src="https://www.svgrepo.com/show/490950/delete.svg"
                      alt=""
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShowtimeList;
