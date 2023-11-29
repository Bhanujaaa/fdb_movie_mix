import React, { useState, useEffect } from "react";
import Axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "../Styling/seating.css";
import secureLocalStorage from "react-secure-storage";
import Modal from 'react-modal';

const SeatsBooking = () => {
  const { showtime_id, available_seats } = useParams();
  const [seatData, setSeatData] = useState([]);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [updatedSeatData, setUpdated] = useState([]);
  const navigate = useNavigate();
  const url = "http://localhost:8080/seat/get";
  const updateUrl = "http://localhost:8080/seat/update";
  const couponUrl = "http://localhost:8080/coupon/get"
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedCoupon, setSelectedCoupon] = useState(null);
  const user_id = secureLocalStorage.getItem("user_id")
  const [couponData, setCoupons] = useState([]);
  const [couponDiscount, setDiscount] = useState(0);
  const [total_price, setTotalPrice] = useState(0)
  const [coupon_id, setCouponId] = useState([])
  const handleSelectionChange = (couponId, coupon_discount) => {
    setSelectedCoupon(couponId);
    setDiscount((prevCouponDiscount) => {
      return coupon_discount;
    });
    setCouponId(couponId)
  };


  const closeModal = () => {
    setModalIsOpen(false);
  };
  const Navigation = (updatedPrice) => {
    const current_date = new Date();
    const booking_date = current_date.getDate();
    const confirmationMessage = `For booking of the seats: ${selectedSeats
      .map((seat) => seat.seat_name)
      .join(", ")} The toal price is ${updatedPrice} `;
    if (window.confirm(confirmationMessage)) {
      Axios.post(updateUrl, { showtime_id, selectedSeats })
        .then((response) => {
          const totalseats = available_seats - selectedSeats.length
          Axios.post("http://localhost:8080/showtime/seats/update", { showtime_id, totalseats })
            .then((response) => {
            })
            .catch((error) => {
              console.error("Error updating seats:", error);
            });
          const encodedObject = encodeURIComponent(
            JSON.stringify(selectedSeats)
          );
          const count = selectedSeats.length
          const total_amount = updatedPrice;
          const num_tickets = count;
          const decodedObject = selectedSeats
          Axios.get(`http://localhost:8080/coupon/set/${user_id}/${coupon_id}`)
            .then((response) => {
            })
            .catch((err) => console.log(err));
          Axios.post(
            `http://localhost:8080/ticket/reserve`, { booking_date, total_amount, num_tickets, user_id, showtime_id, decodedObject })
            .then((response) => {
              console.log(response.data[0])
              const reservation_id = response.data[0].reservation_id
              navigate(`/reservation/${reservation_id}`)
            })

          // Handle success, e.g., navigate to the booking page
          alert('Booking successful! Redirecting to booking page...');
        })
        .catch((error) => {
          console.error("Error updating seats:", error);
        });

    } else {
      // If the user clicks "Cancel" in the confirmation dialog,
      // you can handle it here, for example, showing a message.
      alert("Booking canceled.");
    }
  }
  const couponUseModal = () => {
    setModalIsOpen(false);
    const DiscountedPrice = (total_price - (total_price * couponDiscount / 100))
    Navigation(DiscountedPrice)


  }


  useEffect(() => {
    loadData();
    Axios.get(`http://localhost:8080/coupon/get/user/${user_id}`)
      .then((response) => {
        setCoupons(response.data);
        console.log(response.data)
      })
      .catch((err) => console.log(err));
  }, []);

  const loadData = () => {
    Axios.get(`${url}/${showtime_id}`)
      .then((response) => {
        setSeatData(response.data);
        setUpdated(response.data.filter((seat) => seat.is_selected == 0));
      })
      .catch((error) => {
        console.error("Error fetching seat data:", error);
      });
  };

  const Seat = ({ seatData, onSelectSeat }) => {
    const { seat_id, seat_name, is_selected } = seatData;
    const isSelected = selectedSeats.includes(seat_id); // Check if this seat_id is in the selectedSeats array
    const handleClick = () => {
      onSelectSeat(seatData);
      //   onSelectSeat(seat_id);
    };

    const seatStatusClass = is_selected ? "selected" : "reserved"; // Assuming is_selected=true means reserved, modify this based on your backend logic
    return (
      <div
        className={`seat ${isSelected ? "selected" : ""}`}
        onClick={handleClick}
      >
        {seat_name}
      </div>
    );
  };

  const SeatLayout = ({ seats, onSeatSelect }) => {
    const availableSeats = seats.filter((seat) => !seat.is_selected);

    return (<>
      <div className="seat-layout">
        {availableSeats.map((seat, index) => (
          <Seat
            key={index}
            className={`seat`}
            seatData={seat}
            onSelectSeat={onSeatSelect}
          />
        ))}
      </div>
      <div>

        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          ariaHideApp={false}
          contentLabel="Coupon Selection Modal"
          style={{
            content: {
              width: '75%', // Adjust the width as needed
              height: '50%',
              margin: 'auto', // Center the modal horizontally
            },
          }}
        >
          <h2>Choose a Coupon:</h2>
          {couponData.map((coupon) => (
            <div key={coupon.coupon_id}>
              <input
                type="radio"
                id={coupon.coupon_id}
                name="coupon"
                value={coupon.coupon_id}
                checked={selectedCoupon === coupon.coupon_id}
                onChange={() => handleSelectionChange(coupon.coupon_id, coupon.coupon_discount)}
              />
              <label htmlFor={coupon.coupon_id}>
                {coupon.coupon_name} - {coupon.coupon_discount}% Discount
              </label>
            </div>
          ))}

          {selectedCoupon && (
            <p>
              Selected Coupon: {couponData.find((coupon) => coupon.coupon_id === selectedCoupon).coupon_name} -{' '}
              {couponData.find((coupon) => coupon.coupon_id === selectedCoupon).coupon_discount}% Discount
            </p>
          )}
          <button onClick={couponUseModal}>Book Now</button>
        </Modal>
      </div>
    </>
    );
  };
  const handleSeatSelect = (selectedSeat) => {
    const updatedSeatDatanew = updatedSeatData.map((seat) =>
      seat.seat_id === selectedSeat.seat_id
        ? { ...seat, is_selected: !seat.is_selected }
        : seat
    );

    setUpdated(updatedSeatDatanew);
    // Update the selected seats array
    const newSelectedSeats = updatedSeatDatanew.filter(
      (seat) => seat.is_selected
    );
    setSelectedSeats(newSelectedSeats);
  };
  const handleProceedToBooking = () => {
    if (selectedSeats.length > 0) {
      // Make API call to update the backend with selected seats
      Axios.post(`http://localhost:8080/ticket/get`, {
        showtime_id,
        selectedSeats,
      }).then((response) => {
        setTotalPrice(response.data[0].total_price);
        if (total_price == null) {
          setTotalPrice(0);
        }
        const user_id = secureLocalStorage.getItem("user_id");
        Axios.get(`${couponUrl}/user/${user_id}`)
          .then((response1) => {
            if (response1.data.length > 0) {
              const msg = 'You have coupons do you want to use it?'
              if (window.confirm(msg)) {
                setModalIsOpen(true);
                return
              }
            }
            Navigation(response.data[0].total_price)
          })
          .catch((error) => {
            console.error("Error fetching seat data:", error);
          });
      });
    } else {
      alert("Please select at least one seat.");
    }
  };

  return (
    <div className="seatpicker">
      <h2>Seat Reservation</h2>
      <SeatLayout seats={seatData} onSeatSelect={handleSeatSelect} />
      <div>
        <h3>Selected Seats</h3>
        {selectedSeats.length > 0 ? (
          <ul>
            {selectedSeats.map((seat) => (
              <li key={seat.seat_id} className="">
                {seat.seat_name}
              </li>
            ))}
          </ul>
        ) : (
          <p>No seats selected</p>
        )}
      </div>
      <button
        onClick={handleProceedToBooking}
        disabled={selectedSeats.length === 0}
      >
        Proceed to Booking
      </button>
    </div>
  );
};

export default SeatsBooking;
