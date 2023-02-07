// // const bcrypt = require("bcrypt");
// const bcryptjs = require("bcryptjs");
// const jwt = require("jsonwebtoken");

// const { UserModel } = require("../db/userModel");

// const { NotAuthorisedError } = require("../helpers/errors");

// const registration = async (userName, password) => {
//   // const { name, password } = req.body;
//   const user = new UserModel({
//     userName,
//     password,
//   });
//   await user.save();
// };

// const login = async (userName, password) => {
//   const user = await UserModel.findOne({ userName });
//   if (!user) {
//     throw new NotAuthorisedError(`No user named ${userName} found`);
//   }

//   if (!(await bcryptjs.compare(password, user.password))) {
//     throw new NotAuthorisedError("Wrong password");
//   }

//   const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);
//   const id = user._id;
//   return { token, userName, id };
// };

// // const logout = async () => {
// //   const user = await UserModel.findByIdAndUpdate(id, { token: null });
// //   const id = user._id;
// //   if (!user) {
// //     throw new NotAuthorisedError(`No user found`);
// //   }

// //   return { token };
// // };
// module.exports = {
//   registration,
//   login,
// };
