// Configuration for email service
const emailConfig = {
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: process.env.SMTP_PORT || 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
};

// JWT Configuration
const jwtConfig = {
  secret: process.env.JWT_SECRET || 'CHANGE_THIS_TO_A_LONG_RANDOM_STRING',
  expiresIn: process.env.JWT_EXPIRES_IN || '7d',
};

// Server Configuration
const serverConfig = {
  port: process.env.PORT || 5000,
  clientUrl: process.env.CLIENT_URL || 'http://localhost:3000',
  nodeEnv: process.env.NODE_ENV || 'development',
};

// OAuth Configuration
const oauthConfig = {
  google: {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: `${serverConfig.port}/auth/google/callback`,
  },
  github: {
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: `${serverConfig.port}/auth/github/callback`,
  },
};

module.exports = {
  emailConfig,
  jwtConfig,
  serverConfig,
  oauthConfig,
};
