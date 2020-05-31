const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(
      "mongodb+srv://Jason:Phineas0170@cluster0-zdnys.mongodb.net/TicketLogger?retryWrites=true&w=majority",
      {
        useNewUrlParser: true,
        useCreatIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
      }
    );
    console.log("database connected");
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

module.exports = connectDB;
