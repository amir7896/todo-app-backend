const mongoose =  require('mongoose');

// =======================
// Data Base Connection
// =======================
mongoose.connect("mongodb://localhost:27017/TODODB", {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
});
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error"));
db.once("open", () => {
  console.log("Data Base Connected Successfully!");
});

module.exports = mongoose;