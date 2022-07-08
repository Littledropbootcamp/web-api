const bcrypt = require("bcrypt");

exports.hashPassword = async function (password) {
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds);
};

exports.comparePasswords = async function (password1, password2) {
  return await bcrypt.compare(password1, password2);
}