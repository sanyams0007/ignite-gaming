const User = require("../models/user");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const sendToken = require("../utils/jwtToken");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");
const cloudinary = require("cloudinary");

/* LOGGED IN USER ROUTES */

// @route       POST api/register
// @description  register a user
// @access
exports.registerUser = catchAsyncErrors(async (req, res, next) => {
  /* const result = await cloudinary.v2.uploader.upload(
    "https://res.cloudinary.com/ignitegaming/image/upload/v1619004773/avatars/default_avatar_oamuj3.png",
    {
      folder: "avatars",
      width: 150,
      crop: "scale",
    }
  ); */
  const { name, email, password } = req.body;

  const user = await User.create({
    name,
    email,
    password,
    /* avatar: {
      public_id: result.public_id,
      url: result.secure_url,
    }, */
  });

  sendToken(user, 200, res);
});

// @route       POST api/login
// @description  logs in a user
// @access
exports.loginUser = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;

  // Checks if username and password is entered or not
  if (!email || !password)
    return next(new ErrorHandler("Please enter email and password", 400));

  // Finding user in databse
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return next(new ErrorHandler("Invalid Email or Password", 401));
  }

  // Checks if password is correct
  const isPasswordMatched = await user.comparePassword(password);
  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invalid Email or Password", 401));
  }

  sendToken(user, 200, res);
});

// @route       GET api/me
// @description  get currently logged in user details
// @access
exports.getUserProfile = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  res.status(200).json({
    success: true,
    user,
  });
});

// @route       PUT api/me/update
// @description  change / update user detail
exports.updateProfile = catchAsyncErrors(async (req, res, next) => {
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
  };

  //Update avatar
  if (typeof req.body.avatar !== "undefined") {
    const user = await User.findById(req.user.id);

    if (user.hasOwnProperty("avatar")) {
      const image_id = user.avatar.public_id;

      const res = await cloudinary.v2.uploader.destroy(image_id);
    }

    const result = await cloudinary.v2.uploader.upload(req.body.avatar, {
      folder: "avatars",
      width: 150,
      crop: "scale",
    });

    newUserData.avatar = {
      public_id: result.public_id,
      url: result.secure_url,
    };
  }

  const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
  });
});

// @route       PUT api/password/update
// @description  change/update user password
exports.updatePassword = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user.id).select("+password");

  // Check previous user password
  const isMatched = await user.comparePassword(req.body.oldPassword);
  if (!isMatched) {
    return next(new ErrorHandler("Password is incorrect", 400));
  }

  user.password = req.body.newPassword;
  await user.save();

  sendToken(user, 200, res);
});

// @route       POST api/password/forgor
// @description  forgot password
// @access
exports.forgotPassword = catchAsyncErrors(async (req, res, next) => {
  console.log(req.body.email);
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return next(new ErrorHandler("User not found with this email", 404));
  }

  // Get reset token
  const resetToken = user.getResetPasswordToken();

  await user.save({ validateBeforeSave: false });

  // Create reset password url with message
  /* const resetUrl = `${req.protocol}://${req.get(
    "host"
  )}/api/password/reset/${resetToken}`; */
  const resetUrl = `${process.env.FRONTEND_URL}/password/reset/${resetToken}`;

  const message = `Your password reset token is as follows:\n\n${resetUrl}\n\nif you have not requested this email then ignore it.`;

  // Sends email to the user
  try {
    await sendEmail({
      email: user.email,
      subject: "Ignite Password Recovery Mail",
      message,
    });

    res.status(200).json({
      success: true,
      message: `Email send to ${user.email}`,
    });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save({ validateBeforeSave: false });

    return next(new ErrorHandler(error.message, 500));
  }
});

// @route       PUT api/password/reset/:token
// @description  reset password
// @access
exports.resetPassword = catchAsyncErrors(async (req, res, next) => {
  // Hash URL token
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user) {
    return next(
      new ErrorHandler(
        "Password reset link is invalid or has been expired. Try Again!!.",
        400
      )
    );
  }

  if (req.body.password !== req.body.confirmPassword) {
    return next(new ErrorHandler("Password does not match", 400));
  }

  // Setup new password
  user.password = req.body.password;

  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save();

  sendToken(user, 200, res);
});

// @route       GET api/logout
// @description  logs out a user
// @access
exports.logoutUser = catchAsyncErrors(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "Logged Out",
  });
});

/* ADMIN ONLY ROUTES */

// @route       GET api/admin/users
// @description  get list of all users
exports.getAllUser = catchAsyncErrors(async (req, res, next) => {
  const users = await User.find();

  res.status(200).json({
    success: true,
    count: users.length,
    users,
  });
});

// @route       GET api/admin/user/:id
// @description  get user detail
exports.getUserDetails = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(
      new ErrorHandler(`User does not exist/found with id ${req.params.id} `)
    );
  }

  res.status(200).json({
    success: true,
    user,
  });
});

// @route       PUT api/admin/user/:id
// @description  change/update user detail
exports.updateUser = catchAsyncErrors(async (req, res, next) => {
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
    role: req.body.role,
  };

  const user = await User.findByIdAndUpdate(req.params.id, newUserData, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
  });
});

// @route       DELETE api/admin/user/:id
// @description  delete user
exports.deleteUser = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    return next(
      new ErrorHandler(`User does not exist/found with id ${req.params.id} `)
    );
  }

  // Remove Avatar from Cloudinary : TODO

  await user.remove();

  res.status(200).json({
    success: true,
    user,
  });
});
