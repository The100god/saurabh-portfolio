import React, { useContext, useState, useEffect } from 'react';
import { DataContext } from '../../context/DataContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './styles.scss';

const assetContext = require.context('../../assets/image', true, /\.(png|jpe?g|svg)$/);
const assetOptions = assetContext.keys().map((key) => ({
  name: key.replace('./', ''),
  src: assetContext(key),
}));

const AdminPanel = () => {
  const {
    data,
    error,
    useLocalStorage,
    updatePersonalInfo,
    addSkill,
    deleteSkill,
    addPortfolioItem,
    deletePortfolioItem,
    addExperience,
    deleteExperience,
    addEducation,
    deleteEducation,
    addCertificate,
    deleteCertificate,
    uploadImage,
    resetData,
  } = useContext(DataContext);

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(true);
  const [inputPassword, setInputPassword] = useState('');
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [activeTab, setActiveTab] = useState('personal');

  const [newSkill, setNewSkill] = useState({ name: '', level: 50 });
  const [newPortfolioItem, setNewPortfolioItem] = useState({ name: '', link: '', category: 'Featured', image: '' });
  const [newExperience, setNewExperience] = useState({ company: '', position: '', duration: '', description: '' });
  const [newEducation, setNewEducation] = useState({ institution: '', degree: '', year: '', description: '' });
  const [newCertificate, setNewCertificate] = useState({ name: '', issuer: '', date: '', link: '', image: '' });

  const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api/portfolio';

  // Check authentication on mount
  useEffect(() => {
    const isAuth = sessionStorage.getItem('adminAuthenticated') === 'true';
    setIsAuthenticated(isAuth);
    setShowLoginModal(!isAuth);
  }, []);

  // Login Handler
  const handleLogin = async () => {
    if (!inputPassword.trim()) {
      toast.error('Please enter password');
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/verify-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: inputPassword }),
      });

      if (response.ok) {
        sessionStorage.setItem('adminAuthenticated', 'true');
        setIsAuthenticated(true);
        setShowLoginModal(false);
        setInputPassword('');
        toast.success('Access granted!');
      } else {
        toast.error('Invalid password');
        setInputPassword('');
      }
    } catch (err) {
      console.error('Login error:', err);
      toast.error('Login failed');
    }
  };

  // Change Password Handler
  const handleChangePassword = async () => {
    if (!currentPassword.trim()) {
      toast.error('Enter current password');
      return;
    }
    if (!newPassword.trim() || newPassword.length !== 4 || !/^\d+$/.test(newPassword)) {
      toast.error('New password must be 4 digits');
      return;
    }
    if (newPassword !== confirmPassword) {
      toast.error('New password does not match');
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/change-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ currentPassword, newPassword }),
      });

      if (response.ok) {
        toast.success('Password changed successfully!');
        setShowPasswordModal(false);
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
      } else {
        toast.error('Current password is incorrect');
      }
    } catch (err) {
      console.error('Change password error:', err);
      toast.error('Failed to change password');
    }
  };

  // Logout Handler
  const handleLogout = () => {
    sessionStorage.removeItem('adminAuthenticated');
    setIsAuthenticated(false);
    setShowLoginModal(true);
    toast.info('Logged out');
  };

  // Login Modal
  if (showLoginModal && !isAuthenticated) {
    return (
      <section id="admin" className="admin-panel">
        <ToastContainer position="top-right" autoClose={3000} />
        <div className="admin-login-modal">
          <div className="admin-login-modal__content">
            <h2>🔒 Admin Access</h2>
            <p>Enter 4-digit password to access</p>
            <input
              type="password"
              maxLength="4"
              placeholder="0000"
              value={inputPassword}
              onChange={(e) => setInputPassword(e.target.value.replace(/\D/g, ''))}
              onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
              className="admin-login-modal__input"
            />
            <button className="admin-login-modal__btn" onClick={handleLogin}>
              Unlock
            </button>
          </div>
        </div>
      </section>
    );
  }

  // Handlers
  const handlePersonalInfoChange = (field, value) => updatePersonalInfo({ [field]: value });

  const handleSave = (section) => {
    toast.success(`${section} updated successfully!`);
  };

  const handleAddSkill = () => {
    if (newSkill.name.trim()) {
      addSkill(newSkill);
      setNewSkill({ name: '', level: 50 });
      toast.success('Skill added!');
    } else {
      toast.error('Skill name required!');
    }
  };

  const handleAddPortfolioItem = () => {
    if (newPortfolioItem.name.trim() && newPortfolioItem.link.trim()) {
      addPortfolioItem(newPortfolioItem);
      setNewPortfolioItem({ name: '', link: '', category: 'Featured', image: '' });
      toast.success('Portfolio item added!');
    } else {
      toast.error('Name and link required!');
    }
  };

  const handlePortfolioImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;
    const imageUrl = await uploadImage(file);
    if (imageUrl) {
      setNewPortfolioItem((prev) => ({ ...prev, image: imageUrl }));
      toast.success('Project image uploaded.');
    }
  };

  const handleCertificateImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;
    const imageUrl = await uploadImage(file);
    if (imageUrl) {
      setNewCertificate((prev) => ({ ...prev, image: imageUrl }));
      toast.success('Certificate image uploaded.');
    }
  };

  const handleAddExperience = () => {
    if (newExperience.company.trim() && newExperience.position.trim()) {
      addExperience(newExperience);
      setNewExperience({ company: '', position: '', duration: '', description: '' });
      toast.success('Experience added!');
    } else {
      toast.error('Company and position required!');
    }
  };

  const handleAddEducation = () => {
    if (newEducation.institution.trim() && newEducation.degree.trim()) {
      addEducation(newEducation);
      setNewEducation({ institution: '', degree: '', year: '', description: '' });
      toast.success('Education added!');
    } else {
      toast.error('Institution and degree required!');
    }
  };

  const handleAddCertificate = () => {
    if (newCertificate.name.trim() && newCertificate.issuer.trim()) {
      addCertificate(newCertificate);
      setNewCertificate({ name: '', issuer: '', date: '', link: '', image: '' });
      toast.success('Certificate added!');
    } else {
      toast.error('Name and issuer required!');
    }
  };

  const handleResetData = () => {
    if (window.confirm('Are you sure? This will reset all changes to default data.')) {
      resetData();
      toast.info('Data reset to default!');
    }
  };

  // Password Change Modal
  if (showPasswordModal) {
    return (
      <section id="admin" className="admin-panel">
        <ToastContainer position="top-right" autoClose={3000} />
        <div className="admin-login-modal">
          <div className="admin-login-modal__content">
            <h2>🔐 Change Password</h2>
            <input
              type="password"
              placeholder="Current password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value.replace(/\D/g, ''))}
              className="admin-login-modal__input"
              maxLength="4"
            />
            <input
              type="password"
              placeholder="New password (4 digits)"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value.replace(/\D/g, ''))}
              className="admin-login-modal__input"
              maxLength="4"
            />
            <input
              type="password"
              placeholder="Confirm new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value.replace(/\D/g, ''))}
              className="admin-login-modal__input"
              maxLength="4"
            />
            <button className="admin-login-modal__btn" onClick={handleChangePassword}>
              Update Password
            </button>
            <button className="admin-login-modal__btn btn-cancel" onClick={() => setShowPasswordModal(false)}>
              Cancel
            </button>
          </div>
        </div>
      </section>
    );
  }

  // Main Admin Panel
  return (
    <section id="admin" className="admin-panel">
      <ToastContainer position="top-right" autoClose={3000} />

      <div className="admin-panel__container">
        {/* Status Banner */}
        <div className={`admin-panel__status ${useLocalStorage ? 'warning' : 'success'}`}>
          <span className="status-icon">ℹ️</span>
          {useLocalStorage ? (
            <span className="status-text">
              💾 Using <strong>Local Storage</strong> - MongoDB not available. Data will be saved locally.
            </span>
          ) : (
            <span className="status-text">
              ✅ Connected to <strong>MongoDB</strong> - All changes will be saved to database.
            </span>
          )}
        </div>

        {error && (
          <div className="admin-panel__error">
            ⚠️ Error: {error}
          </div>
        )}

        {/* Header with Title and Controls */}
        <div className="admin-panel__header">
          <h1 className="admin-panel__title">Admin Panel</h1>
          <div className="admin-panel__controls">
            <button
              className="admin-panel__settings-btn"
              onClick={() => setShowPasswordModal(true)}
              title="Change password"
            >
              🔐 Settings
            </button>
            <button
              className="admin-panel__logout-btn"
              onClick={handleLogout}
              title="Logout"
            >
              🚪 Logout
            </button>
          </div>
        </div>
        
        <div className="admin-panel__tabs">
          {['personal', 'skills', 'portfolio', 'experience', 'education', 'certificates'].map(tab => (
            <button
              key={tab}
              className={`admin-panel__tab ${activeTab === tab ? 'active' : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </div>

        <div className="admin-panel__content">
          {/* All sections content stays the same as before */}
          {activeTab === 'personal' && (
            <div className="admin-section">
              <h2>Personal Information</h2>
              <div className="admin-form">
                <div className="form-group">
                  <label>Name</label>
                  <input
                    type="text"
                    value={data.personalInfo.name}
                    onChange={(e) => handlePersonalInfoChange('name', e.target.value)}
                    placeholder="Full Name"
                  />
                </div>

                <div className="form-group">
                  <label>Role</label>
                  <input
                    type="text"
                    value={data.personalInfo.role}
                    onChange={(e) => handlePersonalInfoChange('role', e.target.value)}
                    placeholder="Your Role"
                  />
                </div>

                <div className="form-group">
                  <label>Age</label>
                  <input
                    type="text"
                    value={data.personalInfo.age}
                    onChange={(e) => handlePersonalInfoChange('age', e.target.value)}
                    placeholder="Age"
                  />
                </div>

                <div className="form-group">
                  <label>Address</label>
                  <input
                    type="text"
                    value={data.personalInfo.address}
                    onChange={(e) => handlePersonalInfoChange('address', e.target.value)}
                    placeholder="Address"
                  />
                </div>

                <div className="form-group">
                  <label>Email</label>
                  <input
                    type="email"
                    value={data.personalInfo.email}
                    onChange={(e) => handlePersonalInfoChange('email', e.target.value)}
                    placeholder="Email"
                  />
                </div>

                <div className="form-group">
                  <label>Phone</label>
                  <input
                    type="tel"
                    value={data.personalInfo.phone}
                    onChange={(e) => handlePersonalInfoChange('phone', e.target.value)}
                    placeholder="Phone"
                  />
                </div>

                <div className="form-group">
                  <label>LinkedIn</label>
                  <input
                    type="text"
                    value={data.personalInfo.linkedin}
                    onChange={(e) => handlePersonalInfoChange('linkedin', e.target.value)}
                    placeholder="LinkedIn URL"
                  />
                </div>

                <div className="form-group">
                  <label>GitHub</label>
                  <input
                    type="text"
                    value={data.personalInfo.github}
                    onChange={(e) => handlePersonalInfoChange('github', e.target.value)}
                    placeholder="GitHub URL"
                  />
                </div>

                <div className="form-group full-width">
                  <label>Professional Summary</label>
                  <textarea
                    value={data.personalInfo.summary}
                    onChange={(e) => handlePersonalInfoChange('summary', e.target.value)}
                    placeholder="Your professional summary"
                    rows="5"
                  />
                </div>

                <button className="btn-save" onClick={() => handleSave('Personal Info')}>
                  Save Changes
                </button>
              </div>
            </div>
          )}

          {/* SKILLS */}
          {activeTab === 'skills' && (
            <div className="admin-section">
              <h2>Skills</h2>
              <div className="admin-form">
                <div className="add-item-form">
                  <h3>Add New Skill</h3>
                  <div className="form-group">
                    <label>Skill Name</label>
                    <input
                      type="text"
                      value={newSkill.name}
                      onChange={(e) => setNewSkill({ ...newSkill, name: e.target.value })}
                      placeholder="e.g., React"
                    />
                  </div>
                  <div className="form-group">
                    <label>Level (0-100)</label>
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={newSkill.level}
                      onChange={(e) => setNewSkill({ ...newSkill, level: parseInt(e.target.value) })}
                    />
                  </div>
                  <button className="btn-add" onClick={handleAddSkill}>
                    Add Skill
                  </button>
                </div>

                <h3>Existing Skills</h3>
                <div className="items-list">
                  {data.skills.map(skill => (
                    <div key={skill.id} className="item-card">
                      <div className="item-info">
                        <h4>{skill.name}</h4>
                        <p>Level: {skill.level}%</p>
                      </div>
                      <button
                        className="btn-delete"
                        onClick={() => {
                          deleteSkill(skill.id);
                          toast.success('Skill deleted!');
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* PORTFOLIO */}
          {activeTab === 'portfolio' && (
            <div className="admin-section">
              <h2>Portfolio</h2>
              <div className="admin-form">
                <div className="add-item-form">
                  <h3>Add New Project</h3>
                  <div className="form-group">
                    <label>Project Name</label>
                    <input
                      type="text"
                      value={newPortfolioItem.name}
                      onChange={(e) => setNewPortfolioItem({ ...newPortfolioItem, name: e.target.value })}
                      placeholder="Project name"
                    />
                  </div>
                  <div className="form-group">
                    <label>Project Link</label>
                    <input
                      type="text"
                      value={newPortfolioItem.link}
                      onChange={(e) => setNewPortfolioItem({ ...newPortfolioItem, link: e.target.value })}
                      placeholder="https://..."
                    />
                  </div>
                  <div className="form-group">
                    <label>Category</label>
                    <select
                      value={newPortfolioItem.category}
                      onChange={(e) => setNewPortfolioItem({ ...newPortfolioItem, category: e.target.value })}
                    >
                      <option value="Featured">Featured</option>
                      <option value="Web">Web</option>
                      <option value="Mobile">Mobile</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Choose Image from Assets</label>
                    <select
                      value={newPortfolioItem.image}
                      onChange={(e) => setNewPortfolioItem({ ...newPortfolioItem, image: e.target.value })}
                    >
                      <option value="">Select asset image</option>
                      {assetOptions.map((asset) => (
                        <option key={asset.name} value={asset.src}>
                          {asset.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Upload Project Image</label>
                    <input type="file" accept="image/*" onChange={handlePortfolioImageUpload} />
                  </div>
                  {newPortfolioItem.image && (
                    <div className="form-group preview-image">
                      <label>Preview</label>
                      <img src={newPortfolioItem.image} alt={newPortfolioItem.name || 'Preview'} />
                    </div>
                  )}
                  <button className="btn-add" onClick={handleAddPortfolioItem}>
                    Add Project
                  </button>
                </div>

                <h3>Existing Projects</h3>
                <div className="items-list">
                  {data.portfolio.map(item => (
                    <div key={item.id} className="item-card">
                      <div className="item-info">
                        <h4>{item.name}</h4>
                        <p><a href={item.link} target="_blank" rel="noopener noreferrer">{item.link}</a></p>
                        <span className="category">{item.category}</span>
                      </div>
                      <button
                        className="btn-delete"
                        onClick={() => {
                          deletePortfolioItem(item.id);
                          toast.success('Project deleted!');
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* EXPERIENCE */}
          {activeTab === 'experience' && (
            <div className="admin-section">
              <h2>Experience</h2>
              <div className="admin-form">
                <div className="add-item-form">
                  <h3>Add New Experience</h3>
                  <div className="form-group">
                    <label>Company</label>
                    <input
                      type="text"
                      value={newExperience.company}
                      onChange={(e) => setNewExperience({ ...newExperience, company: e.target.value })}
                      placeholder="Company name"
                    />
                  </div>
                  <div className="form-group">
                    <label>Position</label>
                    <input
                      type="text"
                      value={newExperience.position}
                      onChange={(e) => setNewExperience({ ...newExperience, position: e.target.value })}
                      placeholder="Job position"
                    />
                  </div>
                  <div className="form-group">
                    <label>Duration</label>
                    <input
                      type="text"
                      value={newExperience.duration}
                      onChange={(e) => setNewExperience({ ...newExperience, duration: e.target.value })}
                      placeholder="e.g., 2023-Present"
                    />
                  </div>
                  <div className="form-group full-width">
                    <label>Description</label>
                    <textarea
                      value={newExperience.description}
                      onChange={(e) => setNewExperience({ ...newExperience, description: e.target.value })}
                      placeholder="Job description"
                      rows="3"
                    />
                  </div>
                  <button className="btn-add" onClick={handleAddExperience}>
                    Add Experience
                  </button>
                </div>

                <h3>Existing Experience</h3>
                <div className="items-list">
                  {data.experience.map(exp => (
                    <div key={exp.id} className="item-card">
                      <div className="item-info">
                        <h4>{exp.position} at {exp.company}</h4>
                        <p className="duration">{exp.duration}</p>
                        <p>{exp.description}</p>
                      </div>
                      <button
                        className="btn-delete"
                        onClick={() => {
                          deleteExperience(exp.id);
                          toast.success('Experience deleted!');
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* EDUCATION */}
          {activeTab === 'education' && (
            <div className="admin-section">
              <h2>Education</h2>
              <div className="admin-form">
                <div className="add-item-form">
                  <h3>Add New Education</h3>
                  <div className="form-group">
                    <label>Institution</label>
                    <input
                      type="text"
                      value={newEducation.institution}
                      onChange={(e) => setNewEducation({ ...newEducation, institution: e.target.value })}
                      placeholder="Institution name"
                    />
                  </div>
                  <div className="form-group">
                    <label>Degree</label>
                    <input
                      type="text"
                      value={newEducation.degree}
                      onChange={(e) => setNewEducation({ ...newEducation, degree: e.target.value })}
                      placeholder="e.g., Bachelor of Science"
                    />
                  </div>
                  <div className="form-group">
                    <label>Year</label>
                    <input
                      type="text"
                      value={newEducation.year}
                      onChange={(e) => setNewEducation({ ...newEducation, year: e.target.value })}
                      placeholder="e.g., 2023"
                    />
                  </div>
                  <div className="form-group full-width">
                    <label>Description</label>
                    <textarea
                      value={newEducation.description}
                      onChange={(e) => setNewEducation({ ...newEducation, description: e.target.value })}
                      placeholder="Education details"
                      rows="3"
                    />
                  </div>
                  <button className="btn-add" onClick={handleAddEducation}>
                    Add Education
                  </button>
                </div>

                <h3>Existing Education</h3>
                <div className="items-list">
                  {data.education.map(edu => (
                    <div key={edu.id} className="item-card">
                      <div className="item-info">
                        <h4>{edu.degree} from {edu.institution}</h4>
                        <p className="year">{edu.year}</p>
                        <p>{edu.description}</p>
                      </div>
                      <button
                        className="btn-delete"
                        onClick={() => {
                          deleteEducation(edu.id);
                          toast.success('Education deleted!');
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* CERTIFICATES */}
          {activeTab === 'certificates' && (
            <div className="admin-section">
              <h2>Certificates</h2>
              <div className="admin-form">
                <div className="add-item-form">
                  <h3>Add New Certificate</h3>
                  <div className="form-group">
                    <label>Certificate Name</label>
                    <input
                      type="text"
                      value={newCertificate.name}
                      onChange={(e) => setNewCertificate({ ...newCertificate, name: e.target.value })}
                      placeholder="Certificate name"
                    />
                  </div>
                  <div className="form-group">
                    <label>Issuer</label>
                    <input
                      type="text"
                      value={newCertificate.issuer}
                      onChange={(e) => setNewCertificate({ ...newCertificate, issuer: e.target.value })}
                      placeholder="Issuing organization"
                    />
                  </div>
                  <div className="form-group">
                    <label>Date Issued</label>
                    <input
                      type="text"
                      value={newCertificate.date}
                      onChange={(e) => setNewCertificate({ ...newCertificate, date: e.target.value })}
                      placeholder="e.g., 2023"
                    />
                  </div>
                  <div className="form-group">
                    <label>Upload Certificate Image</label>
                    <input type="file" accept="image/*" onChange={handleCertificateImageUpload} />
                  </div>
                  {newCertificate.image && (
                    <div className="form-group preview-image">
                      <label>Preview</label>
                      <img src={newCertificate.image} alt={newCertificate.name || 'Certificate Preview'} />
                    </div>
                  )}
                  <div className="form-group full-width">
                    <label>Certificate Link (Optional)</label>
                    <input
                      type="text"
                      value={newCertificate.link}
                      onChange={(e) => setNewCertificate({ ...newCertificate, link: e.target.value })}
                      placeholder="https://..."
                    />
                  </div>
                  <button className="btn-add" onClick={handleAddCertificate}>
                    Add Certificate
                  </button>
                </div>

                <h3>Existing Certificates</h3>
                <div className="items-list">
                  {data.certificates.map(cert => (
                    <div key={cert.id} className="item-card">
                      <div className="item-info">
                        <h4>{cert.name}</h4>
                        <p>Issued by: {cert.issuer}</p>
                        <p>Date: {cert.date}</p>
                        {cert.link && <p><a href={cert.link} target="_blank" rel="noopener noreferrer">View Certificate</a></p>}
                      </div>
                      <button
                        className="btn-delete"
                        onClick={() => {
                          deleteCertificate(cert.id);
                          toast.success('Certificate deleted!');
                        }}
                      >
                        Delete
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="admin-panel__footer">
          <button className="btn-reset" onClick={handleResetData}>
            Reset to Default
          </button>
        </div>
      </div>
    </section>
  );
};

export default AdminPanel;
