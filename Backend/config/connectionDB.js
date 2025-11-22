const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            dbName: process.env.MONGO_DB,
        });

        console.log("Connected to MongoDB");
    } catch (error) {
        console.log("Connection to MongoDB failed:", error.message);
    }
};

module.exports = connectDB;
