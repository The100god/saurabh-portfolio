import React, { createContext, useState, useEffect } from 'react';
import {resumeData} from '../containers/Resume/utils';

export const DataContext = createContext();

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api/portfolio';

const defaultData = {
  personalInfo: {
    name: "Saurabh Goyal",
    role: "Front End Developer",
    age: "25",
    address: "Jodhpur, Rajasthan",
    email: "saurabhgoyal8055@gmail.com",
    linkedin: "https://www.linkedin.com/in/saurabh-goyal-9311b2216/",
    github: "https://github.com/the100god",
    phone: "+91-8302443507",
    summary: "Frontend Developer building modern, interactive, and performance-driven web applications with React and Next.js. Proficient in HTML, CSS, JavaScript, and responsive design principles to create seamless user experiences across devices. Skilled in collaborating with cross-functional teams to deliver high-quality software solutions. Passionate about staying updated with the latest industry trends and continuously improving development skills.",
  },
  skills: [],
  portfolio: [],
  experience: [...resumeData.experience],
  education: [],
  certificates: [],
};

export const DataProvider = ({ children }) => {
  const [data, setData] = useState(defaultData);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [useLocalStorage, setUseLocalStorage] = useState(false);
console.log('data context', data);
  // Fetch data from MongoDB on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/data`);
        if (response.ok) {
          const fetchedData = await response.json();
          // Convert MongoDB _id to id for easier handling
          const processedData = {
            personalInfo: fetchedData.personalInfo || defaultData.personalInfo,
            skills: (fetchedData.skills || []).map(item => ({
              ...item,
              id: item._id,
            })),
            portfolio: (fetchedData.portfolio || []).map(item => ({
              ...item,
              id: item._id,
            })),
            experience: (fetchedData.experience || []).map(item => ({
              ...item,
              id: item._id,
            })),
            education: (fetchedData.education || []).map(item => ({
              ...item,
              id: item._id,
            })),
            certificates: (fetchedData.certificates || []).map(item => ({
              ...item,
              id: item._id,
            })),
          };
          setData(processedData);
          setError(null);
        }
      } catch (err) {
        console.warn('MongoDB not available, using localStorage:', err.message);
        setUseLocalStorage(true);
        // Fallback to localStorage
        const stored = localStorage.getItem('portfolioData');
        if (stored) {
          try {
            setData(JSON.parse(stored));
          } catch (error) {
            console.error('Error loading localStorage:', error);
          }
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // Update Personal Info
  const updatePersonalInfo = async (updatedInfo) => {
    try {
      if (useLocalStorage) {
        setData(prev => ({
          ...prev,
          personalInfo: { ...prev.personalInfo, ...updatedInfo }
        }));
        return;
      }

      const response = await fetch(`${API_BASE_URL}/personal-info`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedInfo),
      });

      if (response.ok) {
        const updatedData = await response.json();
        setData(prev => ({
          ...prev,
          personalInfo: updatedData.personalInfo,
        }));
      }
    } catch (err) {
      console.error('Error updating personal info:', err);
      setError(err.message);
    }
  };

  // Add Skill
  const addSkill = async (skill) => {
    try {
      if (useLocalStorage) {
        setData(prev => ({
          ...prev,
          skills: [...prev.skills, { ...skill, id: Date.now() }]
        }));
        return;
      }

      const response = await fetch(`${API_BASE_URL}/skills`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(skill),
      });

      if (response.ok) {
        const updatedData = await response.json();
        setData(prev => ({
          ...prev,
          skills: (updatedData.skills || []).map(item => ({
            ...item,
            id: item._id,
          })),
        }));
      }
    } catch (err) {
      console.error('Error adding skill:', err);
      setError(err.message);
    }
  };

  // Delete Skill
  const deleteSkill = async (id) => {
    try {
      if (useLocalStorage) {
        setData(prev => ({
          ...prev,
          skills: prev.skills.filter(skill => skill.id !== id)
        }));
        return;
      }

      // Find MongoDB _id
      const mongoId = data.skills.find(s => s.id === id)?._id || id;
      const response = await fetch(`${API_BASE_URL}/skills/${mongoId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        const updatedData = await response.json();
        setData(prev => ({
          ...prev,
          skills: (updatedData.skills || []).map(item => ({
            ...item,
            id: item._id,
          })),
        }));
      }
    } catch (err) {
      console.error('Error deleting skill:', err);
      setError(err.message);
    }
  };

  // Update Skills
  const updateSkills = async (updatedSkills) => {
    try {
      if (useLocalStorage) {
        setData(prev => ({
          ...prev,
          skills: updatedSkills
        }));
        return;
      }

      const response = await fetch(`${API_BASE_URL}/skills`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedSkills),
      });

      if (response.ok) {
        const updatedData = await response.json();
        setData(prev => ({
          ...prev,
          skills: (updatedData.skills || []).map(item => ({
            ...item,
            id: item._id,
          })),
        }));
      }
    } catch (err) {
      console.error('Error updating skills:', err);
      setError(err.message);
    }
  };

  // Add Portfolio Item
  const addPortfolioItem = async (item) => {
    try {
      if (useLocalStorage) {
        setData(prev => ({
          ...prev,
          portfolio: [...prev.portfolio, { ...item, id: Date.now() }]
        }));
        return;
      }

      const response = await fetch(`${API_BASE_URL}/portfolio`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(item),
      });

      if (response.ok) {
        const updatedData = await response.json();
        setData(prev => ({
          ...prev,
          portfolio: (updatedData.portfolio || []).map(item => ({
            ...item,
            id: item._id,
          })),
        }));
      }
    } catch (err) {
      console.error('Error adding portfolio item:', err);
      setError(err.message);
    }
  };

  // Upload Image
  const uploadImage = async (file) => {
    try {
      if (useLocalStorage) {
        return await new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result);
          reader.onerror = reject;
          reader.readAsDataURL(file);
        });
      }

      const formData = new FormData();
      formData.append('image', file);
      const response = await fetch(`${API_BASE_URL}/upload`, {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        const result = await response.json();
        return result.url;
      }

      const errorBody = await response.json();
      throw new Error(errorBody.error || 'Upload failed');
    } catch (err) {
      console.error('Error uploading image:', err);
      setError(err.message);
      return '';
    }
  };

  // Delete Portfolio Item
  const deletePortfolioItem = async (id) => {
    try {
      if (useLocalStorage) {
        setData(prev => ({
          ...prev,
          portfolio: prev.portfolio.filter(item => item.id !== id)
        }));
        return;
      }

      const mongoId = data.portfolio.find(p => p.id === id)?._id || id;
      const response = await fetch(`${API_BASE_URL}/portfolio/${mongoId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        const updatedData = await response.json();
        setData(prev => ({
          ...prev,
          portfolio: (updatedData.portfolio || []).map(item => ({
            ...item,
            id: item._id,
          })),
        }));
      }
    } catch (err) {
      console.error('Error deleting portfolio item:', err);
      setError(err.message);
    }
  };

  // Update Portfolio
  const updatePortfolio = async (updatedPortfolio) => {
    try {
      if (useLocalStorage) {
        setData(prev => ({
          ...prev,
          portfolio: updatedPortfolio
        }));
        return;
      }

      const response = await fetch(`${API_BASE_URL}/portfolio`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedPortfolio),
      });

      if (response.ok) {
        const updatedData = await response.json();
        setData(prev => ({
          ...prev,
          portfolio: (updatedData.portfolio || []).map(item => ({
            ...item,
            id: item._id,
          })),
        }));
      }
    } catch (err) {
      console.error('Error updating portfolio:', err);
      setError(err.message);
    }
  };

  // Add Experience
  const addExperience = async (exp) => {
    try {
      if (useLocalStorage) {
        setData(prev => ({
          ...prev,
          experience: [...prev.experience, { ...exp, id: Date.now() }]
        }));
        return;
      }

      const response = await fetch(`${API_BASE_URL}/experience`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(exp),
      });

      if (response.ok) {
        const updatedData = await response.json();
        setData(prev => ({
          ...prev,
          experience: (updatedData.experience || []).map(item => ({
            ...item,
            id: item._id,
          })),
        }));
      }
    } catch (err) {
      console.error('Error adding experience:', err);
      setError(err.message);
    }
  };

  // Delete Experience
  const deleteExperience = async (id) => {
    try {
      if (useLocalStorage) {
        setData(prev => ({
          ...prev,
          experience: prev.experience.filter(exp => exp.id !== id)
        }));
        return;
      }

      const mongoId = data.experience.find(e => e.id === id)?._id || id;
      const response = await fetch(`${API_BASE_URL}/experience/${mongoId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        const updatedData = await response.json();
        setData(prev => ({
          ...prev,
          experience: (updatedData.experience || []).map(item => ({
            ...item,
            id: item._id,
          })),
        }));
      }
    } catch (err) {
      console.error('Error deleting experience:', err);
      setError(err.message);
    }
  };

  // Update Experience
  const updateExperience = async (updatedExperience) => {
    try {
      if (useLocalStorage) {
        setData(prev => ({
          ...prev,
          experience: updatedExperience
        }));
        return;
      }

      const response = await fetch(`${API_BASE_URL}/experience`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedExperience),
      });

      if (response.ok) {
        const updatedData = await response.json();
        setData(prev => ({
          ...prev,
          experience: (updatedData.experience || []).map(item => ({
            ...item,
            id: item._id,
          })),
        }));
      }
    } catch (err) {
      console.error('Error updating experience:', err);
      setError(err.message);
    }
  };

  // Add Education
  const addEducation = async (edu) => {
    try {
      if (useLocalStorage) {
        setData(prev => ({
          ...prev,
          education: [...prev.education, { ...edu, id: Date.now() }]
        }));
        return;
      }

      const response = await fetch(`${API_BASE_URL}/education`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(edu),
      });

      if (response.ok) {
        const updatedData = await response.json();
        setData(prev => ({
          ...prev,
          education: (updatedData.education || []).map(item => ({
            ...item,
            id: item._id,
          })),
        }));
      }
    } catch (err) {
      console.error('Error adding education:', err);
      setError(err.message);
    }
  };

  // Delete Education
  const deleteEducation = async (id) => {
    try {
      if (useLocalStorage) {
        setData(prev => ({
          ...prev,
          education: prev.education.filter(edu => edu.id !== id)
        }));
        return;
      }

      const mongoId = data.education.find(e => e.id === id)?._id || id;
      const response = await fetch(`${API_BASE_URL}/education/${mongoId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        const updatedData = await response.json();
        setData(prev => ({
          ...prev,
          education: (updatedData.education || []).map(item => ({
            ...item,
            id: item._id,
          })),
        }));
      }
    } catch (err) {
      console.error('Error deleting education:', err);
      setError(err.message);
    }
  };

  // Update Education
  const updateEducation = async (updatedEducation) => {
    try {
      if (useLocalStorage) {
        setData(prev => ({
          ...prev,
          education: updatedEducation
        }));
        return;
      }

      const response = await fetch(`${API_BASE_URL}/education`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedEducation),
      });

      if (response.ok) {
        const updatedData = await response.json();
        setData(prev => ({
          ...prev,
          education: (updatedData.education || []).map(item => ({
            ...item,
            id: item._id,
          })),
        }));
      }
    } catch (err) {
      console.error('Error updating education:', err);
      setError(err.message);
    }
  };

  // Add Certificate
  const addCertificate = async (cert) => {
    try {
      if (useLocalStorage) {
        setData(prev => ({
          ...prev,
          certificates: [...prev.certificates, { ...cert, id: Date.now() }]
        }));
        return;
      }

      const response = await fetch(`${API_BASE_URL}/certificates`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(cert),
      });

      if (response.ok) {
        const updatedData = await response.json();
        setData(prev => ({
          ...prev,
          certificates: (updatedData.certificates || []).map(item => ({
            ...item,
            id: item._id,
          })),
        }));
      }
    } catch (err) {
      console.error('Error adding certificate:', err);
      setError(err.message);
    }
  };

  // Delete Certificate
  const deleteCertificate = async (id) => {
    try {
      if (useLocalStorage) {
        setData(prev => ({
          ...prev,
          certificates: prev.certificates.filter(cert => cert.id !== id)
        }));
        return;
      }

      const mongoId = data.certificates.find(c => c.id === id)?._id || id;
      const response = await fetch(`${API_BASE_URL}/certificates/${mongoId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        const updatedData = await response.json();
        setData(prev => ({
          ...prev,
          certificates: (updatedData.certificates || []).map(item => ({
            ...item,
            id: item._id,
          })),
        }));
      }
    } catch (err) {
      console.error('Error deleting certificate:', err);
      setError(err.message);
    }
  };

  // Update Certificates
  const updateCertificates = async (updatedCerts) => {
    try {
      if (useLocalStorage) {
        setData(prev => ({
          ...prev,
          certificates: updatedCerts
        }));
        return;
      }

      const response = await fetch(`${API_BASE_URL}/certificates`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedCerts),
      });

      if (response.ok) {
        const updatedData = await response.json();
        setData(prev => ({
          ...prev,
          certificates: (updatedData.certificates || []).map(item => ({
            ...item,
            id: item._id,
          })),
        }));
      }
    } catch (err) {
      console.error('Error updating certificates:', err);
      setError(err.message);
    }
  };

  // Reset Data
  const resetData = async () => {
    try {
      if (useLocalStorage) {
        setData(defaultData);
        localStorage.removeItem('portfolioData');
        return;
      }

      const response = await fetch(`${API_BASE_URL}/reset`, {
        method: 'POST',
      });

      if (response.ok) {
        const resetData = await response.json();
        const processedData = {
          personalInfo: resetData.data.personalInfo || defaultData.personalInfo,
          skills: (resetData.data.skills || []).map(item => ({
            ...item,
            id: item._id,
          })),
          portfolio: (resetData.data.portfolio || []).map(item => ({
            ...item,
            id: item._id,
          })),
          experience: (resetData.data.experience || []).map(item => ({
            ...item,
            id: item._id,
          })),
          education: (resetData.data.education || []).map(item => ({
            ...item,
            id: item._id,
          })),
          certificates: (resetData.data.certificates || []).map(item => ({
            ...item,
            id: item._id,
          })),
        };
        setData(processedData);
      }
    } catch (err) {
      console.error('Error resetting data:', err);
      setError(err.message);
    }
  };

  return (
    <DataContext.Provider
      value={{
        data,
        isLoading,
        error,
        useLocalStorage,
        updatePersonalInfo,
        updateSkills,
        addSkill,
        deleteSkill,
        updatePortfolio,
        addPortfolioItem,
        deletePortfolioItem,
        updateExperience,
        addExperience,
        deleteExperience,
        updateEducation,
        addEducation,
        deleteEducation,
        updateCertificates,
        addCertificate,
        deleteCertificate,
        uploadImage,
        resetData,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
