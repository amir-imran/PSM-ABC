import mongoose from "mongoose"

const UserSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
    },
    password: {
      type: String,
      unique: true,
    },
    isAdmin: {
      type: Boolean,
      default: false.valueOf,
      required: true,
    },
  },
  {
    timestamps: true,
  }
)

const User = mongoose.models.User || mongoose.model("User", UserSchema)
export default User
