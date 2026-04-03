import Section from '../src/models/section.model.js';

export const seedSection = async () => {
  return await Section.create({
    name: 'Hero Section',
    description: 'Welcome to Jane Doe\'s profile!',
    layoutDesign: 'hero-layout-1',
    action: 'scroll-down'
  });
};
