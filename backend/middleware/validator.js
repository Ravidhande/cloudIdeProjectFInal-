const validateEmail = (req, res, next) => {
  const email = req.body?.email;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!email || !emailRegex.test(email)) {
    return res.status(400).json({ error: 'Invalid email format' });
  }
  next();
};

const validatePassword = (req, res, next) => {
  const password = req.body?.password;

  if (!password || password.length < 8) {
    return res.status(400).json({ error: 'Password must be at least 8 characters' });
  }
  next();
};

const validateName = (req, res, next) => {
  const name = req.body?.name;

  if (!name || name.trim().length < 2) {
    return res.status(400).json({ error: 'Name must be at least 2 characters' });
  }
  next();
};

module.exports = {
  validateEmail,
  validatePassword,
  validateName,
};
