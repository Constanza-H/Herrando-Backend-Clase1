const mongoose = require("mongoose");

const mongoDBUrl = "mongodb://localhost:27017/tu_conexion_mongodb";

mongoose.connect(mongoDBUrl, { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on("error", console.error.bind(console, "Error de conexión a MongoDB:"));
db.once("open", () => {
  console.log("Conexión exitosa a MongoDB");
});

module.exports = mongoose;
