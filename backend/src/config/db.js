const mongoose = require('mongoose');

const connectDB = async () => {
    mongoose.connect(process.env.MONGO_URI)
        .then((conn) => console.log('MongoDB connected to', conn.connection.host))
        .catch(err => console.log(`MongoDB connection error :`, err));
};

module.exports = connectDB;