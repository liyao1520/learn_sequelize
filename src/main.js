const { APP_PORT } = require("./app/config");
const app = require("./app/index");
app.listen(APP_PORT, () => {
  console.log(`serve running at http://localhost:${APP_PORT} `);
});
