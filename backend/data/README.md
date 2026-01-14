# SkillConnect - Dummy Data & Seeder Guide

## 📋 Overview

This directory contains JSON files with realistic dummy data that can be used to populate the database. The seeder script automatically reads these files and creates all necessary records in MongoDB.

## 🗂️ Available Data Files

### 1. workers.json
Contains 6 skilled workers with different professions:
- Electrician
- Plumber
- Carpenter
- Painter
- Mason
- AC Technician

Each worker has:
- Contact details (name, email, phone)
- Profession and skills
- Experience level
- Hourly rates
- Location with coordinates
- Availability status

### 2. employers.json
Contains 3 employers/companies:
- Tech Solutions Pvt Ltd (IT company)
- Green Homes Builders (Construction)
- City Mall Management (Retail)

Each employer has:
- Company details
- Industry and size
- Location
- Description

### 3. jobs.json
Contains 6 job postings across different categories:
- Electrician for Office Renovation
- Plumber for Residential Complex
- Carpenter for Custom Furniture
- Painter for Mall Maintenance
- AC Technician for Maintenance
- Mason for Foundation Work

Each job has:
- Title and description
- Category and requirements
- Salary details (hourly/daily/monthly)
- Location
- Skills required
- Experience needed
- Duration and urgency

## 🚀 How to Use

### Quick Add Job (Interactive)

```bash
# From backend/data directory
node add-job.js
```

This interactive script will:
- Show available employers
- Ask for job details
- Automatically add to jobs.json
- Remind you to run seeder

### Running the Seeder

```bash
# From the backend directory
npm run seed

# Or directly
node seeder.js
```

The seeder will:
1. ✅ Connect to MongoDB
2. 🗑️ Clear existing data (Workers, Employers, Jobs)
3. ✅ Create all workers
4. ✅ Create all employers
5. ✅ Create all jobs (linked to employers)
6. 📋 Show summary of created records

### Login Credentials

**Password for ALL users:** `password123`

**Sample Worker Logins:**
- rajesh.electrician@gmail.com
- suresh.plumber@gmail.com
- anitha.carpenter@gmail.com
- ashraf.painter@gmail.com
- vineeth.mason@gmail.com
- lakshmi.ac@gmail.com

**Sample Employer Logins:**
- hr@techsolutions.com
- info@greenhomes.com
- facilities@citymall.com

## ✏️ Adding More Data

### 📋 Quick Steps to Add Jobs:

1. **Open** `backend/data/jobs.json`
2. **Copy** the job template from `job-templates.js` 
3. **Modify** the fields with your details
4. **Add** it to the jobs array (don't forget the comma!)
5. **Run** `npm run seed` from backend directory
6. **Done!** Your new job is now in the database

### To Add New Workers:

Edit `workers.json` and add new entries following this format:

```json
{
  "name": "Your Name",
  "email": "your.email@gmail.com",
  "phone": "9876543216",
  "password": "password123",
  "role": "worker",
  "profession": "Your Profession",
  "skills": ["Skill 1", "Skill 2", "Skill 3"],
  "experience": 5,
  "bio": "Your professional bio",
  "location": {
    "address": "Your Address",
    "city": "City Name",
    "state": "Kerala",
    "pincode": "686001",
    "coordinates": [76.5222, 9.5916]
  },
  "hourlyRate": 500,
  "availability": {
    "status": "available",
    "workingHours": { "start": "09:00", "end": "18:00" },
    "workingDays": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"]
  }
}
```

### To Add New Employers:

Edit `employers.json` and add:

```json
{
  "name": "Company Name",
  "email": "company@email.com",
  "phone": "9876543223",
  "password": "password123",
  "role": "employer",
  "companyName": "Company Name",
  "companyType": "company",
  "description": "Company description",
  "industry": "Industry",
  "companySize": "20-50",
  "website": "https://company.com",
  "location": {
    "address": "Company Address",
    "city": "City",
    "state": "Kerala",
    "pincode": "682001",
    "coordinates": [76.2144, 10.5276]
  }
}
```

### To Add New Jobs:

**Option 1: Copy from Template File**
1. Open `job-templates.js` for ready-to-use templates
2. Copy the template that matches your needs
3. Paste into `jobs.json` array
4. Update all fields
5. Run `npm run seed`

**Option 2: Manual Entry**

Edit `jobs.json` and add:

```json
{
  "title": "Job Title",
  "description": "Detailed job description",
  "category": "electrical",
  "employerEmail": "employer@email.com",
  "location": {
    "address": "Job Location",
    "city": "City",
    "state": "Kerala",
    "pincode": "682042",
    "coordinates": [76.3464, 10.0164]
  },
  "salary": {
    "amount": 650,
    "type": "hourly"
  },
  "jobType": "contract",
  "duration": { "value": 2, "unit": "months" },
  "skills": ["Skill 1", "Skill 2"],
  "requirements": {
    "experience": 5,
    "education": "ITI or Diploma",
    "certifications": ["Certificate Name"]
  },
  "status": "open",
  "startDate": "2026-02-01",
  "urgency": "high"
}
```

### Important Notes:

1. **Coordinates:** Use [longitude, latitude] format (find on Google Maps)
2. **Job Categories:** Must be one of: construction, plumbing, electrical, carpentry, painting, welding, masonry, landscaping, cleaning, other
3. **Company Types:** individual, company, contractor, agency
4. **Job Types:** full-time, part-time, contract, temporary
5. **Salary Types:** hourly, daily, weekly, monthly, fixed
6. **Urgency:** high, medium, low
7. **Phone:** Must be exactly 10 digits

## 🔄 Re-seeding Database

Run the seeder again to:
- Reset the database to original state
- Add new data you've added to JSON files
- Clear test data

⚠️ **Warning:** Re-running will delete ALL existing data!

## 📊 Current Data Summary

- **Workers:** 6 skilled workers across Kerala
- **Employers:** 3 companies
- **Jobs:** 6 active job postings
- **Locations:** Kochi, Kozhikode, Kottayam, Thiruvananthapuram, Thrissur, Kannur

## 🎯 Next Steps

After seeding:
1. Login with any worker/employer account
2. Browse jobs as a worker
3. Post new jobs as an employer
4. Apply for jobs
5. Leave reviews
6. Test all features!

Happy Testing! 🚀
