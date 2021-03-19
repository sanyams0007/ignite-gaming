const User = require("../models/user");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const sendToken = require("../utils/jwtToken");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");

// @route       POST api/register
// @description  register a user
// @access
exports.registerUser = catchAsyncErrors(async (req, res, next) => {
  const { name, email, password } = req.body;

  const user = await User.create({
    name,
    email,
    password,
    avatar: {
      public_id: "avatar1",
      url:
        "https://avataaars.io/?avatarStyle=Circle&topType=LongHairStraightStrand&accessoriesType=Prescription01&hairColor=BrownDark&facialHairType=BeardLight&facialHairColor=Brown&clotheType=CollarSweater&clotheColor=Pink&eyeType=Surprised&eyebrowType=Angry&mouthType=ScreamOpen&skinColor=Tanned",
    },
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

// @route       POST api/password/forgor
// @description  forgot password
// @access
exports.forgotPassword = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return next(new ErrorHandler("User not found with this email", 404));
  }

  // Get reset token
  const resetToken = user.getResetPasswordToken();

  await user.save({ validateBeforeSave: false });

  // Create reset password url with message
  const resetUrl = `${req.protocol}://${req.get(
    "host"
  )}/api/password/reset/${resetToken}`;

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
