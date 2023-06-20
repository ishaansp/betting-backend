const userModel = require("../modals/user.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const secretKey = "BETTINGAPPADMIN";

const signin = async (req, res) => {
  const { email, password, role } = req.body;
  try {
    const existingUser = await userModel.findOne({ email: email });
    if (!existingUser) {
      return res.status(400).json({ message: "user not found" });
    }
    if (existingUser.role!='admin') {
        return res.status(400).json({ message: "admin access is required" });
      }
    const matchPassword = await bcrypt.compare(password, existingUser.password);

    if (!matchPassword) {
      return res.status(400).json({ message: "Invalid Creds" });
    }
    const token = jwt.sign(
      { email: existingUser.email, id: existingUser._id },
      secretKey
    );
    res.status(201).json({ user: existingUser, token: token });
  } catch (error) {
    res.status(500).json({ message: "something went wrong" });
  }
};
const getAllUsers  =async(req, res)=>{
        const { email, password } = req.body;
        try {
          const Users = await userModel.find({});
          res.status(201).json({ user: Users});
        } catch (error) {
            console.log("Error", error)
          res.status(500).json({ message: "something went wrong" });
        }
      };
module.exports = { getAllUsers , signin };
