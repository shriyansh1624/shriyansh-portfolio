const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 50
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true
    },
    phone: {
      type: String,
      trim: true,
      maxlength: 15
    },
    subject: {
      type: String,
      trim: true,
      maxlength: 100,
      default: "Portfolio Contact"
    },
    message: {
      type: String,
      required: true,
      trim: true,
      minlength: 10,
      maxlength: 1000
    },
    status: {
      type: String,
      enum: ["new", "read", "replied"],
      default: "new"
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Contact", contactSchema);