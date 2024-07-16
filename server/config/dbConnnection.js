const mongoose = require("mongoose");

 export function mongooseConnectDB() {
  mongoose
    .connect("mongodb://localhost:27017/test", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      
    })
    .then((result) =>
      console.log("Mongoose connected to ", result.connections[0].host)
    )
    .catch((err) => console.log("error connecting to the database", err));
}

