#!/usr/bin/env node

/*
 * Quick Add Job Script
 * 
 * This script helps you quickly add a new job without manually editing JSON
 * 
 * Usage: node add-job.js
 */

import readline from 'readline';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const question = (query) => new Promise((resolve) => rl.question(query, resolve));

const categories = ['construction', 'plumbing', 'electrical', 'carpentry', 'painting', 'welding', 'masonry', 'landscaping', 'cleaning', 'other'];
const jobTypes = ['full-time', 'part-time', 'contract', 'temporary'];
const salaryTypes = ['hourly', 'daily', 'weekly', 'monthly', 'fixed'];
const urgencyLevels = ['high', 'medium', 'low'];

async function addJob() {
  console.log('\n🎯 Quick Add New Job\n');
  console.log('Press Ctrl+C anytime to cancel\n');

  try {
    // Read existing jobs
    const jobsPath = path.join(__dirname, 'jobs.json');
    const jobsData = JSON.parse(fs.readFileSync(jobsPath, 'utf-8'));

    // Read employers to show options
    const employersPath = path.join(__dirname, 'employers.json');
    const employers = JSON.parse(fs.readFileSync(employersPath, 'utf-8'));

    console.log('📧 Available Employers:');
    employers.forEach((emp, idx) => {
      console.log(`   ${idx + 1}. ${emp.companyName} (${emp.email})`);
    });
    console.log('');

    const employerChoice = await question('Select employer number (1-3): ');
    const employer = employers[parseInt(employerChoice) - 1];

    if (!employer) {
      console.log('❌ Invalid employer selection');
      rl.close();
      return;
    }

    const title = await question('Job Title: ');
    const description = await question('Description: ');

    console.log(`\n📂 Categories: ${categories.join(', ')}`);
    const category = await question('Category: ');

    const city = await question('City (e.g., Kochi): ');
    const address = await question('Address: ');

    console.log(`\n💰 Salary Types: ${salaryTypes.join(', ')}`);
    const salaryType = await question('Salary Type: ');
    const salaryAmount = await question('Salary Amount (₹): ');

    console.log(`\n📋 Job Types: ${jobTypes.join(', ')}`);
    const jobType = await question('Job Type: ');

    const duration = await question('Duration (e.g., 2): ');
    const durationUnit = await question('Duration Unit (days/weeks/months): ');

    const skillsInput = await question('Skills (comma-separated): ');
    const skills = skillsInput.split(',').map(s => s.trim());

    const experience = await question('Experience Required (years): ');

    console.log(`\n⚡ Urgency: ${urgencyLevels.join(', ')}`);
    const urgency = await question('Urgency: ');

    const startDate = await question('Start Date (YYYY-MM-DD): ');

    // Create new job object
    const newJob = {
      title,
      description,
      category: category || 'other',
      employerEmail: employer.email,
      location: {
        address,
        city,
        state: 'Kerala',
        pincode: employer.location.pincode,
        coordinates: employer.location.coordinates
      },
      salary: {
        amount: parseInt(salaryAmount),
        type: salaryType
      },
      jobType,
      duration: {
        value: parseInt(duration),
        unit: durationUnit
      },
      skills,
      requirements: {
        experience: parseInt(experience) || 0
      },
      status: 'open',
      startDate,
      urgency: urgency || 'medium'
    };

    // Add to jobs array
    jobsData.push(newJob);

    // Write back to file
    fs.writeFileSync(jobsPath, JSON.stringify(jobsData, null, 2));

    console.log('\n✅ Job added successfully to jobs.json!');
    console.log('📝 Run "npm run seed" to update the database');
    console.log('');

  } catch (error) {
    console.error('\n❌ Error:', error.message);
  }

  rl.close();
}

addJob();
