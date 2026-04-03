import ProfileConfig from '../src/models/profileConfig.model.js';

export const seedProfileConfig = async () => {
  return await ProfileConfig.create({
    theme: 'dark',
    layout: 'grid',
    isPublic: true
  });
};
