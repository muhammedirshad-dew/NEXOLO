import User from "../models/userModel";
import bcrypt from "bcryptjs";

export const signup = async(req, res) => {
  try {
    const {username , fullName , email , password} = req.body;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!emailRegex.test(email)){
      return res.status(400).json({ error : "Invalid email Format"})
    }

    const existingEmail = await User.findOne({email}) 
    const existingUsername = await User.findOne({username})

    if(existingEmail || existingUsername){
      return res.status(400).json({error : "Already Existing User or email"})
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

    if(!passwordRegex.test(password) ){
      return res
      .status(400)
      .json({error:"Password must have at 1 uppercase, 1 lowercase, 1 number, 1 special character, and minimum 8 characters"})
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password , salt);

  } catch (error) {
    console.log(`Error in signup contoller : ${error}`)
    res.status(500).json({error : "Internal Server Error"})
  }
};

export const login = (req, res) => {
  res.send("login controller");
};

export const logout = (req, res) => {
  res.send("logout controller");
};



