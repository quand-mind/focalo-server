import Profile from '../src/models/profile.model.js';

export const seedProfile = async (payInfoId, profileConfigId) => {
  return await Profile.create({
    name: 'Jane Original Profile',
    type: 'Creator',
    url: 'jane-doe',
    payInfo: payInfoId,
    profileConfig: profileConfigId
  });
};
