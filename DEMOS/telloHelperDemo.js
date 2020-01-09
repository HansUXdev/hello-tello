const tello = require('../hello-tello.js');

try {
  // tello.test();
  tello.testFlight();
} catch (error) {
  console.log(error)
}

