const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");

const app = express();
const massiveInstance = require("./db_connect");
const routes = require("./routes/geography");
const { enrichResponseMiddleware } = require("./utilities/middleware");

const PORT = process.env.PORT || 3001;
const server = () =>
  massiveInstance.then(db => {
    // Setup logger
    app.use(
      morgan(
        ':remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length] :response-time ms'
      )
    );

    // Add db into our app object
    app.set("db", db);

    app.use(bodyParser.json());

    // Init routes
    app.use("/geography", routes(app));

    app.use(enrichResponseMiddleware);

    app.listen(PORT, () => {
      // eslint-disable-next-line no-console
      console.log("Server listening on " + PORT);
    });
  });

module.exports = { server };
