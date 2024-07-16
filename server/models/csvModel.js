import mongoose from "mongoose";

const CarMakeSchema = new mongoose.Schema({
  datas: [
    {
      make: String,
      model: [String],
    },
  ],
});

const CarMake = mongoose.model("carmodels", CarMakeSchema);

export default CarMake;
