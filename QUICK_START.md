# Quick Start Guide - Using New Components

## How to Update Your App.js

### Current Situation:
- Your `src/App.js` is 1645 lines
- All components are mixed together
- Hard to maintain and test

### Solution:
We've created separate component files. Now we need to connect them.

---

## Step 1: Create New Simplified App.js

Replace your current `src/App.js` with this:

```javascript
import React from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import { useRoute } from './hooks/useRoute';

// Auth Components
import SignIn from './components/auth/SignIn';
import SignUp from './components/auth/SignUp';
import ForgotPassword from './components/auth/ForgotPassword';
import VerifyEmail from './components/auth/VerifyEmail';
import ResetPassword from './components/auth/ResetPassword';

// IDE Component (we'll extract this from old App.js)
// import IDE from './pages/IDE';

function AppRouter() {
  const { user, loading } = useAuth();
  const { route, navigate } = useRoute();

  if (loading) {
    return (
      <div style={{
        minHeight: '100vh',
        background: '#080808',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        gap: 16,
      }}>
        <div style={{
          width: 36,
          height: 36,
          border: '3px solid #1a1a1a',
          borderTopColor: '#aaa',
          borderRadius: '50%',
          animation: 'spin 0.8s linear infinite',
        }} />
        <span style={{ color: '#333', fontSize: 12, fontFamily: "'Geist',sans-serif" }}>
          Loading CloudIDE…
        </span>
        <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
      </div>
    );
  }

  // If authenticated, show IDE (comment out for now)
  // if (user) return <IDE />;

  // Public routes
  if (route === 'verify-email') return <VerifyEmail navigate={navigate} />;
  if (route === 'reset-password') return <ResetPassword navigate={navigate} />;
  if (route === 'signup') return <SignUp navigate={navigate} />;
  if (route === 'forgot') return <ForgotPassword navigate={navigate} />;
  return <SignIn navigate={navigate} />;
}

export default function App() {
  return (
    <AuthProvider>
      <AppRouter />
    </AuthProvider>
  );
}
```

---

## Step 2: Test the Auth Pages

```bash
npm start
```

- Try Sign In page ✅
- Try Sign Up page ✅
- Try Forgot Password ✅
- Verify navigation works ✅

---

## Step 3: Create IDE Component

Create `src/pages/IDE.jsx` and move everything from your old App.js IDE component (lines ~900-1645).

The structure will be:

```javascript
// src/pages/IDE.jsx
import React, { useState, useEffect, useRef, useCallback } from 'react';
import Editor from '@monaco-editor/react';
import { io as socketIO } from 'socket.io-client';
// ... all your imports

export default function IDE() {
  const { user, logout, apiFetch } = useAuth();
  
  // All your existing IDE code here...
  // const [files, setFiles] = useState([...])
  // const [running, setRunning] = useState(false)
  // ... etc
  
  return (
    // Your existing IDE JSX
  );
}
```

---

## Step 4: Enable IDE in App.js

Once IDE.jsx is created:

```javascript
// In App.js, uncomment:
import IDE from './pages/IDE';

// And in AppRouter():
if (user) return <IDE />;
```

---

## Migration Checklist

- [ ] Create new App.js with components
- [ ] Test Sign In page
- [ ] Test Sign Up page  
- [ ] Test Forgot Password
- [ ] Test email verification
- [ ] Create IDE.jsx
- [ ] Enable IDE in routing
- [ ] Test full auth → IDE flow
- [ ] Delete old App.js backup (if you made one)
- [ ] Commit changes to git

---

## File Organization After Migration

```
src/
├── components/          ← Reusable UI components
├── context/            ← State management (Auth)
├── hooks/              ← Custom hooks
├── pages/              ← Full pages (IDE)
├── services/           ← API calls
├── App.js              ← Main router (NEW - simplified)
├── index.js            ← Entry point
└── styles/             ← CSS files
```

---

## Benefits You Get

✅ **Maintainability** - Easy to find and fix code  
✅ **Reusability** - Components used across the app  
✅ **Testability** - Can test components in isolation  
✅ **Scalability** - Easy to add new features  
✅ **Performance** - Code splitting and lazy loading ready  

---

## Troubleshooting

### Import Errors?
- Check file paths are correct
- Make sure files exist in the right folders
- Use relative paths: `./components/auth/SignIn`

### Components Not Showing?
- Check AuthProvider wraps App
- Verify useAuth() is inside AuthProvider
- Check console for errors

### Styling Issues?
- Inline styles are preserved
- All components use same dark theme
- No external CSS needed (for now)

---

## Next: Add Tailwind CSS (Optional)

Once this is working smoothly, you can add Tailwind for even better styling:

```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

Then use Tailwind classes instead of inline styles.

---

**Start with Step 1-2, get the auth pages working, then tackle the IDE component!** 🚀
