import 'dotenv/config';
import mongoose from 'mongoose';
import User from '../src/models/user.model.js';
import Profile from '../src/models/profile.model.js';
import PayInfo from '../src/models/payInfo.model.js';
import ProfileConfig from '../src/models/profileConfig.model.js';
import Template from '../src/models/template.model.js';
import Page from '../src/models/page.model.js';
import Section from '../src/models/section.model.js';
import connectDB from '../src/config/db.js';

import { seedPayInfo } from './payInfo.seeder.js';
import { seedProfileConfig } from './profileConfig.seeder.js';
import { seedProfile } from './profile.seeder.js';
import { seedUser } from './user.seeder.js';
import { seedTemplate } from './template.seeder.js';
import { seedPage } from './page.seeder.js';
import { seedSection } from './section.seeder.js';

const seedDatabase = async () => {
  try {
    await connectDB();
    console.log('Connected to the database.');

    // Clear existing records
    console.log('Clearing existing data...');
    await Promise.all([
      User.deleteMany({}),
      Profile.deleteMany({}),
      PayInfo.deleteMany({}),
      ProfileConfig.deleteMany({}),
      Template.deleteMany({}),
      Page.deleteMany({}),
      Section.deleteMany({})
    ]);

    console.log('Inserting seed data...');

    // Execute separate seeders
    const payInfo = await seedPayInfo();
    const profileConfig = await seedProfileConfig();

    // Profile doesn't have a user, it relies on payInfo and profileConfig
    const profile = await seedProfile(payInfo._id, profileConfig._id);

    console.log(profile);
    // User references the profile and payInfo
    const user = await seedUser(profile._id, payInfo._id);

    const section = await seedSection();
    const page = await seedPage(section._id);
    const template = await seedTemplate(user._id, page._id);

    console.log('Seeding completed successfully!');
    console.log({
      user: user.email,
      profile: profile.name,
      page: page.name,
    });

    await mongoose.disconnect();
    console.log('Disconnected from the database.');
  } catch (error) {
    console.error('Error during database seeding:', error);
    process.exit(1);
  }
};

seedDatabase();
