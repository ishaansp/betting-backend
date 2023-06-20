const userModel = require("../modals/user.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const secretKey = "BETTINGAPP";
const adminsecretKey = "BETTINGAPPADMIN";
const stripe = require("stripe")(
  "sk_test_51NDq1PSGrthBFHWg5GejisRDI1MSlRcnzDBGOdnKSFLuSFcTb23cx1tL9pmC1vfZoiEH2VSaKEIOR8yaDfe5vmls00o4KZ5t8V"
);

const signup = async (req, res) => {
  const { email, password, role } = req.body;
  try {
    const existingUser = await userModel.findOne({ email: email });
    if (existingUser) {
      return res.status(400).json({ message: "user already exist" });
    }
    const customer = await stripe.customers.create({
      email: email,
    });
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await userModel.create({
      email: email,
      password: hashedPassword,
      role: role,
      stripeID: customer.id ? customer.id : "",
    });

    const token = jwt.sign({ email: result.email, id: result._id }, secretKey);
    res.status(201).json({ user: result, token: token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "something went wrong" });
  }
};

const signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await userModel.findOne({ email: email });
    if (!existingUser) {
      return res.status(404).json({ message: "user not found" });
    }
    const matchPassword = await bcrypt.compare(password, existingUser.password);

    if (!matchPassword) {
      return res.status(401).json({ message: "Invalid Creds" });
    }
    if (req.body.role == "admin") {
      const token = jwt.sign(
        { email: existingUser.email, id: existingUser._id },
        adminsecretKey
      );
    } else {
      const token = jwt.sign(
        { email: existingUser.email, id: existingUser._id },
        secretKey
      );

      res.status(201).json({ user: existingUser, token: token });
    }
  } catch (error) {
    res.status(500).json({ message: "something went wrong" });
  }
};
const updateUser = async (req, res) => {
  const { email } = req.body;
  try {
    const update = {
      $set: req.body,
    };
    const user = await userModel.updateOne({ email: email }, update);
    if (user) {
      res.status(201).json({ message: "updated" });
    } else {
      console.log("error 76");
      res.status(500).json({ message: "something went wrong" });
    }
  } catch (error) {
    console.log("error 80", error);

    res.status(500).json({ message: "something went wrong" });
  }
};

const getUserDetails= async(req,res)=>{
  const { email } = req.body;
  try {
   console.log("email", email)
    const user = await userModel.find({ email: email });
    if (user) {
      res.status(201).json({ user:user });
    } else {
      res.status(500).json({ message: "something went wrong" });
    }
  } catch (error) {
    console.log("Error",error)

    res.status(500).json({ message: "something went wrong" });
  }
}
module.exports = { signup, signin, updateUser ,getUserDetails};
