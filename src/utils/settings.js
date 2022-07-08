require("dotenv").config();


/**
 * used to get environment variables
 */
class Settings {
    static getPort() {
        return process.env.PORT;
    }
    static getHost() {
        return process.env.HOST;
    }
    static getDB_URI() {
        return process.env.MONGO_DB_URI;
    }
    static getWEB_URI() {
        return process.env.WEB_URI;
    }
    static getTokenSecret() {
        return process.env.TOKEN_SECRET;
    }
}
module.exports = Settings;