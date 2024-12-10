import { Request, Response } from 'express';
import authServices from './auth.services';
import CustomError from '../../../errors';
import jwtHelpers from '../../../../healpers/healper.jwt';
import config from '../../../../config';
import { Secret } from 'jsonwebtoken';
import sendResponse from '../../../../shared/sendResponse';
import { StatusCodes } from 'http-status-codes';
import IdGenerator from '../../../../utils/IdGenerator';
import { userExist } from '../../../../utils/userExist';
import sendMail from '../../../../utils/sendEmail';
import User from '../../userModule/user.model';
import Outlet from '../../outletModule/outlet.model';

// controller for user/outlet login
const userLogin = async (req: Request, res: Response) => {
  const { email, password, isSocial, fcmToken } = req.body;

  const user = await authServices.getUserByEmail(email);
  const outlet = await authServices.getOutletByEmail(email);

  if (!user && !outlet) throw new CustomError.BadRequestError('Invalid email or password!');

  if (user) {
    if (isSocial) {
      // if (user.fcmToken !== fcmToken) {
      //   throw new CustomError.BadRequestError('Invalid creadentials')
      // }
    } else {
      // check the password is correct
      const isPasswordMatch = await user.comparePassword(password);
      if (!isPasswordMatch) throw new CustomError.BadRequestError('Invalid email or password');
    }

    // generate token
    const payload = {
      userId: user.userId,
      email: user.email,
      role: user.role,
    };

    const accessToken = jwtHelpers.createToken(
      payload as Record<string, string>,
      config.jwt_access_token_secret as Secret,
      config.jwt_access_token_expiresin as string,
    );

    const refreshToken = jwtHelpers.createToken(
      payload as Record<string, string>,
      config.jwt_refresh_token_secret as Secret,
      config.jwt_refresh_token_expiresin as string,
    );

    const userInfo = {
      userId: user.userId,
      email: user.email,
      _id: user._id,
      role: user.role,
      accessToken,
      refreshToken,
      isEmailVerified: isSocial ? true : user.isEmailVerified,
    };

    user.isActive = true;
    await user.save();

    sendResponse(res, {
      statusCode: StatusCodes.OK,
      status: 'success',
      message: `User login successfull`,
      data: userInfo,
    });
  } else if (outlet) {
    if (isSocial) {
      // if (user.fcmToken !== fcmToken) {
      //   throw new CustomError.BadRequestError('Invalid creadentials')
      // }
    } else {
      // check the password is correct
      const isPasswordMatch = await outlet.comparePassword(password);
      if (!isPasswordMatch) throw new CustomError.BadRequestError('Invalid email or password');
    }

    // generate token
    const payload = {
      userId: outlet.outletId,
      email: outlet.email,
      role: outlet.role,
    };

    const accessToken = jwtHelpers.createToken(
      payload as Record<string, string>,
      config.jwt_access_token_secret as Secret,
      config.jwt_access_token_expiresin as string,
    );

    const refreshToken = jwtHelpers.createToken(
      payload as Record<string, string>,
      config.jwt_refresh_token_secret as Secret,
      config.jwt_refresh_token_expiresin as string,
    );

    const outletInfo = {
      outletId: outlet.outletId,
      email: outlet.email,
      _id: outlet._id,
      role: outlet.role,
      accessToken,
      refreshToken,
      isEmailVerified: isSocial ? true : outlet.isEmailVerified,
    };

    sendResponse(res, {
      statusCode: StatusCodes.OK,
      status: 'success',
      message: `${outlet.type} login successfull`,
      data: outletInfo,
    });
  } else {
    throw new CustomError.BadRequestError('Failed to login!');
  }
};

// controller for resend email verification code
const resendEmailVerificationCode = async (req: Request, res: Response) => {
  const { email } = req.body;
  const code = IdGenerator.generateId();
  const expireDate = new Date();
  expireDate.setMinutes(expireDate.getMinutes() + 5);
  const verification = {
    code: code,
    expireDate,
  };

  const userExistance = await userExist(email as string);
  if (!userExistance) {
    throw new CustomError.NotFoundError('User not found!');
  }

  userExistance.verification = verification;
  await userExistance.save();

  // send email verification mail
  const content = `Your email veirfication code is ${verification?.code}`;
  // const verificationLink = `${config.server_base_url}/v1/auth/verify-email/${user._id}?userCode=${verification.code}`
  // const content = `Click the following link to verify your email: ${verificationLink}`
  const mailOptions = {
    from: 'fahadhossain0503@gmail.com',
    to: email,
    subject: 'Email Verification',
    text: content,
  };

  sendMail(mailOptions);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    status: 'success',
    message: 'Email verification code resend successfull',
  });
};

// controller for verify email
const userEmailVerify = async (req: Request, res: Response) => {
  const { email, code } = req.body;

  const userExistance = await userExist(email as string);
  if (!userExistance) {
    throw new CustomError.NotFoundError('User not found!');
  }
  // const user = await authServices.getUserByEmail(email)
  // if (!user) throw new CustomError.BadRequestError('User not found!')

  const isVerificationCodeMatch = await userExistance.compareVerificationCode(code);
  if (!isVerificationCodeMatch) {
    throw new CustomError.BadRequestError('Invalid code!');
  }

  const now = new Date();
  if (userExistance.verification?.expireDate && userExistance.verification?.expireDate < now) {
    throw new CustomError.BadRequestError('Sorry, Email verification Code using date expired!');
  }

  // update the email verification status of user
  if (userExistance.role === 'user') {
    await User.findByIdAndUpdate(userExistance._id, { isEmailVerified: true });
    await User.findByIdAndUpdate(userExistance._id, {
      verification: { code: null, expireDate: null },
    });
  }

  if (userExistance.role === 'outlet') {
    // set null verification object in user model
    await Outlet.findByIdAndUpdate(userExistance._id, {
      verification: { code: null, expireDate: null },
    });
  }

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    status: 'success',
    message: 'Email verification successfull',
  });
};

// controller for send otp
const sendOTP = async (req: Request, res: Response) => {
  const { email } = req.body;
  if (!email) {
    throw new CustomError.BadRequestError('Missing data in request body!');
  }

  const userExistance = await userExist(email);
  if (!userExistance) {
    throw new CustomError.NotFoundError('User not found!');
  }

  const code = IdGenerator.generateId();
  const expireDate = new Date();
  expireDate.setMinutes(expireDate.getMinutes() + 5);
  const verification = {
    code,
    expireDate,
  };

  userExistance.verification = verification;
  await userExistance.save();

  // send verification mail
  const textContent = `
      Hi,
      
      You have requested to reset your password. Please use the following One-Time Password (OTP) to complete the process. This OTP is valid for 5 minutes.
      
      Your OTP: ${code}
      
      If you did not request this, please ignore this email and your password will remain unchanged.
      
      For security reasons, do not share this OTP with anyone.
      
      Best regards,
      `;

  const mailOptions = {
    from: 'fahadhossain0503@gmail.com',
    to: email,
    subject: 'Password Reset OTP',
    text: textContent,
  };

  sendMail(mailOptions);

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    status: 'success',
    message: 'Password reset OTP sended successfull.',
  });
};

// controller for verify otp
const verifyOTP = async (req: Request, res: Response) => {
  const { email, otp } = req.body;
  if (!email || !otp) {
    throw new CustomError.BadRequestError('Missing data in request body!');
  }

  const userExistance = await userExist(email);
  if (!userExistance) {
    throw new CustomError.NotFoundError('User not found!');
  }

  const isMatchOTP = await userExistance.compareVerificationCode(otp);
  if (!isMatchOTP) {
    throw new CustomError.BadRequestError('Invalid OTP!');
  }

  // set null verification object in user model
  if (userExistance.role === 'user') {
    await User.findByIdAndUpdate(userExistance._id, {
      verification: { code: null, expireDate: null },
    });
  }

  if (userExistance.role === 'outlet') {
    await Outlet.findByIdAndUpdate(userExistance._id, {
      verification: { code: null, expireDate: null },
    });
  }

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    status: 'success',
    message: 'OTP match successfull',
  });
};

// controller for reset password
const resetPassword = async (req: Request, res: Response) => {
  const { email, newPassword } = req.body;
  if (!email || !newPassword) {
    throw new CustomError.BadRequestError('Missing data in request body!');
  }

  const userExistance = await userExist(email);
  if (!userExistance) {
    throw new CustomError.NotFoundError('User not found!');
  }

  userExistance.password = newPassword;
  await userExistance.save();

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    status: 'success',
    message: 'Password reset successfull',
  });
};

// controller for change password
const changePassword = async (req: Request, res: Response) => {
  const { email, oldPassword, newPassword } = req.body;

  const userExistance = await userExist(email);
  if (!userExistance) {
    throw new CustomError.NotFoundError('User not found!');
  }

  // compare user given old password and database saved password
  const isOldPassMatch = await userExistance.comparePassword(oldPassword);
  if (!isOldPassMatch) {
    throw new CustomError.BadRequestError('Wrong password');
  }

  userExistance.password = newPassword;
  await userExistance.save();

  sendResponse(res, {
    statusCode: StatusCodes.OK,
    status: 'success',
    message: 'Password change successfull',
  });
};

// controller for get access token by refresh token
const getAccessTokenByRefreshToken = async (req: Request, res: Response) => {
  const { refresh_token } = req.body;
  const actualRefreshToken = refresh_token.split(' ')[1];

  const tokenPayload = jwtHelpers.verifyToken(actualRefreshToken, config.jwt_refresh_token_secret as Secret);
  if (!tokenPayload) {
    throw new CustomError.BadRequestError('Invalid refresh token!');
  }

  const user = await authServices.getUserByEmail(tokenPayload.email);
  const outlet = await authServices.getOutletByEmail(tokenPayload.email);

  if (!user && !outlet) {
    throw new CustomError.NotFoundError('User not found!');
  }
  if (user) {
    const payload = {
      userId: user.userId,
      email: user.email,
      role: user.role,
    };

    const newAccessToken = jwtHelpers.createToken(
      payload,
      config.jwt_access_token_secret as Secret,
      config.jwt_access_token_expiresin as string,
    );

    sendResponse(res, {
      statusCode: StatusCodes.OK,
      status: 'success',
      message: 'New access token created using refresh token. User logged In successful',
      data: {
        accessToken: newAccessToken,
        refreshToken: actualRefreshToken,
      },
    });
  } else if (outlet) {
    const payload = {
      userId: outlet.outletId,
      email: outlet.email,
      role: outlet.role,
    };

    const newAccessToken = jwtHelpers.createToken(
      payload,
      config.jwt_access_token_secret as Secret,
      config.jwt_access_token_expiresin as string,
    );

    sendResponse(res, {
      statusCode: StatusCodes.OK,
      status: 'success',
      message: 'New access token created using refresh token. Outlet logged In successful',
      data: {
        accessToken: newAccessToken,
        refreshToken: actualRefreshToken,
      },
    });
  } else {
    throw new CustomError.BadRequestError('Failed to get new accessToken');
  }
};

export default {
  userLogin,
  resendEmailVerificationCode,
  userEmailVerify,
  sendOTP,
  verifyOTP,
  resetPassword,
  changePassword,
  getAccessTokenByRefreshToken,
};
