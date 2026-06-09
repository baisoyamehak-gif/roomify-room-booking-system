const WORK_EMAIL_DOMAIN = 'jims.org';

const isWorkEmail = (email) => {
  const emailRegex = new RegExp(`^[^@]+@${WORK_EMAIL_DOMAIN}$`, 'i');
  return emailRegex.test(email);
};

const validateWorkEmail = (email) => {
  if (!isWorkEmail(email)) {
    return `Only ${WORK_EMAIL_DOMAIN} email addresses are allowed`;
  }
  return null;
};

module.exports = {
  WORK_EMAIL_DOMAIN,
  isWorkEmail,
  validateWorkEmail
};
