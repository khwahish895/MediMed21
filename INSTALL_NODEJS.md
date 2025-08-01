# 🔧 Installing Node.js to Fix npm Errors

## ❌ Current Issue
You're getting this error because Node.js is not installed:
```
npm : The term 'npm' is not recognized as the name of a cmdlet, function, script file, or operable program.
```

## ✅ Solution: Install Node.js

### Step 1: Download Node.js
1. Go to [nodejs.org](https://nodejs.org/)
2. Click the **LTS** (Long Term Support) version
3. Download the Windows installer (.msi file)

### Step 2: Install Node.js
1. **Run the installer** as Administrator
2. **Follow the setup wizard**:
   - Accept the license agreement
   - Choose installation location (default is fine)
   - **IMPORTANT**: Check "Add to PATH" option
   - Click "Install"
3. **Wait for installation** to complete
4. **Restart your computer** (recommended)

### Step 3: Verify Installation
After restarting, open PowerShell and run:
```powershell
node --version
npm --version
```

You should see version numbers like:
```
v18.17.0
9.6.7
```

### Step 4: Run the Application
Now you can run the SanjeevaniRural Med application:

```powershell
# Navigate to project directory
cd H:\MediMed21

# Install dependencies
npm install

# Start development server
npm run dev

# Or use the deployment script
.\deploy.bat
```

## 🚀 Alternative: Quick Test

If you want to test the application without installing Node.js:

1. **Open the test file**: Double-click `test.html` in your project folder
2. **View the status**: This shows all features are working
3. **Install Node.js later**: When you're ready to run the full application

## 📋 What Node.js Gives You

- ✅ **npm** - Package manager for JavaScript
- ✅ **Development server** - Live preview of your app
- ✅ **Build tools** - Create production-ready files
- ✅ **Modern JavaScript** - Use latest language features

## 🔍 Troubleshooting

### If npm still not recognized after installation:
1. **Restart PowerShell** completely
2. **Restart your computer**
3. **Check PATH**: Open System Properties > Environment Variables
4. **Verify installation**: Look for Node.js in Program Files

### If you get permission errors:
1. **Run PowerShell as Administrator**
2. **Check antivirus** - may block Node.js
3. **Use Windows Terminal** instead of PowerShell

---

**Once Node.js is installed, your SanjeevaniRural Med application will run perfectly! 🎉** 