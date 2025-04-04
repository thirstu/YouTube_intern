import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { User } from "../models/user.models.js";
// import { upload } from "../middleware/multer.middleware.js";
import {
  deleteFromCloudinary,
  uploadOnCloudinary,
} from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/apiResponse.js";
import jwt from "jsonwebtoken";
import { env_file } from "../index_env.js";
import { pipeline } from "stream";
import { Premium } from "../models/premium.models.js";

const generateAccessAndRefreshTokens = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = await user.generateAccessToken();
    const refreshToken = await user.generateRefreshToken();
    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    console.log("---17---accessToken--refreshToken", accessToken,"////////////////////////----------///////////////////////////", refreshToken);
    return { accessToken, refreshToken };
  } catch (err) {
    console.error("generateAccessAndRefreshTokens----13---", err);
    throw new ApiError(
      500,
      "something went wrong while generating access and refresh tokens",
    );
  }
};

const registerUser = asyncHandler(async (req, res, next) => {
  // console.log('9--req.body---',req.body);
  // console.log('10--req.files---',req.files);

  ////get user details from frontend
  const { email, userName, password } = req.body;
  // console.log(email,userName,password);

  ////validation - not empty
  if ([userName, password, email].some((field) => field?.trim() === "")) {
    throw new ApiError(400, "----registerUser---all fields are required");
  }

  ////check if user already exists: userName or email
  const existingUser = await User.findOne({
    // email
    $or: [{ userName }, { email }],
  });
  // console.log("----25----",existingUser);

  if (existingUser) {
    throw new ApiError(
      409,
      "28----registerUser---user User with this email or username already exists",
    );
  }

  let avatarLocalPath;
  if (
    req.files &&
    Array.isArray(req.files.avatar) &&
    req.files.avatar.length > 0
  ) {
    avatarLocalPath = req.files?.avatar[0]?.path;
  } else {
    throw new ApiError(400, "----registerUser---avatar file are required");
  }
  // console.log("----32----",avatarLocalPath,);

  ////upload them to cloudinary, avatar
  const avatar = await uploadOnCloudinary(avatarLocalPath);
  // console.log('---43---',avatar);

  ////check for images, check for avatar
  if (!avatar) {
    throw new ApiError(400, "44----registerUser---avatar file are required");
  }

  ////create user object - create entry in db
  const user = await User.create({
    userName: userName.toLowerCase(),
    avatar: avatar.url,
    email,
    password,
  });
  console.log("----56----", user);

  /////remove password and refresh token field from response
  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken",
  );

  ////// check for user creation
  if (!createdUser) {
    throw new ApiError(
      500,
      "-66---registerUser---something went wrong while registering the user",
    );
  }

  const premium = await Premium.create({
    owner: createdUser._id,
    email: createdUser.email,
  });
  console.log(premium);
  ////// return res
  return res
    .status(201)
    .json(
      new ApiResponse(
        200,
        { createdUser, premium },
        "user registered successfully",
      ),
    );

  // console.log(req);
  // res.status(200).json({
  //     message:"ok ajay",
  // })
});

const loginUser = asyncHandler(async (req, res, next) => {
  ////taking login details form req body => data
  /////check if user exists userName or email
  /////if user does not exist then response user is not registered please register
  /////if user exist then authenticate user data password
  /////create access token and refresh token
  ////send cookie

  const { email, password, userName } = req.body;
  console.log("-130--loginUser", req.body, req.files, req.params, req.query);
  // console.log("-131--loginUser",req);
  if (!(email || password)) {
    throw new ApiError(400, "userName or email ir required");
  }

  const user = await User.findOne({
    $or: [{ email }, { userName }],
  });

  if (!user) {
    throw new ApiError(404, "User does not exist", [], "");
  }

  const isPasswordValid = await user.isPasswordCorrect(password);
  if (!isPasswordValid) {
    throw new ApiError(401, { message: "password is not correct" }, [], "");
  }

  const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(
    user._id,
  );

  // console.log("---152---accessToken--refreshToken",accessToken,refreshToken);
  // user.refreshToken=refreshToken
  // user.save();
  ///☝️or👇//saving a refresh token or adding
  const loggedInUser = await User.findById(user._id).select(
    "-password -refreshToken",
  );

  const options = {
    httpOnly: true, // Prevents access via JS
    secure: true, // Only over HTTPS
    // sameSite: "strict", // Helps with CSRF protection
    sameSite: "Lax", // Helps with CSRF protection
    path: "/",
    // Ensure it's accessible to all routes
  };

  return res
    .status(200)
    .cookie("refreshToken", refreshToken, options)
    .cookie("accessToken", accessToken, options)
    .json(
      new ApiResponse(
        200,
        {
          user: loggedInUser,
          accessToken,
          refreshToken,
        },
        "user logged in successfully",
      ),
    );
});

const logoutUser = asyncHandler(async (req, res) => {
  try {
    console.log(req.user._id);
    await User.findByIdAndUpdate(
      req.user._id,
      {
        $unset: { refreshToken: "" },
      },
      {
        new: true,
      },
    );

    const options = {
      httpOnly: true, // Prevents access via JS
      secure: true, // Only over HTTPS
      // sameSite: "strict", // Helps with CSRF protection
      sameSite: "Lax", // Helps with CSRF protection
      path: "/",
      
    };

    return res
      .status(200)
      .clearCookie("refreshToken",options)
      .json(new ApiResponse(200, {}, "user logged out successfully"));
  } catch (err) {
    console.error(err);
  }
});

const refreshAccessToken = asyncHandler(async (req, res) => {
  try {
    console.log(req.cookies, req.body);
    const incomingRefreshToken =
      (await req.cookies.refreshToken) || req.body.refreshToken;

    if (!incomingRefreshToken) {
      throw new ApiError(401, "unauthorized request");
    }

    const decodedToken = jwt.verify(
      incomingRefreshToken,
      env_file.REFRESH_TOKEN_SECRET,
    );

    const user = await User.findById(decodedToken?._id);

    if (!user) {
      throw new ApiError(401, "invalid refresh token");
    }

    if (incomingRefreshToken !== user?.refreshToken) {
      throw new ApiError(401, "refresh token is expired or used");
    }

    const options = {
      httpOnly: true, // Prevents access via JS
      secure: true, // Only over HTTPS
      // sameSite: "strict", // Helps with CSRF protection
      sameSite: "Lax", // Helps with CSRF protection
      path: "/",
       // Ensure it's accessible to all routes
    };

    const { accessToken,refreshToken } =
      await generateAccessAndRefreshTokens(user._id);
    user.refreshToken = refreshToken;
    const update = await User.findByIdAndUpdate(
      user._id,
      {
        $set: {
          refreshToken: refreshToken,
        },
      },
      { runValidators: false },
    );
    console.log(refreshToken);

    return res
      .status(200)
      .cookie("refreshToken", refreshToken, options)
      .cookie("accessToken", accessToken, options)
      .json(
        new ApiResponse(
          200,
          { accessToken,  refreshToken },
          "access token refreshed ",
        ),
      );
  } catch (err) {
    console.error("-262--refreshAccessToken", err);
    throw new ApiError(401, err?.message || "Invalid refresh token");
  }
});

const changeCurrentPassword = asyncHandler(async (req, res) => {
  const { oldPassword, newPassword } = req.body;

  const user = await User.findById(req.user?._id);
  const isPasswordCorrect = await user.isPasswordCorrect(oldPassword);

  if (!isPasswordCorrect) {
    throw new ApiError(400, "Invalid old password");
  }

  user.password = newPassword;
  await user.save({ validateBeforeSave: false });

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Password updated successfully"));
});

const getCurrentUser = asyncHandler(async (req, res) => {
  return res
    .status(200)
    .json(new ApiResponse(200, req.user, "current user fetched successfully"));
});

const updateAccountDetails = asyncHandler(async (req, res) => {
  const { fullName, email } = req.body;

  if (!fullName || !email) {
    throw new ApiError(400, "All fields are required");
  }

  const user = await User.findByIdAndUpdate(
    req.user?._id,
    {
      $set: {
        fullName: fullName,
        email: email,
      },
    },
    { new: true },
  ).select("-password");

  return res
    .status(200)
    .json(new ApiResponse(200, user, "account updated successfully"));
});

const updateUserAvatar = asyncHandler(async (req, res) => {
  // console.log("updateUserAvatar--user-----",);
  console.log("updateUserAvatar-------", req.user);

  const avatarLocalPath = req.file?.path;
  console.log("req.files", req.files, "req.file", req.file);

  if (!avatarLocalPath) {
    throw new ApiError(400, "Avatar file is missing");
  }

  const avatar = await uploadOnCloudinary(avatarLocalPath);

  if (!avatar?.url) {
    throw new ApiError(400, "error while uploading avatar");
  }

  const oldUserAvatar = req?.user?.avatar;

  const user = await User.findByIdAndUpdate(
    req.user?._id,
    {
      $set: {
        avatar: avatar.url,
      },
    },
    { new: true },
  ).select("-password");

  const public_id = oldUserAvatar
    ?.split("/")
    [oldUserAvatar?.split("/")?.length - 1]?.split(".")[0];
  const deletedAvatar = await deleteFromCloudinary(public_id);

  console.log("deletedAvatar", deletedAvatar);

  return res
    .status(200)
    .json(new ApiResponse(200, user, "user avatar updated successfully"));
});

const getUserChannelProfile = asyncHandler(async (req, res) => {
  const { userName } = req.params;

  if (!userName?.trim()) {
    throw new ApiError(400, "userName is missing");
  }

  const channel = await User.aggregate([
    {
      $match: {
        userName: userName?.toLowerCase(),
      },
    },
    {
      $lookup: {
        from: "subscriptions",
        localField: "_id",
        foreignField: "channel",
        as: "subscribers",
      },
    },
    {
      $lookup: {
        from: "subscriptions",
        localField: "_id",
        foreignField: "subscribers",
        as: "subscribedTo",
      },
    },
    {
      $addFields: {
        subscribersCount: {
          $size: "$subscribers",
        },
        channelsSubscribedToCount: {
          $size: "$subscribedTo",
        },
        isSubscribed: {
          $cond: {
            if: {
              $in: [req.user?._id, "$subscribers.subscriber"],
            },
            then: true,
            else: false,
          },
        },
      },
    },
    {
      $project: {
        userName: 1,
        subscribersCount: 1,
        channelsSubscribedToCount: 1,
        isSubscribed: 1,
        avatar: 1,
        email: 1,
      },
    },
  ]);
  console.log(channel);
  if (!channel?.length) {
    throw new ApiError(404, "channel does not exist");
  }

  return res
    .status(200)
    .json(
      new ApiResponse(200, channel[0], "user channel fetched successfully"),
    );
});

const getWatchHistory = asyncHandler(async (req, res) => {
  const user = await User.aggregate([
    {
      $match: {
        _id: new mongoose.Types.ObjectId(req.user._id),
      },
    },
    {
      $lookup: {
        from: "videos",
        localField: "watchHistory",
        foreignField: "_id",
        as: "watchHistory",
        pipeline: [
          {
            $lookup: {
              from: "users",
              localField: "owner",
              foreignField: "_id",
              as: "owner",
              pipeline: [
                {
                  $project: {
                    userName: 1,
                    avatar: 1,
                  },
                },
              ],
            },
          },
          {
            $addFields: {
              owner: {
                $first: "$owner",
              },
            },
          },
        ],
      },
    },
  ]);

  return res
    .status(200)
    .json(200, user[0].watchHistory, "watch history fetched successfully");
});

export {
  registerUser,
  loginUser,
  logoutUser,
  refreshAccessToken,
  changeCurrentPassword,
  getCurrentUser,
  updateAccountDetails,
  updateUserAvatar,
  getUserChannelProfile,
  getWatchHistory,
};
