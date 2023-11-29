const express = require("express");
const connection = require("../config/database");
const router = express.Router();
router.post("/get", (req, res, next) => {
    const showtime_id=req.body.showtime_id;
   const seatID=req.body.selectedSeats;
   const seatIds = seatID.map(seat => seat.seat_id);
    const seatIdsTuple = `(${seatIds.join(', ')})`;
  var query = `select sum(ticket_price) as total_price from tickets where showtime_id=${showtime_id} and seat_id in ${seatIdsTuple}`;
  connection.query(query,[showtime_id], (err, results) => {
    if (!err) {
      return res.status(200).json(results);
    } else {
      return res.status(500).json(err);
    }
  });
});
router.post("/getTicket", (req, res, next) => {
  const showtime_id=req.body.showtime_id;
 const seatID=req.body.decodedObject;
 const seatIds = seatID.map(seat => seat.seat_id);
  const seatIdsTuple = `(${seatIds.join(', ')})`;
var query = `select ticket_id from tickets where showtime_id=${showtime_id} and seat_id in ${seatIdsTuple}`;
connection.query(query,[showtime_id], (err, results) => {
  if (!err) {
    return res.status(200).json(results);
  } else {
    return res.status(500).json(err);
  }
});
});


router.post('/reserve', (req, res, next) => {
  const booking_date = new Date();
  const num_tickets = req.body.num_tickets;
  const user_id = req.body.user_id;
  const showtime_id = req.body.showtime_id;
  const total_amount = req.body.total_amount;
  const decodedObject = req.body.decodedObject;
  const seatIds = decodedObject.map(seat => seat.seat_id);
  const seatIdsTuple = `(${seatIds.join(', ')})`;

  const query = `SELECT ticket_id FROM tickets WHERE showtime_id=${showtime_id} AND seat_id IN ${seatIdsTuple}`;
  
  connection.query(query, [showtime_id], (err, results) => {
      if (err) {
          console.error(err);
          return res.status(500).json(err);
      }

      const ticketIds = results.map(ticket=>ticket.ticket_id);
      const ticketIdsTuple = `(${ticketIds.join(', ')})`;

      const querynew = `INSERT INTO reservations(booking_date, total_amount, num_tickets, user_id, showtime_id) VALUES (?, ?, ?, ?, ?)`;
      const values = [booking_date, total_amount, num_tickets, user_id, showtime_id];

      connection.query(querynew, values, (err, results) => {
          if (err) {
              console.error(err);
              return res.status(500).json(err);
          }

          const reservation_id = results.insertId;
          if(ticketIds.length>0){
          const queryfinal=`update tickets set reservation_id=${reservation_id} where ticket_id in ${ticketIdsTuple}`
          connection.query(queryfinal, values, (err, results) => {
            if (err) {
                console.error(err);
                return res.status(500).json(err);
            }
            const queryshow= `select * from reservations r join show_time s on s.show_time_id=r.showtime_id join theater t on t.theater_id=s.theater_id 
            join movies m on m.movie_id=s.movie_id join location l on l.location_id=t.location_id where r.reservation_id=${reservation_id}`
            connection.query(queryshow, values, (err, results) => {
              if (err) {
                  console.error(err);
                  return res.status(500).json(err);
              }
          return res.status(200).json(results);
            });
          
          });}
      });
  });
});

router.get("/show/:reservation_id", (req, res, next) => {
  reservation_id=req.params.reservation_id;
  const queryshow= `select * from reservations r join show_time s on s.show_time_id=r.showtime_id join theater t on t.theater_id=s.theater_id 
  join movies m on m.movie_id=s.movie_id join location l on l.location_id=t.location_id where r.reservation_id=${reservation_id}`
connection.query(queryshow,[], (err, results) => {
  if (!err) {
    return res.status(200).json(results);
  } else {
    return res.status(500).json(err);
  }
});
});
  
module.exports=router;