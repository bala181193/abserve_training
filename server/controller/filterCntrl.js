import { FilterLocations } from "../models";
import haversine from "haversine-distance";

const convertUTCFormat = (deliveryDate) => {
  let startDate = new Date(deliveryDate);
  startDate.setUTCHours(0, 0, 0, 0);
  let endDate = new Date(deliveryDate);
  endDate.setUTCHours(23, 59, 59, 999);

  return { startDate, endDate };
};

// Example usage:

const calculateMeter = (pickupLat, pickupLon, dropLat, dropLon) => {
  const a = { latitude: pickupLat, longitude: pickupLon };
  const b = { latitude: dropLat, longitude: dropLon };
  let meter = haversine(a, b).toFixed(2);
  return meter;
};

const getFilterObj = (deliverBy, deliveryDate) => {
  let filter = {};
  if (
    ![undefined, null].includes(deliverBy) &&
    ![undefined, null, ""].includes(deliveryDate)
  ) {
    let convertDate = convertUTCFormat(deliveryDate);
    filter.$and = [];
    filter.$and.push(
      { "parcel.deliverBy": { $regex: new RegExp(deliverBy, "i") } },
      {
        "parcel.deliveryDate": {
          $gte: convertDate.startDate,
          $lte: convertDate.endDate,
        },
      }
    );
  } else if (![undefined, null, ""].includes(deliveryDate)) {
    const convertDate = convertUTCFormat(deliveryDate);
    filter["parcel.deliveryDate"] = {
      $gte: convertDate.startDate,
      $lte: convertDate.endDate,
    };
  } else if (![undefined, null].includes(deliverBy)) {
    filter["parcel.deliverBy"] = { $regex: new RegExp(deliverBy, "i") };
  } else {
    filter;
  }

  return filter;
};

export const filterLocation = async (req, res) => {
  try {
    let reqBody = req.body;

    console.log(reqBody.pickup, reqBody.drop);
    let meter = calculateMeter(
      reqBody.pickup[1],
      reqBody.pickup[0],
      reqBody.drop[1],
      reqBody.drop[0]
    );
    const filter = getFilterObj(req.body.deliverBy, req.body.deliveryDate);

    const pointsNear = await FilterLocations.aggregate([
      {
        $geoNear: {
          near: { type: "Point", coordinates: reqBody.pickup },
          distanceField: "dist.calculated",
          maxDistance: parseFloat(meter),
          includeLocs: "dist.location",
          spherical: true,

          // key: "sender.location.startCoords", // or "sender.location.endCoords" depending on your needs
        },
      },
      {
        $match: filter,
      },
    ]);
    return res.status(200).json({ count: pointsNear.length, pointsNear });
  } catch (err) {
    console.log(err);
  }
};
const checkgeo = async () => {
  // await FilterLocations.deleteMany({});
};
checkgeo();

export class Users{
 static name;
  constructor(){
  }
  // set nameFn(name){
  //   this.name=name
  // }
  // set printName(name){
  //   this.name=name
  // }
 static  printName(email){
    console.log("namenamename",email);
    return email
  }
}

class Student extends Users{

  constructor(name){
    super(name)
  }
   studentName(){
    console.log(this.name)
  }
}

// const userObj=new User("balamurugan")
// new User("balamurugan")
// const studentObj=new Student("balamurugan")

//  console.log("aaaaaaaaaaaaaa", userObj.printName())
//  console.log("aaaaaaaaaaaaaa", User.printName())