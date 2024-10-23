const Vehicle = require('./vehicle');
const Bicycle = require('./CAT-R/bicycle');

// vehicle
const myCar = new Vehicle("red", 4, "vroom vroom");
console.log(`My car is ${myCar.color} and has ${myCar.numberOfWheels} wheels.`);
myCar.honkHorn();

// bicycle
const myBike = new Bicycle("green");
console.log(`My bike is ${myBike.color} and has ${myBike.numberOfWheels} wheels.`);
myBike.honkHorn();
