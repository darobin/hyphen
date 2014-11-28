var express = require("express")
,   jn = require("path").join
,   favicon = require("serve-favicon")
,   logger = require("morgan")
,   bodyParser = require("body-parser")
,   api = require("./routes/api")
,   app = express()
;

app.use(favicon(jn(__dirname, "/public/favicon.png")));
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(express.static(jn(__dirname, "public")));

app.use("/api/", api);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error("Not Found");
    err.status = 404;
    next(err);
});

app.use(function(err, req, res) {
    res.status(err.status || 500)
        .json({
            message: err.message
        ,   error: err
        });
});

module.exports = app;
