const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const path = require("path")
const Settings = require("./src/utils/settings");
const UserRouter = require("./src/modules/user/router")

const { connectDatabase } = require("./src/utils/database");

const app = express();
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(express.static(path.join(__dirname, "public")));

UserRouter(app);


connectDatabase()
  .then(() => {
    console.log("database connected successfully");
    const PORT = Settings.getPort() || 5000;
    app.listen(PORT, () => {
      console.log(`app started on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });