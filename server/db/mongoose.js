var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
try {
    mongoose.connect(process.env.MONGODB_URI, { useMongoClient: true });    
} catch (error) {
    console.log("mongoDB not connected");
}


module.exports = { mongoose };
