const geoQuery = async () => {
  try {
    // await FilterLocations.deleteMany({});
    // const data = await FilterLocations.insertMany([
    //   {
    //     name: "Azhakapuri",
    //     location: {
    //       type: "Point",
    //       coordinates: [77.76994, 9.64245],
    //     },
    //     category: "twon",
    //   },
    //   {
    //     name: "krishnankoil",
    //     location: {
    //       type: "Point",
    //       coordinates: [77.68613, 9.56605],
    //     },
    //     category: "village",
    //   },
    //   {
    //     name: "srivi",
    //     location: {
    //       type: "Point",
    //       coordinates: [77.632622, 9.518334],
    //     },
    //     category: "twon",
    //   },
    //   {
    //     name: "Rajaplayam",
    //     location: {
    //       type: "Point",
    //       coordinates: [77.54686, 9.4605],
    //     },
    //     category: "twon",
    //   },
    //   {
    //     name: "sattur",
    //     location: {
    //       type: "Point",
    //       coordinates: [77.9119, 9.36681],
    //     },
    //     category: "twon",
    //   },
    //   {
    //     name: "aruppukottai",
    //     location: {
    //       type: "Point",
    //       coordinates: [78.09737, 9.52701],
    //     },
    //     category: "twon",
    //   },
    //   {
    //     name: "vilampatti",
    //     location: {
    //       type: "Point",
    //       coordinates: [77.75135, 9.43162],
    //     },
    //     category: "village",
    //   },
    //   {
    //     name: "thiruthangal",
    //     location: {
    //       type: "Point",
    //       coordinates: [77.80779, 9.48078],
    //     },
    //     category: "twon",
    //   },
    //   {
    //     name: "valayampatti",
    //     location: {
    //       type: "Point",
    //       coordinates: [77.97476, 9.45641],
    //     },
    //     category: "village",
    //   },
    //   {
    //     name: "watrap",
    //     location: {
    //       type: "Point",
    //       coordinates: [77.62641, 9.63024],
    //     },
    //     category: "twon",
    //   },
    //   {
    //     name: "koomaptti",
    //     location: {
    //       type: "Point",
    //       coordinates: [77.59833, 9.64498],
    //     },
    //     category: "village",
    //   },
    //   {
    //     name: "T.kallupatti",
    //     location: {
    //       type: "Point",
    //       coordinates: [77.85055, 9.72088],
    //     },
    //     category: "village",
    //   },
    //   {
    //     name: "periur",
    //     location: {
    //       type: "Point",
    //       coordinates: [77.78951, 9.73539],
    //     },
    //     category: "village",
    //   },
    //   {
    //     name: "Thirumnagalam",
    //     location: {
    //       type: "Point",
    //       coordinates: [77.98957, 9.82236],
    //     },
    //     category: "twon",
    //   },
    //   {
    //     name: "thirunagar",
    //     location: {
    //       type: "Point",
    //       coordinates: [78.04957, 9.88927],
    //     },
    //     category: "twon",
    //   },
    //   {
    //     name: "periyar",
    //     location: {
    //       type: "Point",
    //       coordinates: [78.110645, 9.91565],
    //     },
    //     category: "twon",
    //   },
    // ]);
    // const fetchdata = await FilterLocations.find({
    //   location: {
    //     $geoWithin: {
    //       $geometry: {
    //         type: "Polygon",
    //         coordinates: [
    //           [
    //             [77.76994, 9.64245], //a
    //             [77.68613, 9.56605], //k
    //             [77.632622, 9.518334], //sr
    //             [77.54686, 9.4605], //rj
    //             [77.9119, 9.36681], //st
    //             [78.09737, 9.52701], //ar
    //             [77.76994, 9.64245], //a
    //           ],
    //         ],
    //       },
    //     },
    //   },
    // });
    // console.log(fetchdata);
    // const fetchdata = await FilterLocations.aggregate([
    //   {
    //     $geoNear: {
    //       near: { type: "Point", coordinates: [77.632622, 9.518334] },
    //       distanceField: "dist.calculated",
    //       maxDistance: 20000,
    //       query: { category: "twon" },
    //       includeLocs: "dist.location",
    //       spherical: true,
    //     },
    //   },
    // ]);
    // console.log(fetchdata);
    //
  } catch (err) {
    console.log(err);
  }
};

function createGeoJSONSphere(startLong, startLat, destLong, destLat) {
  const earthRadius = 6371; // Radius of the Earth in kilometers
  const edges = 32; // Number of edges of the polygon (more edges, better approximation)

  const coordinates = [];
  for (let i = 0; i <= edges; i++) {
    const t = (i / edges) * Math.PI * 2;
    const x = Math.cos(t);
    const y = Math.sin(t);
    const lat = startLat + (destLat - startLat) * y;
    const lng = startLong + (destLong - startLong) * x;
    coordinates.push([lng, lat]);
  }

  // Close the polygon
  coordinates.push(coordinates[0]);

  console.log("....coordinates", coordinates);

  return {
    type: "Polygon",
    coordinates: [coordinates],
  };
}

function createGeoJSONPolygon(startLong, startLat, destLong, destLat) {
  return {
    type: "Polygon",
    coordinates: [
      [
        [startLong, startLat],
        [destLong, destLat],
        // Add more points to form a polygonal area if needed
        [destLong, startLat],
        [startLong, startLat],
      ],
    ],
  };
}

const findDiffplace = async (startLat, startLong, destLat, destLong) => {
  // const geoJSONSphere = createGeoJSONSphere(
  //   startLong,
  //   startLat,
  //   destLong,
  //   destLat
  // );

  // // Query to find documents with location coordinates within the spherical polygon
  // const pointsWithinSphere = await FilterLocations.find({
  //   location: {
  //     $geoWithin: {
  //       $geometry: geoJSONSphere,
  //     },
  //   },
  // });

  // console.log(pointsWithinSphere);

  // const midpointLat = (startLat + destLat) / 2;
  // const midpointLong = (startLong + destLong) / 2;

  // // Query to find documents within maxDistance from the calculated midpoint
  // const pointsNear = await FilterLocations.aggregate([
  //   {
  //     $geoNear: {
  //       near: { type: "Point", coordinates: [midpointLong, midpointLat] },
  //       distanceField: "distance",
  //       maxDistance: 10 * 1000, // Convert maxDistance to meters (MongoDB expects distance in meters)
  //       spherical: true,
  //       query: {}, // Optional: Additional query conditions can be added here
  //     },
  //   },
  // ]);
  // console.log(pointsNear);

  // const geoJSONPolygon = createGeoJSONPolygon(
  //   startLong,
  //   startLat,
  //   destLong,
  //   destLat
  // );

  // Query to find documents with location coordinates within the polygon
  // const pointsWithinPolygon = await FilterLocations.find({
  //   location: {
  //     $geoWithin: {
  //       $geometry: geoJSONPolygon,
  //     },
  //   },
  // });
  // console.log(pointsWithinPolygon);

  const geoJSONPolygon = {
    type: "Polygon",
    coordinates: [
      [
        [startLong, startLat],
        [destLong, startLat],
        [destLong, destLat],
        [startLong, destLat],
        [startLong, startLat],
      ],
    ],
  };
  const pointsWithinPolygon = await FilterLocations.find({
    location: {
      $geoWithin: {
        $geometry: geoJSONPolygon,
      },
    },
  });
  console.log(pointsWithinPolygon);
};

const startLat = 9.518334;
const startLong = 77.632622;
const destLat = 9.91565;
const destLong = 78.110645;

findDiffplace(startLat, startLong, destLat, destLong);

const checkGeoCntrl = async () => {
  try {
    const maxDistanceInMeters = parseFloat(meter); // Example: maximum distance in meters
    const radiusInRadians = maxDistanceInMeters / 6378100;
    const pointsNear = await FilterLocations.aggregate([
      {
        $match: {
          "sender.location.startCoords": {
            $geoWithin: {
              $centerSphere: [
                reqBody.pickup, // Center point coordinates
                radiusInRadians, // Radius in radians
              ],
            },
          },
        },
      },
    ]);
    console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", pointsNear.length);

    let start_longitude = reqBody.pickup[0],
      start_latitude = reqBody.pickup[1],
      end_longitude = reqBody.drop[0],
      end_latitude = reqBody.drop[1];
    const pointsNear1 = await FilterLocations.find({
      "sender.location.type": "Point",
      "sender.location.startCoords": {
        $geoWithin: {
          $geometry: {
            type: "Polygon",
            coordinates: [
              [
                [start_longitude, start_latitude],
                [end_longitude, start_latitude],
                [end_longitude, end_latitude],
                [start_longitude, end_latitude],
                [start_longitude, start_latitude],
              ],
            ],
          },
        },
      },
    });
    console.log(pointsNear1);

    const pointsNear3 = await FilterLocations.find({
      "sender.location.startCoords": {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: startCoordinates,
          },
          $maxDistance: maxDistanceInMeters,
        },
      },
    });
    console.log(pointsNear3.length);

    // Convert radius to radians
    const radiusInRadians1 = parseFloat(meter) / 6371000; // Approximately 1 kilometer in radians
    console.log("radiusInRadians", radiusInRadians1);
    const pointsNear4 = await FilterLocations.aggregate([
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
        $match: {
          "sender.location.startCoords": {
            $geoWithin: {
              $centerSphere: [
                reqBody.pickup, // Center point coordinates
                radiusInRadians1, // Radius in radians
              ],
            },
          },
        },
      },
    ]);
  } catch (err) {}
};

function degreesToRadians(degrees) {
  return (degrees * Math.PI) / 180;
}

function calculateDistance(lat1, lon1, lat2, lon2) {
  const earthRadiusKm = 6371; // Radius of the Earth in kilometers

  // Convert latitude and longitude from degrees to radians
  const dLat = degreesToRadians(lat2 - lat1);
  const dLon = degreesToRadians(lon2 - lon1);

  // Haversine formula
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(degreesToRadians(lat1)) *
      Math.cos(degreesToRadians(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  // Calculate the distance
  const distance = earthRadiusKm * c;

  return distance;
}
// const distance = calculateDistance(startLat, startLon, destLat, destLon);
