const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
  doctor: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  registrant: {
    type: Array,
    required: true,
  },
});

module.exports = mongoose.model("appointment", appointmentSchema);
