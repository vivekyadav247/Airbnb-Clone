const mongoose = require("mongoose");
const initData = require("./data");
const Listing = require("../models/listing");
const MongURL = "mongodb://127.0.0.1:27017/wanderlust";

// Database Connection
main()
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log("Error connecting to MongoDB:", err);
  });
async function main() {
  await mongoose.connect(MongURL);
}

const initDB = async () => {
  await Listing.deleteMany({});
  initData.data = initData.data.map((obj) => ({
    ...obj,
    owner: "68a0b92acbb74e7085325ff7",
  }));
  await Listing.insertMany(initData.data);
  console.log("Database initialized with sample data");
};

initDB();
