require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");

const app = express();

app.use(express.json({ limit: "50mb" }));

mongoose.connect(process.env.MONGO_URI)
.then(() => {
  console.log("MongoDB Connected");
})
.catch((err) => {
  console.log(err);
});
mongoose.connection.once("open", () => {

  console.log(
    "DATABASE NAME:",
    mongoose.connection.name
  );

});
const analysisRoutes = require("./routes/analysis");

app.use("/api/analyze", analysisRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
