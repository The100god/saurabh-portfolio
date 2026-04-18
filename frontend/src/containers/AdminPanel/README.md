# Admin Panel Documentation

## Overview

A fully functional, editable admin panel for managing portfolio content. The admin panel allows you to edit personal information, skills, portfolio projects, experience, education, and certificates. All changes are automatically saved to localStorage.

## Features

✅ **Editable Sections:**
- Personal Information (name, role, email, phone, links, etc.)
- Skills (add, edit, delete)
- Portfolio Items (add, edit, delete projects)
- Experience (add, edit, delete jobs)
- Education (add, edit, delete degrees)
- Certificates (add, edit, delete)

✅ **Data Persistence:**
- All changes saved to localStorage
- Data persists across browser sessions
- One-click reset to default data

✅ **Same Design:**
- Matches the portfolio's design system
- Uses the same color scheme and typography
- Responsive and mobile-friendly

✅ **Real-time Updates:**
- Changes immediately reflect on portfolio pages
- No page reload required
- Toast notifications for user feedback

## Setup

### 1. Install Dependencies

If you haven't already, install toast notifications:

```bash
npm install react-toastify
```

### 2. Project Structure

The admin panel is built with these components:

```
src/
├── context/
│   └── DataContext.js          # Global state management
├── containers/
│   └── AdminPanel/
│       ├── index.jsx           # Admin panel component
│       └── styles.scss         # Admin panel styles
├── hooks/
│   └── useData.js              # Custom hook for DataContext
└── App.js                      # Updated with DataProvider
```

### 3. How It Works

#### DataContext (`src/context/DataContext.js`)

The `DataContext` manages all portfolio data and provides methods to update it:

```javascript
import { DataContext } from '../../context/DataContext';
import { useContext } from 'react';

// In any component:
const { data, updatePersonalInfo, addSkill, addPortfolioItem } = useContext(DataContext);
```

#### Data Structure

```javascript
{
  personalInfo: {
    name, role, age, address, email, phone, linkedin, github, summary
  },
  skills: [{ id, name, level }, ...],
  portfolio: [{ id, name, link, category }, ...],
  experience: [{ id, company, position, duration, description }, ...],
  education: [{ id, institution, degree, year, description }, ...],
  certificates: [{ id, name, issuer, date, link }, ...]
}
```

## Usage

### Access Admin Panel

Navigate to: **http://localhost:3000/Admin**

The Admin link is available in the navbar.

### Tabs

1. **Personal** - Edit your personal information
2. **Skills** - Manage your technical skills
3. **Portfolio** - Add and manage your projects
4. **Experience** - Add your work experience
5. **Education** - Add your educational background
6. **Certificates** - Add your certifications

### Adding Items

Each section (except Personal) has an "Add New [Item]" form:

1. Fill in the required fields
2. Click "Add [Item]" button
3. Toast notification confirms the addition
4. New item appears in the list below

### Editing Items

Currently, editing existing items involves:

1. Delete the item
2. Add it again with updated information

(Optional: You can extend this to support in-place editing)

### Deleting Items

1. Click the red "Delete" button on any item
2. Item is immediately removed
3. Changes are auto-saved to localStorage

### Saving Personal Info

After editing personal information:

1. Make all your changes in the form fields
2. Click the blue "Save Changes" button
3. Toast confirms: "Personal Info updated successfully!"

### Resetting Data

**Warning: This action cannot be undone!**

1. Click the orange "Reset to Default" button
2. Confirm the popup dialog
3. All data reverts to defaults
4. localStorage is cleared

## Data Persistence

### localStorage Keys

- Key: `portfolioData`
- Value: JSON string of all portfolio data

### How It Works

1. **On App Load:** DataContext checks localStorage for existing data
2. **On Data Change:** Every change automatically saves to localStorage
3. **On Page Reload:** Previous data is restored from localStorage

### Clear Data Manually

In browser console:

```javascript
localStorage.removeItem('portfolioData');
location.reload();
```

## Integration with Portfolio Pages

The portfolio pages have been updated to use DataContext:

### About Page (`src/containers/About/index.jsx`)
- Displays edited personal information
- Shows role and summary from context

### Portfolio Page (`src/containers/Portfolio/index.jsx`)
- Lists portfolio items from context
- Uses placeholder cards if images are not available

### How to Connect Other Pages

In any component that displays portfolio data:

```javascript
import { useContext } from 'react';
import { DataContext } from '../../context/DataContext';

const MyComponent = () => {
  const { data } = useContext(DataContext);
  
  // Use data.skills, data.experience, etc.
  return (
    <div>
      {data.skills.map(skill => (
        <div key={skill.id}>{skill.name}</div>
      ))}
    </div>
  );
};
```

## Styling

### CSS Variables Used

```scss
--green-theme-main-color      // Primary color (black)
--green-theme-sub-text-color  // Secondary text
--green-theme-background-color // Background (white)
```

### Customizing Admin Panel

Edit `src/containers/AdminPanel/styles.scss` to customize:

- Colors
- Form field styles
- Button styles
- Card layouts
- Responsive breakpoints

## Best Practices

1. **Regular Backups:** Export your data periodically
   ```javascript
   const data = JSON.parse(localStorage.getItem('portfolioData'));
   console.log(JSON.stringify(data, null, 2));
   ```

2. **Validate URLs:** Ensure portfolio links and social media URLs are correct

3. **Use Professional Language:** Keep descriptions professional and error-free

4. **Keep Skills Up-to-Date:** Add new skills as you learn them

5. **Add Projects Regularly:** Keep portfolio items current

## Exporting Data

To export your portfolio data:

```javascript
// In browser console:
const data = localStorage.getItem('portfolioData');
copy(data);  // Copy to clipboard
// Paste in a text editor and save as JSON file
```

## Importing Data

To restore data from a backup:

```javascript
// In browser console:
const data = { /* your data object */ };
localStorage.setItem('portfolioData', JSON.stringify(data));
location.reload();
```

## Troubleshooting

### Data Not Saving
- Check if localStorage is enabled in browser
- Check browser console for errors
- Try clearing cache and reloading

### Admin Panel Not Loading
- Ensure DataProvider wraps the entire App
- Check console for error messages
- Verify route `/Admin` is added to App.js

### Changes Not Appearing
- Verify you clicked "Save Changes" (for personal info)
- Check that you're on the correct page after changes
- Try hard-refresh (Ctrl+Shift+R or Cmd+Shift+R)

### Toast Notifications Not Showing
- Verify react-toastify is installed: `npm list react-toastify`
- Check that ToastContainer is rendered in AdminPanel
- Check browser console for CSS errors

## Future Enhancements

Possible improvements:

1. ✨ Inline editing for portfolio items
2. 🖼️ Image upload for portfolio projects
3. 📊 Dark/Light theme toggle
4. 🔐 Password protection for admin panel
5. 📤 Export/Import functionality
6. 🗄️ Backend database integration
7. 📝 Draft/Publish workflow
8. 🔄 Version history/undo function

## Support

For issues or questions:

1. Check the troubleshooting section
2. Review browser console for error messages
3. Clear localStorage and reset to defaults
4. Check React DevTools for component state

## License

This admin panel is part of your portfolio project.
