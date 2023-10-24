"use strict";
const User = require("../models/user.model.js");

var userCtrl = function () {};

userCtrl.login = async (req, res, next) => {
  try {
    let data = req.body;
    console.log("data:", data);
    var user = await User.findOne(req.body);
    if (user) {
      var apiRes = { status: true, message: "You are successfully logged in" };
    } else {
      var apiRes = { status: false, message: "Username or Password incorrect" };
    }
    console.log(user);
  } catch (error) {
    return res
      .status(500)
      .send({ status: false, message: "Something went worng" });
  }
  return res.status(200).send(apiRes);
};

userCtrl.addUser = async (req, res, next) => {
  let data = req.body;
  console.log("data:", data);

  try {
    const { username } = req.body;
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res
        .status(200)
        .send({ status: false, message: "Username already exists" });
    }

    var user = await User.create(data);
    if (user) {
      var apiRes = { status: true, message: "User added successfully" };
    } else {
      var apiRes = { status: false, message: "Something went worng" };
    }
  } catch (error) {
    return res
      .status(500)
      .send({ status: false, message: "Something went worng" });
  }
  return res.status(200).send(apiRes);
};

userCtrl.getUser = async (req, res, next) => {
  try {
    var user = await User.find();
  } catch (error) {
    return res.status(500).send(error);
  }
  return res.status(200).send(user);
};

userCtrl.getUserById = async (req, res, next) => {
  try {
    const { _id } = req.query;
    console.log(_id);
    var user = await User.findById(_id);
  } catch (error) {
    return res.status(500).send(error);
  }
  return res.status(200).send(user);
};

userCtrl.editUser = async (req, res, next) => {
  const { _id } = req.query;
  const { username, password } = req.body;
  try {
    const { username } = req.body;

    // const existingUser = await User.findOne({ username });
    // if (existingUser) {
    //     return res.status(400).send({ status : false, message: 'Username already exists' });
    // }
    var user = await User.findByIdAndUpdate(_id, { password });
    if (user) {
      var resData = { status: true, message: "User updated successfully." };
    } else {
      var resData = { status: false, message: "User not found." };
    }
  } catch (error) {
    return res
      .status(500)
      .send({ status: false, message: "something went worng" });
  }
  return res.status(200).send(resData);
};

userCtrl.deletUser = async (req, res, next) => {
  const { _id } = req.query;
  try {
    var totalUser = await User.find();
    if (totalUser.length == 1) {
      var apiRes = {
        status: false,
        message: "Atlease one user is compulsory, you can't delete this user.",
      };
    } else {
      var user = await User.findByIdAndDelete(_id);
      if (user) {
        var apiRes = { status: true, message: "User deleted successfully" };
      } else {
        var apiRes = { status: false, message: "User not found" };
      }
    }
  } catch (error) {
    return res
      .status(500)
      .send({ status: false, message: "Something went wrong." });
  }
  return res.status(200).send(apiRes);
};

module.exports = userCtrl;
