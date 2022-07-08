const jwt = require("jsonwebtoken");
const Settings = require("./settings");
const secret = Settings.getTokenSecret();

class Token {
  static async createToken({ email, id }) {
    return jwt.sign({ email, id }, secret, { expiresIn: "1h" });
  }

  static async verifyToken(token) {
    let response;
    try {
      jwt.verify(token, secret, function(error, payload) {
        if(error) {
          error.code = 400;
          throw error;
        }
        response = payload;
      });
    } catch (error) {
      throw error;
    }
    return response;
  }

  static async inValidateToken(token) {
    
  }
}

module.exports = Token;
