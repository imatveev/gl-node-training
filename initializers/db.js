const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/node-training");

mongoose.connection.on("error", (err) => {
    console.log(`Error connecting to DB: ${err}`);
});

mongoose.connection.once("open", () => {
    console.log("Connected to DB");
});

module.exports = mongoose;