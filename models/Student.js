import mongoose from "mongoose"

const StudentSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    icNumber: {
      type: Number,
      unique: true,
    },
    email: {
      type: String,
      required: true,
    },
    dob: {
      type: Date,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    grade: {
      type: String,
      required: true,
    },
    paymentdue: {
      type: Number,
      required: true,
      default: 0,
    },
    numberOfClasses: {
      type: Number,
      required: true,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
)

const Student =
  mongoose.models.Student || mongoose.model("Student", StudentSchema)
export default Student
