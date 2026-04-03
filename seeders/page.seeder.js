import Page from '../src/models/page.model.js';

export const seedPage = async (sectionId) => {
  return await Page.create({
    name: 'Home',
    url: 'home',
    description: 'Home page description',
    sections: [sectionId]
  });
};
