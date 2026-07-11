const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const helmet = require("helmet");
const dns = require("dns");

require("dotenv").config();

const connectDB = require("./config/db");

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const contactRouter = require("./routes/contact");

dns.setServers(["8.8.8.8", "1.1.1.1"]);

const app = express();

/*
 * Required behind Render or another reverse proxy so rate limiting
 * receives the visitor's correct IP.
 */
if (process.env.NODE_ENV === "production") {
  app.set("trust proxy", 1);
}

connectDB();

/* View engine */
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

/*
 * Helmet CSP is configured for your Font Awesome CDN.
 * Add other trusted CDN domains here later when necessary.
 */
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],

        scriptSrc: [
          "'self'",
          "https://cdnjs.cloudflare.com"
        ],

        styleSrc: [
          "'self'",
          "'unsafe-inline'",
          "https://cdnjs.cloudflare.com",
          "https://fonts.googleapis.com"
        ],

        fontSrc: [
          "'self'",
          "data:",
          "https://cdnjs.cloudflare.com",
          "https://fonts.gstatic.com"
        ],

        imgSrc: [
          "'self'",
          "data:",
          "blob:",
          "https:"
        ],

        connectSrc: ["'self'"],

        objectSrc: ["'none'"],

        baseUri: ["'self'"],

        formAction: ["'self'"]
      }
    },

    /*
     * HTTPS-only production environment me HSTS useful hai.
     * Localhost development me disable rakha gaya hai.
     */
    strictTransportSecurity:
      process.env.NODE_ENV === "production"
        ? undefined
        : false
  })
);

app.use(logger("dev"));

/*
 * Limit request body size to reduce oversized-payload abuse.
 */
app.use(express.json({ limit: "20kb" }));

app.use(
  express.urlencoded({
    extended: false,
    limit: "20kb",
    parameterLimit: 30
  })
);

app.use(cookieParser());

app.use(
  express.static(path.join(__dirname, "public"), {
    maxAge:
      process.env.NODE_ENV === "production"
        ? "7d"
        : 0,
    etag: true
  })
);

/* Routes */
app.use("/contact", contactRouter);
app.use("/", indexRouter);
app.use("/users", usersRouter);

/* 404 handler */
app.use((req, res, next) => {
  next(createError(404));
});

/* Central error handler */
app.use((err, req, res, next) => {
  console.error("Application error:", err);

  res.locals.message = err.message;
  res.locals.error =
    req.app.get("env") === "development"
      ? err
      : {};

  res.status(err.status || 500);
  res.render("error", {
    title: "Something Went Wrong"
  });
});

module.exports = app;