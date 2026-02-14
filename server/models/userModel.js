import mongoose from "mongoose"

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, "Please use a valid email"],
    },

    password: {
      type: String,
      required: true,
      minlength: 6,
    },

    
    cartData: {
      type: Object,
      default: {},
    },
  },
  {
    minimize: false, 
    timestamps: true,
  }
)



const userModel =
  mongoose.models.User || mongoose.model("User", userSchema)

export default userModel
