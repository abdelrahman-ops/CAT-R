const Vehicle = require('./vehicle');

class Bicycle extends Vehicle {
    constructor(color = "blue") {
        super(color, 2, "honk honk");
    }
}

module.exports = Bicycle;