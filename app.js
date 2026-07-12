const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const helmet = require("helmet");
const dns = require("dns");
const session = require("express-session");

require("dotenv").config();

const connectDB = require("./config/db");

const aiRoutes = require("./routes/ai");
const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");
const contactRouter = require("./routes/contact");

dns.setServers(["8.8.8.8", "1.1.1.1"]);

const app = express();

if (process.env.NODE_ENV === "production") {
    app.set("trust proxy", 1);
}

connectDB();

/* View Engine */
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

/* Security */
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

        strictTransportSecurity:
            process.env.NODE_ENV === "production"
                ? undefined
                : false
    })
);

/* Logger */
app.use(logger("dev"));

/* Body Parser */
app.use(express.json({ limit: "20kb" }));

app.use(express.urlencoded({
    extended: false,
    limit: "20kb",
    parameterLimit: 30
}));

/* Cookies */
app.use(cookieParser());

/* Session */
app.use(
    session({
        name: "shriyansh.sid",
        secret: process.env.SESSION_SECRET || "shriyansh_ai_secret",
        resave: false,
        saveUninitialized: false,
        cookie: {
            maxAge: 1000 * 60 * 30,
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax"
        }
    })
);

/* Static Files */
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
app.use("/api", aiRoutes);
app.use("/contact", contactRouter);
app.use("/", indexRouter);
app.use("/users", usersRouter);

/* 404 */
app.use((req, res, next) => {
    next(createError(404));
});

/* Error Handler */
app.use((err, req, res, next) => {

    console.error(err);

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