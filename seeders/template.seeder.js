import Template from '../src/models/template.model.js';

export const seedTemplate = async (userId, pageId) => {
  return await Template.create({
    name: 'Minimalist Template',
    createdBy: userId,
    mainPage: pageId,
    pages: [pageId]
  });
};
