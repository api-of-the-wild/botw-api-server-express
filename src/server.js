const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const massiveInstance = require("./db_connect");
const routes = require("./routes/geography");

const PORT = process.env.PORT || 3000;
const server = () =>
  massiveInstance.then(db => {
    // Add db into our app object
    app.set("db", db);

    // Init models
    // require('./init-models')(app);

    app.use(bodyParser.json());

    // Init routes
    app.use("/geography", routes(app));

    app.get("/", (req, res) => {
      res.send("hello world");
    });

    app.listen(PORT, () => {
      // eslint-disable-next-line no-console
      console.log("Server listening on " + PORT);
    });
  });

module.exports = { server };
