import "./App.css";
import Register from "./components/register";
import Login from "./components/login";
import Location from "./components/location";
import Theater from "./components/theater";
import Showtime from "./components/showtime";
import AddShowtime from "./components/add_showtime";
import Movie from "./components/movies";
import AddMovie from "./components/add_movies";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MovieList from "./components/view_movies";
import AdminDashboard from "./components/admin_dash";
import LocationList from "./components/view_locations";
import AddLocation from "./components/add_location";
import UserDashboard from "./components/user_dash";
import MovieDetails from "./components/movie_details";
import TheatersInLoc from "./components/theaters_InLoc";
import ShowtimeList from "./components/view_showtime";
import AddTheater from "./components/add_theater";
import TheaterList from "./components/view_theater";
import Navbar from "./components/navbar";
import SeatArrangement from "./components/seatpicker";
import Reservation from "./components/reservation";
import ShowTimeCard from "./components/showtime_card";
import ShowTimesTheater from "./components/showTimesForTheater";
import AddCoupon from "./components/add_coupon";
import CouponList from "./components/view_coupon";
import Coupon from "./components/coupon";
import EditMovie from "./components/editMovie";
import EditLocation from "./components/edit_location";
import EditTheater from "./components/editTheater";
import EditShowtime from "./components/editShowTime";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/admin/location" element={<Location />} />
          <Route path="/admin/theater" element={<Theater />} />
          <Route path="/admin/AddTheater" element={<AddTheater />} />
          <Route path="/admin/TheaterList" element={<TheaterList />} />
          <Route path="/admin/showtime" element={<Showtime />} />
          <Route path="/admin/AddShowtime" element={<AddShowtime />} />
          <Route path="/admin/ShowtimeList" element={<ShowtimeList />} />
          <Route path="/admin/movies" element={<Movie />} />
          <Route path="/admin/AddMovie" element={<AddMovie />} />
          <Route path="/admin/MovieList" element={<MovieList />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/addLocation" element={<AddLocation />} />
          <Route path="/admin/viewLocations" element={<LocationList />} />
          <Route path="/user" element={<UserDashboard />} />
          <Route
            path="/user/movieDetails/:movieId"
            element={<MovieDetails />}
          />
          <Route path="/editMovie/:movieId" element={<EditMovie />} />
          <Route path="/edit-location/:locationId" element={<EditLocation />} />
          <Route path="/edit-theater/:theaterId" element={<EditTheater />} />
          <Route path="/edit-showtime/:showId" element={<EditShowtime />} />

          <Route path="/admin/viewTheaters" element={<TheaterList />} />
          <Route path="/admin/AddTheater" element={<AddTheater />} />
          <Route
            path="/user/theaters/:loc/:movieId"
            element={<TheatersInLoc />}
          />
          <Route path="/seats/:showtime_id/:available_seats" element={<SeatArrangement />} />
          <Route
            path="/reservation/:reservation_id"
            element={<Reservation />}
          />
          <Route
            path="/user/showtimetheater/:loc/:movieId/:theaterId/:theaterName"
            element={<ShowTimesTheater />}
          />

          <Route path="/admin/coupon" element={<Coupon />} />
          <Route path="/admin/addCoupon" element={<AddCoupon />} />
          <Route path="/admin/viewCoupon" element={<CouponList />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
