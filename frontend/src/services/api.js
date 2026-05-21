const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const getAuthHeader = () => {
  const token = localStorage.getItem('cide_token');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const authService = {
  signin: (email, password) =>
    fetch(`${API_URL}/auth/signin`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    }).then((r) => r.json()),

  signup: (name, email, password) =>
    fetch(`${API_URL}/auth/signup`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password }),
    }).then((r) => r.json()),

  forgotPassword: (email) =>
    fetch(`${API_URL}/auth/forgot-password`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    }).then((r) => r.json()),

  resetPassword: (token, userId, password) =>
    fetch(`${API_URL}/auth/reset-password`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token, userId, password }),
    }).then((r) => r.json()),

  verifyEmail: (token, userId) =>
    fetch(`${API_URL}/auth/verify-email`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token, userId }),
    }).then((r) => r.json()),

  resendVerification: (email) =>
    fetch(`${API_URL}/auth/resend-verification`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    }).then((r) => r.json()),

  getMe: (token) =>
    fetch(`${API_URL}/auth/me`, {
      headers: { Authorization: `Bearer ${token}` },
    }).then((r) => r.json()),
};

export const editorService = {
  executeCode: (code, language) =>
    fetch(`${API_URL}/execute`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...getAuthHeader() },
      body: JSON.stringify({ code, language }),
    }).then((r) => r.json()),

  saveFile: (fileId, code) =>
    fetch(`${API_URL}/files/${fileId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json', ...getAuthHeader() },
      body: JSON.stringify({ code }),
    }).then((r) => r.json()),

  getFiles: () =>
    fetch(`${API_URL}/files`, {
      headers: getAuthHeader(),
    }).then((r) => r.json()),
};
