import { UAParser } from 'ua-parser-js';
import UserModel from '../models/user.model.js';
import { generateUniqueUsername } from '../utils/utilities.js';
import jwt from 'jsonwebtoken';
import { ApiError } from '../utils/ApiError.js';
import { sendMessageToUser } from '../utils/EmailSend.js';

// Extract client info (IP, Browser, OS, Device)
export function getClientInfo(req) {
  const ip =
    req.headers['x-forwarded-for']?.split(',').shift() || req.ip || req.socket.remoteAddress;

  console.log('agent', req.headers['user-agent']);
  const parser = new UAParser(req.headers['user-agent']);

  const ua = parser.getResult();

  return {
    ip: ip || 'Unknown',
    browser: ua.browser.name || 'Unknown',
    os: ua.os.name || 'Unknown',
    deviceType: ua.device.type || 'Desktop',
  };
}

// Create and save a new active session for a user
export async function createSession(user, req) {
  const token = await user.generateAccessToken();
  const clientInfo = getClientInfo(req);

  const newSession = {
    token,
    ip: clientInfo.ip,
    userAgent: `${clientInfo.browser} on ${clientInfo.os} (${clientInfo.deviceType})`,
  };

  user.activeSessions.push(newSession);

  // Update last login time
  // Handle first time login case where currentLogin is null
  user.lastLogin = user.currentLogin || new Date();
  user.currentLogin = new Date();
  await user.save({ validateBeforeSave: false });
  return token;
}

// Create a new user and send account verification email
export async function createUserAndSendVerification(req, name, email, password, googleId, picture) {
  const uniqueUsername = await generateUniqueUsername(name);

  const userData = {
    username: uniqueUsername,
    name,
    email,
  };

  if (password) {
    userData.password = password; // Only set if provided
  }
  if (googleId) {
    userData.googleId = googleId;
    userData.authProvider = 'google';
  }
  if (picture) {
    userData.avatar = picture;
  }

  const user = await UserModel.create(userData);

  await createSession(user, req);

  const createdUser = await UserModel.findById(user._id).select('-password');

  if (!createdUser) {
    throw new ApiError(500, `${name} - unable to register user!!`);
  }

  console.log(`${createdUser.name} - Your Account Successfully created!!`);
  console.log('Sending Email for Verification....');

  const token = jwt.sign({ _id: createdUser._id }, process.env.ACCOUNT_VERIFICATION_TOKEN_SECRET, {
    expiresIn: process.env.ACCOUNT_VERIFICATION_TOKEN_SECRET_EXPIRY,
  });

  // const isSentGmail = await sendMessageToUser(
  //     createdUser.name,
  //     'VERIFY_ACCOUNT',
  //     createdUser.email,
  //     'Budgetter Account Verification',
  //     token,
  // );

  // if (!isSentGmail) {
  //     console.log(`Failed to send email to - ${createdUser.email}`);
  // }

  return createdUser;
}
