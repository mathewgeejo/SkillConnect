/* 
 * QUICK GUIDE: Adding New Jobs
 * 
 * 1. Copy one of the job templates below
 * 2. Modify the fields with your job details
 * 3. Add it to the array in jobs.json
 * 4. Run: npm run seed
 * 
 * IMPORTANT: Make sure employerEmail matches an employer in employers.json
 */

// ============================================
// JOB TEMPLATE 1: Hourly Contract Work
// ============================================
const hourlyContractJob = {
  "title": "Your Job Title Here",
  "description": "Detailed description of the work required, expectations, and project details",
  "category": "electrical",  // OPTIONS: construction, plumbing, electrical, carpentry, painting, welding, masonry, landscaping, cleaning, other
  "employerEmail": "hr@techsolutions.com",  // Must match an employer email
  "location": {
    "address": "Full Address Here",
    "city": "City Name",
    "state": "Kerala",
    "pincode": "682042",
    "coordinates": [76.3464, 10.0164]  // [longitude, latitude] - Get from Google Maps
  },
  "salary": {
    "amount": 600,
    "type": "hourly"  // OPTIONS: hourly, daily, weekly, monthly, fixed
  },
  "jobType": "contract",  // OPTIONS: full-time, part-time, contract, temporary
  "duration": { 
    "value": 3,  // Number
    "unit": "months"  // OPTIONS: days, weeks, months
  },
  "skills": ["Skill 1", "Skill 2", "Skill 3"],
  "requirements": {
    "experience": 5,  // Years
    "education": "ITI or Diploma",  // Optional
    "certifications": ["Certificate Name"]  // Optional
  },
  "status": "open",
  "startDate": "2026-03-01",
  "urgency": "high"  // OPTIONS: high, medium, low
};

// ============================================
// JOB TEMPLATE 2: Fixed Price Project
// ============================================
const fixedPriceProject = {
  "title": "Complete Home Renovation",
  "description": "Full home renovation including painting, electrical, and carpentry work",
  "category": "construction",
  "employerEmail": "info@greenhomes.com",
  "location": {
    "address": "Model Town, Ernakulam",
    "city": "Kochi",
    "state": "Kerala",
    "pincode": "682021",
    "coordinates": [76.2999, 9.9816]
  },
  "salary": {
    "amount": 150000,
    "type": "fixed"
  },
  "jobType": "contract",
  "duration": { 
    "value": 2,
    "unit": "months"
  },
  "skills": ["Painting", "Electrical", "Carpentry"],
  "requirements": {
    "experience": 10
  },
  "status": "open",
  "startDate": "2026-03-15",
  "urgency": "medium"
};

// ============================================
// JOB TEMPLATE 3: Daily Wage Work
// ============================================
const dailyWageWork = {
  "title": "Construction Site Helper",
  "description": "Daily wage work at construction site for general labor and assistance",
  "category": "construction",
  "employerEmail": "info@greenhomes.com",
  "location": {
    "address": "Construction Site, Kakkanad",
    "city": "Kochi",
    "state": "Kerala",
    "pincode": "682030",
    "coordinates": [76.3469, 10.0196]
  },
  "salary": {
    "amount": 800,
    "type": "daily"
  },
  "jobType": "temporary",
  "duration": { 
    "value": 30,
    "unit": "days"
  },
  "skills": ["Physical Labor", "Construction Knowledge"],
  "requirements": {
    "experience": 1
  },
  "status": "open",
  "startDate": "2026-02-10",
  "urgency": "high"
};

// ============================================
// JOB TEMPLATE 4: Full-Time Monthly Salary
// ============================================
const fullTimeMonthly = {
  "title": "Facilities Manager",
  "description": "Full-time facilities manager for shopping mall. Responsible for coordinating all maintenance work",
  "category": "other",
  "employerEmail": "facilities@citymall.com",
  "location": {
    "address": "City Mall, Kowdiar",
    "city": "Thiruvananthapuram",
    "state": "Kerala",
    "pincode": "695003",
    "coordinates": [76.9875, 8.5241]
  },
  "salary": {
    "amount": 35000,
    "type": "monthly"
  },
  "jobType": "full-time",
  "duration": { 
    "value": 12,
    "unit": "months"
  },
  "skills": ["Management", "Coordination", "Maintenance"],
  "requirements": {
    "experience": 8,
    "education": "Diploma or Degree",
    "certifications": ["Facilities Management"]
  },
  "status": "open",
  "startDate": "2026-03-01",
  "urgency": "low"
};

// ============================================
// COPY INSTRUCTIONS
// ============================================
/*
To use these templates:
1. Copy the entire object (without the const declaration)
2. Paste into jobs.json array
3. Update all fields with your data
4. Make sure to add a comma after the previous job
5. Run: npm run seed

Example:
[
  {
    // existing job
  },
  {
    // paste your new job here
  }
]
*/

// ============================================
// CATEGORY OPTIONS
// ============================================
// - construction
// - plumbing
// - electrical
// - carpentry
// - painting
// - welding
// - masonry
// - landscaping
// - cleaning
// - other

// ============================================
// PROFESSION EXAMPLES
// ============================================
// Electrician, Plumber, Carpenter, Painter, Mason, Welder
// AC Technician, CCTV Installer, Home Appliance Repair
// Gardener, Landscaper, Cleaner, Driver
// Construction Worker, Site Supervisor, Labor Contractor

// ============================================
// KERALA CITIES WITH COORDINATES
// ============================================
// Kochi (Ernakulam): [76.2673, 9.9312]
// Thiruvananthapuram: [76.9558, 8.5241]
// Kozhikode: [75.7804, 11.2588]
// Thrissur: [76.2144, 10.5276]
// Kottayam: [76.5222, 9.5916]
// Kannur: [75.3704, 11.8745]
// Kollam: [76.6141, 8.8932]
// Palakkad: [76.6547, 10.7867]
// Alappuzha: [76.3388, 9.4981]
// Malappuram: [76.0742, 11.0510]

export { hourlyContractJob, fixedPriceProject, dailyWageWork, fullTimeMonthly };

