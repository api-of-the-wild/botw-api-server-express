module.exports = {
  postgres: {
    dev: {
      host: "localhost",
      port: 5432,
      database: "botw",
      user: "admin",
      password: "password",
    },
    test: {
      host: "db",
      port: 5432,
      database: "botw",
      user: "admin",
      password: "password",
    },
    prod: {},
  },
};
