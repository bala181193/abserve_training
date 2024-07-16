import mongoose from "mongoose";

const filterLocationSchema = new mongoose.Schema(
  {
    sender: {
      firstName: { type: String },
      lastName: { type: String },
      email: { type: String },
      phone: { type: String },
      phoneCode: { type: String },
      address: { type: String },
      country: { type: String },
      city: { type: String },
      pinCode: { type: Number },
      location: {
        pickUp: { type: String },
        drop: { type: String },
        type: { type: String },
        startCoords: { type: Array },
        endCoords: { type: Array },
      },
    },
    parcel: {
      title: { type: String },
      description: { type: String },
      type: { type: String },
      height: { type: Number },
      width: { type: Number },
      image: { type: Array },
      size: { type: String },
      deliverBy: { type: String },
      deliveryDate: {
        type: Date,
        default: new Date(),
      },
    },
    receiver: {
      firstName: { type: String },
      lastName: { type: String },
      email: { type: String },
      phone: { type: String },
      phoneCode: { type: String },
      address: { type: String },
    },
    status: { type: String },
  },
  { timestamps: true }
);
// filterLocationSchema.index({ "location": "2dsphere" });
// filterLocationSchema.index({ "sender.location.startCoords": "2dsphere" });

const filterLocations = mongoose.model("filterlocations", filterLocationSchema);

//  https://www.google.com/maps/d/edit?mid=1LoMgCqb4pKgXtPMyk1RzSrkYokksGVA&usp=sharing
// const filterLocationSchema = new mongoose.Schema({
//   name: { type: String },
//   location: {
//     type: { type: String },
//     coordinates: { type: Array },
//   },
//   category: { type: String },
// });
// filterLocationSchema.index({ location: "2dsphere" });

// const filterLocations = mongoose.model("geoqueries", filterLocationSchema);

// filterLocations.collection.dropIndex(
//   "location_2dsphere",
//   function (err, result) {
//     if (err) {
//       console.error("Error dropping index:", err);
//     } else {
//       console.log("Index dropped successfully:", result);
//     }
//   }
// );

export default filterLocations;
