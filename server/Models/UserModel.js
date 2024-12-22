import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
  fristname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  }

});

const UserModel = mongoose.model("userinfomation", UserSchema);
export default UserModel;
