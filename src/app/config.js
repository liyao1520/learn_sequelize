const fs = require("fs");
const path = require("path");
const dotenv = require("dotenv");

dotenv.config();
const PRIVATE_KEY = fs.readFileSync(path.resolve(__dirname, "./keys/private.key")); //读取私钥
const PUBLIC_KEY = fs.readFileSync(path.resolve(__dirname, "./keys/public.key")); //读取公钥
module.exports = { APP_PORT, MYSQL_USER, MYSQL_PASSWORD, MYSQL_DATABASE, MYSQL_HOST } = process.env;
module.exports.PRIVATE_KEY = PRIVATE_KEY;
module.exports.PUBLIC_KEY = PUBLIC_KEY;
