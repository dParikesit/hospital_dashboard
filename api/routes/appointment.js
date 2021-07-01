require("dotenv").config();
const router = require("express").Router();
const authChecker = require("../middleware/auth-checker");
const adminChecker = require("../middleware/admin-checker");

const Appointment = require("../models/appointment");

router.post("/appointment", authChecker, adminChecker, (req, res) => {
  let newPost = new Appointment({
    doctor: req.body.doctor,
    description: req.body.description,
    registrant: req.body.registrant,
  });

  newPost
    .save()
    .then((result) => {
      res.status(200).json({
        message: "success",
        result: result,
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: "error",
        error: err,
      });
    });
});

router.get("/appointment", authChecker, (req, res) => {
  Appointment.find().then((result) => {
    if (result.length < 1) {
      res.status(404).json({
        message: "No appointments found",
        result: [],
      });
    } else {
      res.status(200).json({
        message: "success",
        result: result,
      });
    }
  });
});

router.put("/appointment", authChecker, adminChecker, (req, res) => {
  let updated = {
    doctor: req.body.doctor,
    description: req.body.description,
    registrant: req.body.registrant,
  };
  Appointment.findOneAndUpdate({ _id: req.body.id }, updated)
    .then((result) => {
      res.status(200).json({
        message: "success",
        result: result,
      });
    })
    .catch((err) => {
      res.status(404).json({
        message: "error, appointment not found",
        error: err,
      });
    });
});

router.put("/appointment/:name", authChecker, (req, res) => {
  Appointment.findOne({ _id: req.body.id })
    .then((result) => {
      let { doctor, description, registrant } = result;
      registrant = [...registrant, req.params.name];
      Appointment.updateOne(
        { _id: req.body.id },
        { doctor, description, registrant }
      )
        .then(() => {
          res.status(200).json({
            message: "success",
          });
        })
        .catch(() => {
          res.status(500).json({
            message: "apply error",
          });
        });
    })
    .catch(() => {
      res.status(404).json({
        message: "appointment not found",
      });
    });
});

router.delete("/appointment/:name", authChecker, (req, res) => {
  Appointment.findOne({ _id: req.body.id })
    .then((result) => {
      let { doctor, description, registrant } = result;
      const index = registrant.indexOf(req.params.name);
      registrant.splice(index, 1);
      Appointment.updateOne(
        { _id: req.body.id },
        { doctor, description, registrant }
      )
        .then(() => {
          res.status(200).json({
            message: "success",
          });
        })
        .catch(() => {
          res.status(500).json({
            message: "apply error",
          });
        });
    })
    .catch(() => {
      res.status(404).json({
        message: "appointment not found",
      });
    });
});

router.delete("/appointment", authChecker, adminChecker, (req, res) => {
  Appointment.deleteOne({ _id: req.body.id })
    .then((result) => {
      res.status(200).json({
        message: "Delete successful",
        result: result,
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: "Delete error",
        error: err,
      });
    });
});
module.exports = router;
