const mongoose = require("mongoose");

// mongoose.connect will return a promise. So, we need to write in async await.
const connectDB = async () => {
  await mongoose.connect(
    "mongodb+srv://namastedev_shyam:SidheswariMaa%4025@namastenode.6yj33.mongodb.net/devTinder"
  );
};
 
module.exports = connectDB;


