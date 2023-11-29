const express = require("express");
const connection = require("../config/database");
const router = express.Router();
router.get("/get", (req, res, next) => {
  const query = "select * from show_time ";

  connection.query(query, (err, results) => {
    if (!err) {
      if (results.length > 0) {
        const parking = results;
        res.status(200).json(parking);
      } else {
        res.status(404).json({ message: "Parking Area not found" });
      }
    } else {
      res.status(500).json(err);
    }
  });
});

module.exports = router;
