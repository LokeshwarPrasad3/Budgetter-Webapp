import UserModel from '../models/user.model.js';

export const generateUniqueUsername = async (name) => {
  let baseUsername = name.toLowerCase().replace(/\s+/g, '');
  let username = baseUsername;
  let count = 1;

  while (await UserModel.findOne({ username })) {
    username = `${baseUsername}${count}`;
    count++;
  }

  return username;
};
