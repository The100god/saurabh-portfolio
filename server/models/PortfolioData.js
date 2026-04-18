const mongoose = require('mongoose');

const portfolioDataSchema = new mongoose.Schema(
  {
    personalInfo: {
      name: { type: String, default: "Saurabh Goyal" },
      role: { type: String, default: "Front End Developer" },
      age: { type: String, default: "25" },
      address: { type: String, default: "Jodhpur, Rajasthan" },
      email: { type: String, default: "saurabhgoyal8055@gmail.com" },
      phone: { type: String, default: "+91-8302443507" },
      linkedin: { type: String, default: "https://www.linkedin.com/in/saurabh-goyal-9311b2216/" },
      github: { type: String, default: "https://github.com/the100god" },
      summary: {
        type: String,
        default:
          "Frontend Developer building modern, interactive, and performance-driven web applications with React and Next.js. Proficient in HTML, CSS, JavaScript, and responsive design principles to create seamless user experiences across devices. Skilled in collaborating with cross-functional teams to deliver high-quality software solutions. Passionate about staying updated with the latest industry trends and continuously improving development skills.",
      },
    },
    skills: [
      {
        _id: mongoose.Schema.Types.ObjectId,
        name: String,
        level: Number,
      },
    ],
    portfolio: [
      {
        _id: mongoose.Schema.Types.ObjectId,
        name: String,
        link: String,
        category: String,
        image: String,
      },
    ],
    experience: [
      {
        _id: mongoose.Schema.Types.ObjectId,
        company: String,
        position: String,
        duration: String,
        description: String,
      },
    ],
    education: [
      {
        _id: mongoose.Schema.Types.ObjectId,
        institution: String,
        degree: String,
        year: String,
        description: String,
      },
    ],
    certificates: [
      {
        _id: mongoose.Schema.Types.ObjectId,
        name: String,
        issuer: String,
        date: String,
        link: String,
        image: String,
      },
    ],    adminPassword: {
      type: String,
      default: '0000',
    },  },
  { timestamps: true }
);

module.exports = mongoose.model('PortfolioData', portfolioDataSchema);
