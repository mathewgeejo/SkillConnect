import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

// ES Module dirname workaround
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

// Import models
import User from './models/User.model.js';
import Worker from './models/Worker.model.js';
import Employer from './models/Employer.model.js';
import Job from './models/Job.model.js';

// Read JSON data
const workersData = JSON.parse(fs.readFileSync(path.join(__dirname, 'data', 'workers.json'), 'utf-8'));
const employersData = JSON.parse(fs.readFileSync(path.join(__dirname, 'data', 'employers.json'), 'utf-8'));
const jobsData = JSON.parse(fs.readFileSync(path.join(__dirname, 'data', 'jobs.json'), 'utf-8'));

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ MongoDB connected');
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
    process.exit(1);
  }
};

// Seed database
const seedDatabase = async () => {
  try {
    console.log('🌱 Starting database seeding...');

    // Clear existing data
    await User.deleteMany({});
    await Job.deleteMany({});
    console.log('🗑️  Cleared existing data');

    // Hash password for all users
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('password123', salt);

    // Create Workers
    const workers = [];
    for (const workerData of workersData) {
      const worker = await Worker.create({
        ...workerData,
        password: hashedPassword,
        isVerified: true,
        isActive: true
      });
      workers.push(worker);
      console.log(`✅ Created worker: ${worker.name}`);
    }

    // Create Employers
    const employers = [];
    for (const employerData of employersData) {
      const employer = await Employer.create({
        ...employerData,
        password: hashedPassword,
        isVerified: true,
        isActive: true
      });
      employers.push(employer);
      console.log(`✅ Created employer: ${employer.companyName}`);
    }

    // Create Jobs
    const jobs = [];
    for (const jobData of jobsData) {
      const employer = employers.find(e => e.email === jobData.employerEmail);
      if (employer) {
        const job = await Job.create({
          ...jobData,
          employer: employer._id,
          postedBy: employer._id
        });
        jobs.push(job);
        console.log(`✅ Created job: ${job.title}`);
      }
    }

    // Add applications to jobs
    // Job 1 (Electrician) - 3 applications
    if (jobs[0]) {
      jobs[0].applicants = [
        {
          worker: workers[0]._id, // Rajesh Kumar - Electrician
          appliedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
          status: 'pending',
          coverLetter: 'I have 8 years of experience in residential and commercial electrical work. I specialize in wiring, panel installations, and troubleshooting.'
        },
        {
          worker: workers[3]._id, // Amit Sharma - Electrician
          appliedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
          status: 'shortlisted',
          coverLetter: 'Experienced electrician with expertise in industrial setups. I can start immediately.'
        },
        {
          worker: workers[4]._id, // Priya Singh - Plumber
          appliedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
          status: 'rejected',
          coverLetter: 'I have skills in both plumbing and basic electrical work. Can help with the project.'
        }
      ];
      await jobs[0].save();
    }

    // Job 2 (Plumber) - 2 applications
    if (jobs[1]) {
      jobs[1].applicants = [
        {
          worker: workers[1]._id, // Suresh Patel - Plumber
          appliedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
          status: 'pending',
          coverLetter: 'Expert plumber with 10 years experience. Specialized in modern plumbing systems and fixtures.'
        },
        {
          worker: workers[4]._id, // Priya Singh - Plumber
          appliedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
          status: 'shortlisted',
          coverLetter: 'I have extensive experience in residential plumbing projects. Available to start next week.'
        }
      ];
      await jobs[1].save();
    }

    // Job 3 (Carpenter) - 2 applications
    if (jobs[2]) {
      jobs[2].applicants = [
        {
          worker: workers[2]._id, // Vikram Reddy - Carpenter
          appliedAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
          status: 'hired',
          coverLetter: 'Master carpenter with 12 years experience in custom furniture and interior work.'
        },
        {
          worker: workers[5]._id, // Kiran Kumar - Painter
          appliedAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000),
          status: 'rejected',
          coverLetter: 'I can handle both painting and basic carpentry work.'
        }
      ];
      await jobs[2].save();
    }

    console.log('✅ Added applications to jobs');

    console.log('');
    console.log('🎉 Database seeding completed successfully!');
    console.log('');
    console.log('📋 Summary:');
    console.log(`   Workers: ${workers.length}`);
    console.log(`   Employers: ${employers.length}`);
    console.log(`   Jobs: ${jobs.length}`);
    console.log(`   Applications: 7`);
    console.log('');
    console.log('🔑 Login Credentials (all users):');
    console.log('   Password: password123');
    console.log('');
    console.log('👤 Sample Worker Login:');
    console.log(`   Email: ${workers[0].email}`);
    console.log('');
    console.log('🏢 Sample Employer Login:');
    console.log(`   Email: ${employers[0].email}`);
    console.log('');
    console.log('💡 Tip: Login as employer to see job applications in the dashboard!');
    console.log('');

  } catch (error) {
    console.error('❌ Seeding error:', error);
    throw error;
  }
};

// Run seeder
const runSeeder = async () => {
  await connectDB();
  await seedDatabase();
  process.exit(0);
};

runSeeder();
