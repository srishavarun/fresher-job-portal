require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
const Job = require('./models/Job');
const Application = require('./models/Application');

const accounts = [
  { name: 'Demo Student Varun', email: 'student@demo.com', password: 'Student@123', role: 'student' },
  { name: 'Demo Student Ananya', email: 'ananya@demo.com', password: 'Student@123', role: 'student' },
  { name: 'Demo Student Rahul', email: 'rahul@demo.com', password: 'Student@123', role: 'student' },
  { name: 'Demo Recruiter Priya', email: 'recruiter@demo.com', password: 'Recruiter@123', role: 'recruiter' },
  { name: 'Demo Recruiter Kiran', email: 'kiran@demo.com', password: 'Recruiter@123', role: 'recruiter' }
];
const jobs = [
  ['Junior Java Developer','ABC Technologies','Bengaluru','Full-time','₹3.6 LPA','Entry-level Java development, SQL, and REST APIs.', 'recruiter@demo.com'],
  ['React Developer','Tech Solutions','Mysuru','Full-time','₹4.2 LPA','Build responsive user interfaces with React and JavaScript.', 'recruiter@demo.com'],
  ['Python Developer Intern','Innovate Software','Bengaluru','Internship','₹20,000/month','Assist with Python APIs, scripts, and MongoDB.', 'recruiter@demo.com'],
  ['MERN Stack Developer','NextGen IT','Hyderabad','Full-time','₹4.8 LPA','Develop applications with MongoDB, Express, React and Node.js.', 'recruiter@demo.com'],
  ['QA Testing Engineer','QualityTech','Chennai','Full-time','₹3 LPA','Write test cases and perform manual and automated testing.', 'kiran@demo.com'],
  ['Data Analyst Intern','Insight Labs','Remote','Internship','₹18,000/month','Analyze sample datasets using Excel, SQL and Python.', 'kiran@demo.com'],
  ['Frontend Developer Intern','PixelWorks','Bengaluru','Internship','₹15,000/month','Build HTML, CSS, JavaScript and React components.', 'kiran@demo.com'],
  ['Node.js Backend Developer','CloudNova','Pune','Full-time','₹4 LPA','Create REST APIs, authentication and database queries.', 'kiran@demo.com']
];
async function main() {
  if (!process.env.MONGO_URI) throw new Error('Set MONGO_URI in backend/.env');
  await mongoose.connect(process.env.MONGO_URI);
  const users = {};
  for (const a of accounts) {
    let user = await User.findOne({ email: a.email });
    if (!user) user = await User.create({ name:a.name, email:a.email, role:a.role, password:await bcrypt.hash(a.password,12) });
    else if (user.role !== a.role) throw new Error(`Email ${a.email} exists with a different role; change demo email`);
    users[a.email] = user;
  }
  const createdJobs = [];
  for (const [title,company,location,type,salary,description,recruiterEmail] of jobs) {
    const recruiter = users[recruiterEmail];
    let job = await Job.findOne({title,company,recruiter:recruiter._id});
    if (!job) job = await Job.create({title,company,location,type,salary,description,recruiter:recruiter._id});
    createdJobs.push(job);
  }
  const examples = [
    [0,'student@demo.com','Applied'], [1,'student@demo.com','Reviewed'],
    [2,'student@demo.com','Accepted'], [3,'ananya@demo.com','Applied'],
    [4,'ananya@demo.com','Rejected'], [5,'rahul@demo.com','Reviewed'],
    [6,'rahul@demo.com','Accepted'], [7,'student@demo.com','Applied']
  ];
  for (const [index,email,status] of examples) {
    const job=createdJobs[index], student=users[email];
    await Application.updateOne({job:job._id,student:student._id},{$setOnInsert:{coverLetter:`I am interested in the ${job.title} role and would like to apply.`,status}},{upsert:true});
  }
  console.log('Demo data ready: 5 users, 8 jobs, 8 sample applications (existing records preserved).');
  console.log('Student: student@demo.com / Student@123');
  console.log('Recruiter: recruiter@demo.com / Recruiter@123');
}
main().catch(e=>{console.error('Demo seed failed:',e.message);process.exitCode=1}).finally(()=>mongoose.disconnect());
