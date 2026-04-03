import User from '../src/models/user.model.js';

export const seedUser = async (profileId, payInfoId) => {
  return await User.create({
    name: 'Jane Doe',
    email: 'jane@example.com',
    password: 'password123',
    type: 'creator',
    profile: profileId,
    payInfo: payInfoId
  });
};
