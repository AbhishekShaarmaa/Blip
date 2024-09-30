import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import generateTokenAndSetCookie from "../utils/generateTokens.js";
import User from "../models/user/user.models.js";
import { verifyUserEmail , sendResetEmail } from "../utils/gmail.js";

export const signup = async (req, res) => {
  try {
    const { fullName, userName, email, password, confirmPassword, gender } =
      req.body;

    if (password !== confirmPassword) {
      return res.status(400).json({ error: "Passwords do not match" });
    }

    const existingUserName = await User.findOne({ userName });
    console.log(existingUserName);

    if (existingUserName) {
      return res.status(400).json({ error: "Username already exists" });
    }

    // checking for existing email addreeses
    const existingUserEmail = await User.findOne({email});
    if (existingUserEmail) {
      return res
        .status(400)
        .json({ error: "User with this email already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const profilePic = `https://api.multiavatar.com/${userName}.svg`;

    const newUser = new User({
      fullName,
      userName,
      email,
      password: hashedPassword,
      gender,
      profilePic,
    });

    const emailToken = jwt.sign({ userName }, process.env.JWT_SECRET_KEY, {
      expiresIn: "1h",
    });

    // Assuming verifyUserEmail is defined as an async function
    try {
      await verifyUserEmail(fullName, email, userName, emailToken);
    } catch (emailError) {
      return res.status(500).json({
        error: "Error sending verification email",
        message: emailError.message,
      });
    }

    await newUser.save();
    generateTokenAndSetCookie(newUser._id, res);

    res.status(201).json({
      status: "success",
      _id: newUser._id,
      userName: newUser.userName,
      email: newUser.email,
      profilePic: newUser.profilePic,
    });
  } catch (error) {
    // Log the error for internal debugging
    console.error("Signup Error:", error);
    res
      .status(500)
      .json({ error: "Internal server error", message: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { userName, password } = req.body;
    console.log("86 =", userName, password);
    const user = await User.findOne({ userName });
    console.log("user = ", user);
    const user_Id = user._id;
    console.log("user_id", user_Id);

    if (!user) {
      return res.status(404).json({ error: "Incorrect username or password" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(404).json({ error: "Incorrect username or password" });
    }

    generateTokenAndSetCookie(user._id, res);

    res.json({
      _id: user._id,
      userName: user.userName,
      profilePic: user.profilePic,
    });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Internal server error", message: error.message });
  }
};

export const logout = async (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Internal server error", message: error.message });
  }
};

export const getUser = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({
      status: "success",
      result: users.length,
      data: { users },
    });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Internal server error", message: error.message });
  }
};

export const verifyEmail = async (req, res) => {
  try {
    const { userName, emailToken } = req.body;
    const user = await User.findOne(userName);
    console.log(user);

    if (!user) {
      return res.status(404).json({ error: "No user found 120" });
    }

    try {
      const decoded = jwt.verify(emailToken, process.env.JWT_SECRET_KEY);
      console.log(decoded);

      await User.updateOne(
        { userName: req.body.userName },
        { $set: { confirmedEmail: true } }
      );

      console.log("User found and email confirmed");
      return res.json({ status: "okay" });
    } catch (err) {
      console.error("Invalid email token", err);
      return res.status(400).json({ error: "Invalid email token" });
    }
  } catch (err) {
    console.error("Error finding user", err);
    return res
      .status(500)
      .json({ error: "Internal server error", message: err.message });
  }
};

export const updatePassword = async (req, res) => {
  try {
    const { email } = req.body;
    console.log("172 = ", req.body);
    
    const user = await User.findOne({ email });
    
    if (!user) return res.status(404).json({ message: "User not found" });
    
    const emailToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "1h",
    });
    
    user.updatePasswordToken = emailToken; // Update the user instance
    user.updatePasswordExpires = Date.now() + 3600000; // 1 hour from now
    await user.save(); // Save the changes

    try {
      await sendResetEmail(email, emailToken);
    } catch (emailError) {
      return res.status(500).json({
        error: "Error sending verification email",
        message: emailError.message,
      });
    }

    res.status(200).json({ message: "Password reset email sent successfully" });
  } catch (error) {
    console.log("error message", error.message);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { newPassword, confirmNewPassword } = req.body;

    console.log("200");
    console.log("password = ", req.body);

    if (newPassword !== confirmNewPassword) {
      return res.status(400).json({ error: "Passwords do not match" });
    }

    // Decode the token to get the user ID
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY); // Use your secret key

    const user = await User.findOne({
      _id: decoded.id,
      updatePasswordToken: token,
      updatePasswordExpires: { $gt: Date.now() }
    });

    console.log("user = ", user);

    if (!user) {
      return res.status(400).json({ message: 'Invalid or expired token' });
    }

    const salt = await bcrypt.genSalt(10); // Add salt for hashing
    user.password = await bcrypt.hash(newPassword, salt);

    // Clear the password reset token and expiration
    user.updatePasswordToken = undefined;
    user.updatePasswordExpires = undefined;

    await user.save();

    console.log("userPassword = ", user.password);

    res.status(200).json({ message: 'Password successfully reset' });
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).json({ message: 'Internal server error' });
  }
};


//deleteing users
export const deleteUser = async (req, res) => {
  try {
    const { emailToDelete } = req.body;
    console.log("emailToDlete = ", emailToDelete  )

    // Use an object as the filter for deleteMany
    const user = await User.find  ({ email: emailToDelete });
    console.log("user =", user);

    // If the user with the provided email does not exist
    if (!user) {
      return res.status(404).json({ message: "No users found with this email" });
    }
    const result = await User.deleteMany({ email: emailToDelete });

    // Check if any users were deleted
    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "No users found with this email" });
    }

    // Success response after deletion
    res.status(200).json({ message: `${result.deletedCount} user(s) deleted successfully` });
  } catch (error) {
    res.status(500).json({ message: 'Internal server error', error: error.message });
  }
};

