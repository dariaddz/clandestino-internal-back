const mongoose = require("mongoose");
// const bcrypt = require("bcrypt");
const bcryptjs = require("bcryptjs");

const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    unique: true,
  },
  admin: { type: Boolean, required: true, default: false },
  token: {
    type: String,
    default: null,
  },
});

userSchema.pre("save", async function () {
  if (this.isNew) {
    // this.password = await bcrypt.hash(this.password, 10);
    this.password = await bcryptjs.hash(this.password, 10);
  }
});

const UserModel = mongoose.model("UserModel", userSchema);

module.exports = {
  UserModel,
};
