/**
 * @description: 
 * The tello IP address.
*/
const TelloAddress = '192.168.10.1';

/**
 * @description:
 * The main port of the tell drone.
 * We use this port to initialize the SDK
 * When we send the "command" command.
*/
const InitPORT = 8889;

/**
 * @description:
 * This port is where you will receive the Tello State.
*/
const StatePORT = 8890;

/**
 * @description:
 * This port is where you will receive the video stream Tello.
*/
const VideoPORT = 11111;

/**
 * @description: Parses the State of the drone
 */
// const parseState = (state) {
//   return state
//     .split(';')
//     .map(x => x.split(':'))
//     .reduce((data, [key, value]) => {
//       data[key] = value;
//       return data;
//     }, {});
// };

/**
 * @description: 
 * This function will only throw an error if a command is not sent. It does not and cannot log the error of the command being sent because with UDP you aren't always able to log the response.
*/
const sendError = (err) => { if (err) console.log('sent error: ' + err)} ;


/**
 * @description:
 * Returns a promise that resolves after how many milliseconds you pass it.
*/
const wait = (time = 0) => new Promise(resolve => setTimeout(resolve, time));


/**
 * @description: Command Delays
 * Every Command requires x amount of time.
*/
const commandDelays = {
  command: 500,
  takeoff: 5000,
  land: 5000,
  up: 7000,
  down: 7000,
  left: 5000,
  go: 7000,
  right: 5000,
  forward: 5000,
  back: 5000,
  cw: 5000,
  ccw: 5000,
  flip: 3000,
  speed: 3000,
  'battery?': 500,
  'speed?': 500,
  'time?': 500,
};

/**
 * @description:
 * * 1). Should log any errors in connecting to the tello drone.
 * * 2). Should establish connection via dgram
 * * 3). Should listen to the messages on 
 */
const test = () => {
  const dgram = require('dgram');
  // const InitPORT = 8889;
  // const TelloAddress = '192.168.10.1';
  const drone = dgram.createSocket('udp4');
  
  // If address is not specified, the operating system will attempt to listen on all addresses.
  // drone.bind(InitPORT, TelloAddress)
  
  drone.bind(InitPORT)

  drone.on('message', message => console.log(`status : ${message}`) );

  const commands = ['command', 'battery?']
  const totalCommands = commands.length;
  let currentCommand = 0;

  async function initDrone() {
    const command = commands[currentCommand];
  
    // determines the  of the delay for the command
    const delay = commandDelays[command]; 

    console.log(`running command: ${command}`)
    // console.log(`delay time: ${delay}`)
    if(command !== 'command') console.log(`running command: ${command}`);
    if(command !== 'battery?') console.log(`delay time: ${delay}`);
    // sends the command
    drone.send(command, 0, command.length, InitPORT, TelloAddress, sendError);

    await wait(delay);
  
    currentCommand += 1; 
    if (currentCommand < totalCommands) return initDrone();
    console.log('done!');
    drone.close();
  }
  initDrone()
}


/**
 * @description:
 * * Runs a simple test flight.
 */
const testFlight = () => {
  const dgram = require('dgram');
  const drone = dgram.createSocket('udp4');
  drone.bind(InitPORT)
  drone.on('message', message => console.log(`status : ${message}`) );
  const commands = ['command', 'battery?','takeoff', 'emergency','battery?']
  const totalCommands = commands.length;
  let currentCommand = 0;
  async function fly() {
    const command = commands[currentCommand];
    const delay = commandDelays[command]; 
    if(command !== 'command') console.log(`running command: ${command}`);
    if(command !== 'battery?') console.log(`delay time: ${delay}`);
    drone.send(command, 0, command.length, InitPORT, TelloAddress, sendError);
    await wait(delay);
    currentCommand += 1; 
    if (currentCommand < totalCommands) return fly();
    console.log('done!');
    drone.close();
  }
  fly()
}


// exports.parseState      = parseState;
exports.TelloAddress    = TelloAddress;
exports.InitPORT        = InitPORT;
exports.StatePORT       = StatePORT;
exports.VideoPORT       = VideoPORT;
exports.sendError       = sendError;
exports.commandDelays   = commandDelays;
exports.wait            = wait;
exports.test            = test;
exports.testFlight      = testFlight;

